import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CourseLevel, CourseLevelId, CourseLevelModel } from './courseLevelModel';
import type { Course, CourseId, CourseModel } from './courseModel';
import type { Employment, EmploymentId, EmploymentModel } from './employmentModel';
import type { UserCourseAssessment, UserCourseAssessmentId, UserCourseAssessmentModel } from './userCourseAssessmentModel';
import type { User, UserId, UserModel } from './userModel';

export interface UserCourse {
  id: number;
  courseId: number;
  userId: number;
  levelId: number;
  employmentId?: number;
  startDate?: Date;
  endDate?: Date;
  progress?: number;
  recommender?: 'pending' | 'ongoing' | 'completed' | 'overdue';

  // associations
  Level?: CourseLevel;
  Course?: Course;
  Employment?: Employment;
  UserCourseAssessments?: UserCourseAssessment[];
  User?: User;
}

export type UserCoursePk = "id";
export type UserCourseId = UserCourseModel[UserCoursePk];
type UserCourseOptionalAttributes = "id" | "employmentId" | "startDate" | "endDate" | "progress" | "recommender";
export type UserCourseCreationAttributes = Optional<UserCourse, UserCourseOptionalAttributes>;

export class UserCourseModel extends Model<UserCourse, UserCourseCreationAttributes> implements UserCourse {
  id!: number;
  courseId!: number;
  userId!: number;
  levelId!: number;
  employmentId?: number;
  startDate?: Date;
  endDate?: Date;
  progress?: number;
  recommender?: 'pending' | 'ongoing' | 'completed' | 'overdue';

  // UserCourse belongsTo Level via levelId
  Level!: CourseLevelModel;
  getLevel!: Sequelize.BelongsToGetAssociationMixin<CourseLevelModel>;
  setLevel!: Sequelize.BelongsToSetAssociationMixin<CourseLevelModel, CourseLevelId>;
  createLevel!: Sequelize.BelongsToCreateAssociationMixin<CourseLevelModel>;
  // UserCourse belongsTo Course via courseId
  Course!: CourseModel;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<CourseModel>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<CourseModel, CourseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<CourseModel>;
  // UserCourse belongsTo Employment via employmentId
  Employment!: EmploymentModel;
  getEmployment!: Sequelize.BelongsToGetAssociationMixin<EmploymentModel>;
  setEmployment!: Sequelize.BelongsToSetAssociationMixin<EmploymentModel, EmploymentId>;
  createEmployment!: Sequelize.BelongsToCreateAssociationMixin<EmploymentModel>;
  // UserCourse hasMany UserCourseAssessment via userCourseId
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
  // UserCourse belongsTo User via userId
  User!: UserModel;
  getUser!: Sequelize.BelongsToGetAssociationMixin<UserModel>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<UserModel, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<UserModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserCourseModel {
    return UserCourseModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course_levels',
        key: 'id'
      }
    },
    employmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "the employment from which this course was taken",
      references: {
        model: 'employments',
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    progress: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true,
      comment: "Percentage representation of the progress"
    },
    recommender: {
      type: DataTypes.ENUM('pending','ongoing','completed','overdue'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_courses',
    modelName: 'UserCourse',
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
      {
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
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
        name: "employmentId",
        using: "BTREE",
        fields: [
          { name: "employmentId" },
        ]
      },
    ]
  });
  }
}
