import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AssessmentOption, AssessmentOptionId, AssessmentOptionModel } from './assessmentOptionModel';
import type { CourseAssessment, CourseAssessmentId, CourseAssessmentModel } from './courseAssessmentModel';
import type { UserCourse, UserCourseId, UserCourseModel } from './userCourseModel';

export interface UserCourseAssessment {
  id: number;
  userCourseId: number;
  questionId: number;
  answerId?: number;
  answer?: string;
  date?: Date;
  timespent?: number;

  // associations
  Answer?: AssessmentOption;
  Question?: CourseAssessment;
  UserCourse?: UserCourse;
}

export type UserCourseAssessmentPk = "id";
export type UserCourseAssessmentId = UserCourseAssessmentModel[UserCourseAssessmentPk];
type UserCourseAssessmentOptionalAttributes = "id" | "answerId" | "answer" | "date" | "timespent";
export type UserCourseAssessmentCreationAttributes = Optional<UserCourseAssessment, UserCourseAssessmentOptionalAttributes>;

export class UserCourseAssessmentModel extends Model<UserCourseAssessment, UserCourseAssessmentCreationAttributes> implements UserCourseAssessment {
  id!: number;
  userCourseId!: number;
  questionId!: number;
  answerId?: number;
  answer?: string;
  date?: Date;
  timespent?: number;

  // UserCourseAssessment belongsTo Answer via answerId
  Answer!: AssessmentOptionModel;
  getAnswer!: Sequelize.BelongsToGetAssociationMixin<AssessmentOptionModel>;
  setAnswer!: Sequelize.BelongsToSetAssociationMixin<AssessmentOptionModel, AssessmentOptionId>;
  createAnswer!: Sequelize.BelongsToCreateAssociationMixin<AssessmentOptionModel>;
  // UserCourseAssessment belongsTo Question via questionId
  Question!: CourseAssessmentModel;
  getQuestion!: Sequelize.BelongsToGetAssociationMixin<CourseAssessmentModel>;
  setQuestion!: Sequelize.BelongsToSetAssociationMixin<CourseAssessmentModel, CourseAssessmentId>;
  createQuestion!: Sequelize.BelongsToCreateAssociationMixin<CourseAssessmentModel>;
  // UserCourseAssessment belongsTo UserCourse via userCourseId
  UserCourse!: UserCourseModel;
  getUserCourse!: Sequelize.BelongsToGetAssociationMixin<UserCourseModel>;
  setUserCourse!: Sequelize.BelongsToSetAssociationMixin<UserCourseModel, UserCourseId>;
  createUserCourse!: Sequelize.BelongsToCreateAssociationMixin<UserCourseModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserCourseAssessmentModel {
    return UserCourseAssessmentModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userCourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_courses',
        key: 'id'
      }
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course_assessments',
        key: 'id'
      }
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "in case of multichoice answer",
      references: {
        model: 'assessment_options',
        key: 'id'
      }
    },
    answer: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      comment: "in case of text input as answer"
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    timespent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "in seconds"
    }
  }, {
    sequelize,
    tableName: 'user_course_assessments',
    modelName: 'UserCourseAssessment',
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
        name: "userCourseId",
        using: "BTREE",
        fields: [
          { name: "userCourseId" },
        ]
      },
      {
        name: "questionId",
        using: "BTREE",
        fields: [
          { name: "questionId" },
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
