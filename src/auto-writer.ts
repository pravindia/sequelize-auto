import fs from "fs";
import _ from "lodash";
import path from "path";
import util from "util";
import { FKSpec, TableData } from ".";
import { AutoOptions, CaseFileOption, CaseOption, LangOption, makeIndent, makeTableName, pluralize, qNameSplit, recase, Relation } from "./types";
const mkdirp = require('mkdirp');

/** Writes text into files from TableData.text, and writes init-models */
export class AutoWriter {
  tableText: { [name: string]: string };
  foreignKeys: { [tableName: string]: { [fieldName: string]: FKSpec } };
  relations: Relation[];
  space: string[];
  options: {
    caseFile?: CaseFileOption;
    caseModel?: CaseOption;
    caseProp?: CaseOption;
    directory: string;
    lang?: LangOption;
    noAlias?: boolean;
    noInitModels?: boolean;
    noWrite?: boolean;
    singularize?: boolean;
    useDefine?: boolean;
    spaces?: boolean;
    indentation?: number;
  };
  constructor(tableData: TableData, options: AutoOptions) {
    this.tableText = tableData.text as { [name: string]: string };
    this.foreignKeys = tableData.foreignKeys;
    this.relations = tableData.relations;
    this.options = options;
    this.space = makeIndent(this.options.spaces, this.options.indentation);
  }

  write() {

    if (this.options.noWrite) {
      return Promise.resolve();
    }

    mkdirp.sync(path.resolve(this.options.directory || "./models"));

    const tables = _.keys(this.tableText);

    // write the individual model files
    const promises = tables.map(t => {
      return this.createFile(t);
    });

    const isTypeScript = this.options.lang === 'ts';
    const assoc = this.createAssociations(isTypeScript);

    // get table names without schema
    // TODO: add schema to model and file names when schema is non-default for the dialect
    const tableNames = tables.map(t => {
      const [schemaName, tableName] = qNameSplit(t);
      return tableName as string;
    }).sort();

    // write the init-models file
    if (!this.options.noInitModels) {
      const initString = this.createInitString(tableNames, assoc, this.options.lang);
      const initFilePath = path.join(this.options.directory, "index" + (isTypeScript ? '.ts' : '.js'));
      const writeFile = util.promisify(fs.writeFile);
      const initPromise = writeFile(path.resolve(initFilePath), initString);
      promises.push(initPromise);
    }

    if (!this.options.noInitModels) {
      const initString = this.createTsHooksString(tableNames, assoc);
      const initFilePath = path.join(this.options.directory, "hooks" + (isTypeScript ? '.ts' : '.js'));
      const writeFile = util.promisify(fs.writeFile);
      const initPromise = writeFile(path.resolve(initFilePath), initString);
      promises.push(initPromise);
    }

    return Promise.all(promises);
  }
  private createInitString(tableNames: string[], assoc: string, lang?: string) {
    switch (lang) {
      case 'ts':
        return this.createTsInitString(tableNames, assoc);
      case 'esm':
        return this.createESMInitString(tableNames, assoc);
      case 'es6':
          return this.createES5InitString(tableNames, assoc, "const");
      default:
        return this.createES5InitString(tableNames, assoc, "var");
    }
  }
  private createFile(table: string) {
    // FIXME: schema is not used to write the file name and there could be collisions. For now it
    // is up to the developer to pick the right schema, and potentially chose different output
    // folders for each different schema.
    const [schemaName, tableName] = qNameSplit(table);
    const fileName = recase(this.options.caseFile, tableName, this.options.singularize);
    const filePath = path.join(this.options.directory, fileName + 'Model'  + (this.options.lang === 'ts' ? '.ts' : '.js'));

    const writeFile = util.promisify(fs.writeFile);
    return writeFile(path.resolve(filePath), this.tableText[table]);
  }

  /** Create the belongsToMany/belongsTo/hasMany/hasOne association strings */
  private createAssociations(typeScript: boolean) {
    let strBelongs = [''];
    let strBelongsToMany = [''];
    const sp = this.space[1];

    const rels = this.relations;
    rels.sort((a, b) => {
      if (a.parentModel === b.parentModel) return 0;
      return a.parentModel > b.parentModel ? 1 : -1;
    }).forEach(rel => {
      if (rel.isM2M) {
        const asprop = recase('p', pluralize(rel.childModel));
        strBelongsToMany.push(`${sp}db.${rel.parentModel}.belongsToMany(db.${rel.childModel}, { as: '${asprop}', through: db.${rel.joinModel}, foreignKey: "${rel.parentId}", otherKey: "${rel.childId}" });\n`);
      } else {
        // const bAlias = (this.options.noAlias && rel.parentModel.toLowerCase() === rel.parentProp.toLowerCase()) ? '' : `as: "${rel.parentProp}", `;
        const asParentProp = recase('p', rel.parentProp);
        const bAlias = (this.options.noAlias || rel.parentModel == asParentProp) ? '' : `as: "${asParentProp}", `;
        strBelongs.push(`${sp}db.${rel.childModel}.belongsTo(db.${rel.parentModel}, { ${bAlias}foreignKey: "${rel.parentId}" });\n`);

        const hasRel = rel.isOne ? "hasOne" : "hasMany";
        // const hAlias = (this.options.noAlias && Utils.pluralize(rel.childModel.toLowerCase()) === rel.childProp.toLowerCase()) ? '' : `as: "${rel.childProp}", `;
        const asChildProp = recase('p', rel.childProp);
        const hAlias = (this.options.noAlias || rel.isOne) ? '' : `as: "${asChildProp}", `;
        strBelongs.push(`${sp}db.${rel.parentModel}.${hasRel}(db.${rel.childModel}, { ${hAlias}foreignKey: "${rel.parentId}" });\n`);
      }
    });

    // belongsToMany must come first
    return strBelongsToMany.sort().join('') + strBelongs.sort().join('');
  }

  // create the TypeScript init-models file to load all the models into Sequelize
  private createTsInitString(tables: string[], assoc: string) {
    let str = 'import type { Sequelize } from "sequelize";\n';
    const sp = this.space[1];
    const modelNames: string[] = [];
    // import statements
    tables.forEach(t => {
      const fileName = recase(this.options.caseFile, t, this.options.singularize);
      const modelName = makeTableName(this.options.caseModel, t, this.options.singularize, this.options.lang);
      modelNames.push(modelName);
      str += `import { ${modelName}Model } from "./${fileName}Model";\n`;
    });
    str += '\n';
    tables.forEach(t => {
      const fileName = recase(this.options.caseFile, t, this.options.singularize);
      const modelName = makeTableName(this.options.caseModel, t, this.options.singularize, this.options.lang);
      str += `import type { ${modelName}, ${modelName}CreationAttributes } from "./${fileName}Model";\n`;
    });

    // re-export the model attirbutes
    str += '\nexport type {\n';
    modelNames.forEach(m => {
      str += `${sp}${m}, ${m}CreationAttributes,\n`;
    });
    str += '};\n\n';
    // create the initialization function
    str += 'export const modelsBuilder = (sq: Sequelize) => {\n';
    str += '  const db = {\n';
    modelNames.sort().forEach(m => {
        str += ` ${sp} ${m}: ${m}Model.initModel(sq),\n`;
    });
    str += '  }';
    str += '\n';

    // add the asociations
    str += "\n" + assoc;
    str += '\n';
    str += "  return db;\n";
    // return the models
    // str += `\n${sp}return {\n`;
    // modelNames.forEach(m => {
    //     str += `${this.space[2]}${m}: ${m},\n`;
    // });
    // str += `${sp}};\n`;
    str += '}\n';
    str += '\n';
    return str;
  }

  // create the ES5 init-models file to load all the models into Sequelize
  private createES5InitString(tables: string[], assoc: string, vardef: string) {
    let str = `${vardef} DataTypes = require("sequelize").DataTypes;\n`;
    const sp = this.space[1];
    const modelNames: string[] = [];
    // import statements
    tables.forEach(t => {
      const fileName = recase(this.options.caseFile, t, this.options.singularize);
      const modelName = makeTableName(this.options.caseModel, t, this.options.singularize, this.options.lang);
      modelNames.push(modelName);
      str += `${vardef} _${modelName} = require("./${fileName}Model");\n`;
    });

    // create the initialization function
    str += '\nfunction initModels(sequelize) {\n';
    modelNames.forEach(m => {
      str += `${sp}${vardef} ${m} = _${m}(sequelize, DataTypes);\n`;
    });

    // add the asociations
    str += "\n" + assoc;

    // return the models
    str += `\n${sp}return {\n`;
    modelNames.forEach(m => {
      str += `${this.space[2]}${m},\n`;
    });
    str += `${sp}};\n`;
    str += '}\n';
    str += 'module.exports = initModels;\n';
    str += 'module.exports.initModels = initModels;\n';
    str += 'module.exports.default = initModels;\n';
    return str;
  }

  // create the ESM init-models file to load all the models into Sequelize
  private createESMInitString(tables: string[], assoc: string) {
    let str = 'import _sequelize from "sequelize";\n';
    str += 'const DataTypes = _sequelize.DataTypes;\n';
    const sp = this.space[1];
    const modelNames: string[] = [];
    // import statements
    tables.forEach(t => {
      const fileName = recase(this.options.caseFile, t, this.options.singularize);
      const modelName = makeTableName(this.options.caseModel, t, this.options.singularize, this.options.lang);
      modelNames.push(modelName);
      str += `import _${modelName} from  "./${fileName}.js";\n`;
    });
    // create the initialization function
    str += '\nconst modelsBuilder = (sequelize) => {\n';
    modelNames.forEach(m => {
      str += `${sp}const ${m} = _${m}.init(sequelize, DataTypes);\n`;
    });

    // add the associations
    str += "\n" + assoc;

    // return the models
    str += `\n${sp}return {\n`;
    modelNames.forEach(m => {
      str += `${this.space[2]}${m},\n`;
    });
    str += `${sp}};\n`;
    str += '}\n';
    return str;
  }
}
