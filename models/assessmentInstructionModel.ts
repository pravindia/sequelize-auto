import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CourseLevel, CourseLevelId, CourseLevelModel } from './courseLevelModel';

export interface AssessmentInstruction {
  id: number;
  levelId: number;
  content?: string;

  // associations
  Level?: CourseLevel;
}

export type AssessmentInstructionPk = "id";
export type AssessmentInstructionId = AssessmentInstructionModel[AssessmentInstructionPk];
type AssessmentInstructionOptionalAttributes = "id" | "content";
export type AssessmentInstructionCreationAttributes = Optional<AssessmentInstruction, AssessmentInstructionOptionalAttributes>;

export class AssessmentInstructionModel extends Model<AssessmentInstruction, AssessmentInstructionCreationAttributes> implements AssessmentInstruction {
  id!: number;
  levelId!: number;
  content?: string;

  // AssessmentInstruction belongsTo Level via levelId
  Level!: CourseLevelModel;
  getLevel!: Sequelize.BelongsToGetAssociationMixin<CourseLevelModel>;
  setLevel!: Sequelize.BelongsToSetAssociationMixin<CourseLevelModel, CourseLevelId>;
  createLevel!: Sequelize.BelongsToCreateAssociationMixin<CourseLevelModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AssessmentInstructionModel {
    return AssessmentInstructionModel.init({
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
    }
  }, {
    sequelize,
    tableName: 'assessment_instructions',
    modelName: 'AssessmentInstruction',
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
