import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CourseLevel, CourseLevelId, CourseLevelModel } from './courseLevelModel';

export interface CourseContent {
  id: number;
  levelId: number;
  content?: string;
  dataUri?: string;
  type: 'doc' | 'emodule' | 'video' | 'audio';

  // associations
  Level?: CourseLevel;
}

export type CourseContentPk = "id";
export type CourseContentId = CourseContentModel[CourseContentPk];
type CourseContentOptionalAttributes = "id" | "content" | "dataUri";
export type CourseContentCreationAttributes = Optional<CourseContent, CourseContentOptionalAttributes>;

export class CourseContentModel extends Model<CourseContent, CourseContentCreationAttributes> implements CourseContent {
  id!: number;
  levelId!: number;
  content?: string;
  dataUri?: string;
  type!: 'doc' | 'emodule' | 'video' | 'audio';

  // CourseContent belongsTo Level via levelId
  Level!: CourseLevelModel;
  getLevel!: Sequelize.BelongsToGetAssociationMixin<CourseLevelModel>;
  setLevel!: Sequelize.BelongsToSetAssociationMixin<CourseLevelModel, CourseLevelId>;
  createLevel!: Sequelize.BelongsToCreateAssociationMixin<CourseLevelModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CourseContentModel {
    return CourseContentModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course_levels',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dataUri: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('doc','emodule','video','audio'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'course_contents',
    modelName: 'CourseContent',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "levelId",
        using: "BTREE",
        fields: [
          { name: "levelId" },
        ]
      },
    ]
  });
  }
}
