import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CourseAssessment, CourseAssessmentId, CourseAssessmentModel } from './courseAssessmentModel';
import type { UserCourseAssessment, UserCourseAssessmentId, UserCourseAssessmentModel } from './userCourseAssessmentModel';

export interface AssessmentOption {
  id: number;
  assessmentId: number;
  content?: string;
  order?: number;

  // associations
  CourseAssessments?: CourseAssessment[];
  UserCourseAssessments?: UserCourseAssessment[];
  Assessment?: CourseAssessment;
}

export type AssessmentOptionPk = "id";
export type AssessmentOptionId = AssessmentOptionModel[AssessmentOptionPk];
type AssessmentOptionOptionalAttributes = "id" | "content" | "order";
export type AssessmentOptionCreationAttributes = Optional<AssessmentOption, AssessmentOptionOptionalAttributes>;

export class AssessmentOptionModel extends Model<AssessmentOption, AssessmentOptionCreationAttributes> implements AssessmentOption {
  id!: number;
  assessmentId!: number;
  content?: string;
  order?: number;

  // AssessmentOption hasMany CourseAssessment via answerId
  CourseAssessments!: CourseAssessmentModel[];
  getCourseAssessments!: Sequelize.HasManyGetAssociationsMixin<CourseAssessmentModel>;
  setCourseAssessments!: Sequelize.HasManySetAssociationsMixin<CourseAssessmentModel, CourseAssessmentId>;
  addCourseAssessment!: Sequelize.HasManyAddAssociationMixin<CourseAssessmentModel, CourseAssessmentId>;
  addCourseAssessments!: Sequelize.HasManyAddAssociationsMixin<CourseAssessmentModel, CourseAssessmentId>;
  createCourseAssessment!: Sequelize.HasManyCreateAssociationMixin<CourseAssessmentModel>;
  removeCourseAssessment!: Sequelize.HasManyRemoveAssociationMixin<CourseAssessmentModel, CourseAssessmentId>;
  removeCourseAssessments!: Sequelize.HasManyRemoveAssociationsMixin<CourseAssessmentModel, CourseAssessmentId>;
  hasCourseAssessment!: Sequelize.HasManyHasAssociationMixin<CourseAssessmentModel, CourseAssessmentId>;
  hasCourseAssessments!: Sequelize.HasManyHasAssociationsMixin<CourseAssessmentModel, CourseAssessmentId>;
  countCourseAssessments!: Sequelize.HasManyCountAssociationsMixin;
  // AssessmentOption hasMany UserCourseAssessment via answerId
  UserCourseAssessments!: UserCourseAssessmentModel[];
  getUserCourseAssessments!: Sequelize.HasManyGetAssociationsMixin<UserCourseAssessmentModel>;
  setUserCourseAssessments!: Sequelize.HasManySetAssociationsMixin<UserCourseAssessmentModel, UserCourseAssessmentId>;
  addUserCourseAssessment!: Sequelize.HasManyAddAssociationMixin<UserCourseAssessmentModel, UserCourseAssessmentId>;
  addUserCourseAssessments!: Sequelize.HasManyAddAssociationsMixin<UserCourseAssessmentModel, UserCourseAssessmentId>;
  createUserCourseAssessment!: Sequelize.HasManyCreateAssociationMixin<UserCourseAssessmentModel>;
  removeUserCourseAssessment!: Sequelize.HasManyRemoveAssociationMixin<UserCourseAssessmentModel, UserCourseAssessmentId>;
  removeUserCourseAssessments!: Sequelize.HasManyRemoveAssociationsMixin<UserCourseAssessmentModel, UserCourseAssessmentId>;
  hasUserCourseAssessment!: Sequelize.HasManyHasAssociationMixin<UserCourseAssessmentModel, UserCourseAssessmentId>;
  hasUserCourseAssessments!: Sequelize.HasManyHasAssociationsMixin<UserCourseAssessmentModel, UserCourseAssessmentId>;
  countUserCourseAssessments!: Sequelize.HasManyCountAssociationsMixin;
  // AssessmentOption belongsTo Assessment via assessmentId
  Assessment!: CourseAssessmentModel;
  getAssessment!: Sequelize.BelongsToGetAssociationMixin<CourseAssessmentModel>;
  setAssessment!: Sequelize.BelongsToSetAssociationMixin<CourseAssessmentModel, CourseAssessmentId>;
  createAssessment!: Sequelize.BelongsToCreateAssociationMixin<CourseAssessmentModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AssessmentOptionModel {
    return AssessmentOptionModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course_assessments',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'assessment_options',
    modelName: 'AssessmentOption',
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
        name: "assessmentId",
        using: "BTREE",
        fields: [
          { name: "assessmentId" },
        ]
      },
    ]
  });
  }
}
