import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AssessmentOption, AssessmentOptionId, AssessmentOptionModel } from './assessmentOptionModel';
import type { CourseLevel, CourseLevelId, CourseLevelModel } from './courseLevelModel';
import type { UserCourseAssessment, UserCourseAssessmentId, UserCourseAssessmentModel } from './userCourseAssessmentModel';

export interface CourseAssessment {
  id: number;
  levelId: number;
  answerId?: number;
  order?: number;
  question?: string;
  picture?: string;
  video?: string;
  audio?: string;
  type?: 'text' | 'multichoice' | 'audio' | 'video';

  // associations
  Answer?: AssessmentOption;
  AssessmentOptions?: AssessmentOption[];
  UserCourseAssessments?: UserCourseAssessment[];
  Level?: CourseLevel;
}

export type CourseAssessmentPk = "id";
export type CourseAssessmentId = CourseAssessmentModel[CourseAssessmentPk];
type CourseAssessmentOptionalAttributes = "id" | "answerId" | "order" | "question" | "picture" | "video" | "audio" | "type";
export type CourseAssessmentCreationAttributes = Optional<CourseAssessment, CourseAssessmentOptionalAttributes>;

export class CourseAssessmentModel extends Model<CourseAssessment, CourseAssessmentCreationAttributes> implements CourseAssessment {
  id!: number;
  levelId!: number;
  answerId?: number;
  order?: number;
  question?: string;
  picture?: string;
  video?: string;
  audio?: string;
  type?: 'text' | 'multichoice' | 'audio' | 'video';

  // CourseAssessment belongsTo Answer via answerId
  Answer!: AssessmentOptionModel;
  getAnswer!: Sequelize.BelongsToGetAssociationMixin<AssessmentOptionModel>;
  setAnswer!: Sequelize.BelongsToSetAssociationMixin<AssessmentOptionModel, AssessmentOptionId>;
  createAnswer!: Sequelize.BelongsToCreateAssociationMixin<AssessmentOptionModel>;
  // CourseAssessment hasMany AssessmentOption via assessmentId
  AssessmentOptions!: AssessmentOptionModel[];
  getAssessmentOptions!: Sequelize.HasManyGetAssociationsMixin<AssessmentOptionModel>;
  setAssessmentOptions!: Sequelize.HasManySetAssociationsMixin<AssessmentOptionModel, AssessmentOptionId>;
  addAssessmentOption!: Sequelize.HasManyAddAssociationMixin<AssessmentOptionModel, AssessmentOptionId>;
  addAssessmentOptions!: Sequelize.HasManyAddAssociationsMixin<AssessmentOptionModel, AssessmentOptionId>;
  createAssessmentOption!: Sequelize.HasManyCreateAssociationMixin<AssessmentOptionModel>;
  removeAssessmentOption!: Sequelize.HasManyRemoveAssociationMixin<AssessmentOptionModel, AssessmentOptionId>;
  removeAssessmentOptions!: Sequelize.HasManyRemoveAssociationsMixin<AssessmentOptionModel, AssessmentOptionId>;
  hasAssessmentOption!: Sequelize.HasManyHasAssociationMixin<AssessmentOptionModel, AssessmentOptionId>;
  hasAssessmentOptions!: Sequelize.HasManyHasAssociationsMixin<AssessmentOptionModel, AssessmentOptionId>;
  countAssessmentOptions!: Sequelize.HasManyCountAssociationsMixin;
  // CourseAssessment hasMany UserCourseAssessment via questionId
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
  // CourseAssessment belongsTo Level via levelId
  Level!: CourseLevelModel;
  getLevel!: Sequelize.BelongsToGetAssociationMixin<CourseLevelModel>;
  setLevel!: Sequelize.BelongsToSetAssociationMixin<CourseLevelModel, CourseLevelId>;
  createLevel!: Sequelize.BelongsToCreateAssociationMixin<CourseLevelModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CourseAssessmentModel {
    return CourseAssessmentModel.init({
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
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "ref to AssessementMultiChoiceOption if type is multichoice. Should never get to the client's frontend for security reasons",
      references: {
        model: 'assessment_options',
        key: 'id'
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    audio: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('text','multichoice','audio','video'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course_assessments',
    modelName: 'CourseAssessment',
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
      {
        name: "answerId",
        using: "BTREE",
        fields: [
          { name: "answerId" },
        ]
      },
    ]
  });
  }
}
