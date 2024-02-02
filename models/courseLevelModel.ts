import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AssessmentInstruction, AssessmentInstructionId, AssessmentInstructionModel } from './assessmentInstructionModel';
import type { CourseAssessment, CourseAssessmentId, CourseAssessmentModel } from './courseAssessmentModel';
import type { CourseContent, CourseContentId, CourseContentModel } from './courseContentModel';
import type { Course, CourseId, CourseModel } from './courseModel';
import type { UserCourse, UserCourseId, UserCourseModel } from './userCourseModel';

export interface CourseLevel {
  id: number;
  title: string;
  courseId: number;
  order: number;
  assessmentDuration: number;
  courseDuration: number;

  // associations
  AssessmentInstructions?: AssessmentInstruction[];
  CourseAssessments?: CourseAssessment[];
  CourseContents?: CourseContent[];
  UserCourses?: UserCourse[];
  Course?: Course;
}

export type CourseLevelPk = "id";
export type CourseLevelId = CourseLevelModel[CourseLevelPk];
type CourseLevelOptionalAttributes = "id";
export type CourseLevelCreationAttributes = Optional<CourseLevel, CourseLevelOptionalAttributes>;

export class CourseLevelModel extends Model<CourseLevel, CourseLevelCreationAttributes> implements CourseLevel {
  id!: number;
  title!: string;
  courseId!: number;
  order!: number;
  assessmentDuration!: number;
  courseDuration!: number;

  // CourseLevel hasMany AssessmentInstruction via levelId
  AssessmentInstructions!: AssessmentInstructionModel[];
  getAssessmentInstructions!: Sequelize.HasManyGetAssociationsMixin<AssessmentInstructionModel>;
  setAssessmentInstructions!: Sequelize.HasManySetAssociationsMixin<AssessmentInstructionModel, AssessmentInstructionId>;
  addAssessmentInstruction!: Sequelize.HasManyAddAssociationMixin<AssessmentInstructionModel, AssessmentInstructionId>;
  addAssessmentInstructions!: Sequelize.HasManyAddAssociationsMixin<AssessmentInstructionModel, AssessmentInstructionId>;
  createAssessmentInstruction!: Sequelize.HasManyCreateAssociationMixin<AssessmentInstructionModel>;
  removeAssessmentInstruction!: Sequelize.HasManyRemoveAssociationMixin<AssessmentInstructionModel, AssessmentInstructionId>;
  removeAssessmentInstructions!: Sequelize.HasManyRemoveAssociationsMixin<AssessmentInstructionModel, AssessmentInstructionId>;
  hasAssessmentInstruction!: Sequelize.HasManyHasAssociationMixin<AssessmentInstructionModel, AssessmentInstructionId>;
  hasAssessmentInstructions!: Sequelize.HasManyHasAssociationsMixin<AssessmentInstructionModel, AssessmentInstructionId>;
  countAssessmentInstructions!: Sequelize.HasManyCountAssociationsMixin;
  // CourseLevel hasMany CourseAssessment via levelId
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
  // CourseLevel hasMany CourseContent via levelId
  CourseContents!: CourseContentModel[];
  getCourseContents!: Sequelize.HasManyGetAssociationsMixin<CourseContentModel>;
  setCourseContents!: Sequelize.HasManySetAssociationsMixin<CourseContentModel, CourseContentId>;
  addCourseContent!: Sequelize.HasManyAddAssociationMixin<CourseContentModel, CourseContentId>;
  addCourseContents!: Sequelize.HasManyAddAssociationsMixin<CourseContentModel, CourseContentId>;
  createCourseContent!: Sequelize.HasManyCreateAssociationMixin<CourseContentModel>;
  removeCourseContent!: Sequelize.HasManyRemoveAssociationMixin<CourseContentModel, CourseContentId>;
  removeCourseContents!: Sequelize.HasManyRemoveAssociationsMixin<CourseContentModel, CourseContentId>;
  hasCourseContent!: Sequelize.HasManyHasAssociationMixin<CourseContentModel, CourseContentId>;
  hasCourseContents!: Sequelize.HasManyHasAssociationsMixin<CourseContentModel, CourseContentId>;
  countCourseContents!: Sequelize.HasManyCountAssociationsMixin;
  // CourseLevel hasMany UserCourse via levelId
  UserCourses!: UserCourseModel[];
  getUserCourses!: Sequelize.HasManyGetAssociationsMixin<UserCourseModel>;
  setUserCourses!: Sequelize.HasManySetAssociationsMixin<UserCourseModel, UserCourseId>;
  addUserCourse!: Sequelize.HasManyAddAssociationMixin<UserCourseModel, UserCourseId>;
  addUserCourses!: Sequelize.HasManyAddAssociationsMixin<UserCourseModel, UserCourseId>;
  createUserCourse!: Sequelize.HasManyCreateAssociationMixin<UserCourseModel>;
  removeUserCourse!: Sequelize.HasManyRemoveAssociationMixin<UserCourseModel, UserCourseId>;
  removeUserCourses!: Sequelize.HasManyRemoveAssociationsMixin<UserCourseModel, UserCourseId>;
  hasUserCourse!: Sequelize.HasManyHasAssociationMixin<UserCourseModel, UserCourseId>;
  hasUserCourses!: Sequelize.HasManyHasAssociationsMixin<UserCourseModel, UserCourseId>;
  countUserCourses!: Sequelize.HasManyCountAssociationsMixin;
  // CourseLevel belongsTo Course via courseId
  Course!: CourseModel;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<CourseModel>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<CourseModel, CourseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<CourseModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CourseLevelModel {
    return CourseLevelModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assessmentDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "The duration (in seconds) of how long the assessment of this course level should take"
    },
    courseDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "The course duration saved in seconds"
    }
  }, {
    sequelize,
    tableName: 'course_levels',
    modelName: 'CourseLevel',
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
        name: "courseId",
        using: "BTREE",
        fields: [
          { name: "courseId" },
        ]
      },
    ]
  });
  }
}
