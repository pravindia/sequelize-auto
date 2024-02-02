import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CourseAuthor, CourseAuthorId, CourseAuthorModel } from './courseAuthorModel';
import type { CourseLevel, CourseLevelId, CourseLevelModel } from './courseLevelModel';
import type { RecommendedCourse, RecommendedCourseId, RecommendedCourseModel } from './recommendedCourseModel';
import type { UserCourse, UserCourseId, UserCourseModel } from './userCourseModel';
import type { User, UserId, UserModel } from './userModel';

export interface Course {
  id: number;
  title?: string;
  banner?: string;
  public: boolean;
  status?: 'draft' | 'submitted' | 'published' | 'rejected';
  description?: string;
  active: boolean;
  isDeleted: boolean;
  createdBy: number;
  createdAt: Date;

  // associations
  CourseAuthors?: CourseAuthor[];
  CourseLevels?: CourseLevel[];
  RecommendedCourses?: RecommendedCourse[];
  UserCourses?: UserCourse[];
  CreatedByUser?: User;
}

export type CoursePk = "id";
export type CourseId = CourseModel[CoursePk];
type CourseOptionalAttributes = "id" | "title" | "banner" | "public" | "status" | "description" | "active" | "isDeleted" | "createdAt";
export type CourseCreationAttributes = Optional<Course, CourseOptionalAttributes>;

export class CourseModel extends Model<Course, CourseCreationAttributes> implements Course {
  id!: number;
  title?: string;
  banner?: string;
  public!: boolean;
  status?: 'draft' | 'submitted' | 'published' | 'rejected';
  description?: string;
  active!: boolean;
  isDeleted!: boolean;
  createdBy!: number;
  createdAt!: Date;

  // Course hasMany CourseAuthor via courseId
  CourseAuthors!: CourseAuthorModel[];
  getCourseAuthors!: Sequelize.HasManyGetAssociationsMixin<CourseAuthorModel>;
  setCourseAuthors!: Sequelize.HasManySetAssociationsMixin<CourseAuthorModel, CourseAuthorId>;
  addCourseAuthor!: Sequelize.HasManyAddAssociationMixin<CourseAuthorModel, CourseAuthorId>;
  addCourseAuthors!: Sequelize.HasManyAddAssociationsMixin<CourseAuthorModel, CourseAuthorId>;
  createCourseAuthor!: Sequelize.HasManyCreateAssociationMixin<CourseAuthorModel>;
  removeCourseAuthor!: Sequelize.HasManyRemoveAssociationMixin<CourseAuthorModel, CourseAuthorId>;
  removeCourseAuthors!: Sequelize.HasManyRemoveAssociationsMixin<CourseAuthorModel, CourseAuthorId>;
  hasCourseAuthor!: Sequelize.HasManyHasAssociationMixin<CourseAuthorModel, CourseAuthorId>;
  hasCourseAuthors!: Sequelize.HasManyHasAssociationsMixin<CourseAuthorModel, CourseAuthorId>;
  countCourseAuthors!: Sequelize.HasManyCountAssociationsMixin;
  // Course hasMany CourseLevel via courseId
  CourseLevels!: CourseLevelModel[];
  getCourseLevels!: Sequelize.HasManyGetAssociationsMixin<CourseLevelModel>;
  setCourseLevels!: Sequelize.HasManySetAssociationsMixin<CourseLevelModel, CourseLevelId>;
  addCourseLevel!: Sequelize.HasManyAddAssociationMixin<CourseLevelModel, CourseLevelId>;
  addCourseLevels!: Sequelize.HasManyAddAssociationsMixin<CourseLevelModel, CourseLevelId>;
  createCourseLevel!: Sequelize.HasManyCreateAssociationMixin<CourseLevelModel>;
  removeCourseLevel!: Sequelize.HasManyRemoveAssociationMixin<CourseLevelModel, CourseLevelId>;
  removeCourseLevels!: Sequelize.HasManyRemoveAssociationsMixin<CourseLevelModel, CourseLevelId>;
  hasCourseLevel!: Sequelize.HasManyHasAssociationMixin<CourseLevelModel, CourseLevelId>;
  hasCourseLevels!: Sequelize.HasManyHasAssociationsMixin<CourseLevelModel, CourseLevelId>;
  countCourseLevels!: Sequelize.HasManyCountAssociationsMixin;
  // Course hasMany RecommendedCourse via courseId
  RecommendedCourses!: RecommendedCourseModel[];
  getRecommendedCourses!: Sequelize.HasManyGetAssociationsMixin<RecommendedCourseModel>;
  setRecommendedCourses!: Sequelize.HasManySetAssociationsMixin<RecommendedCourseModel, RecommendedCourseId>;
  addRecommendedCourse!: Sequelize.HasManyAddAssociationMixin<RecommendedCourseModel, RecommendedCourseId>;
  addRecommendedCourses!: Sequelize.HasManyAddAssociationsMixin<RecommendedCourseModel, RecommendedCourseId>;
  createRecommendedCourse!: Sequelize.HasManyCreateAssociationMixin<RecommendedCourseModel>;
  removeRecommendedCourse!: Sequelize.HasManyRemoveAssociationMixin<RecommendedCourseModel, RecommendedCourseId>;
  removeRecommendedCourses!: Sequelize.HasManyRemoveAssociationsMixin<RecommendedCourseModel, RecommendedCourseId>;
  hasRecommendedCourse!: Sequelize.HasManyHasAssociationMixin<RecommendedCourseModel, RecommendedCourseId>;
  hasRecommendedCourses!: Sequelize.HasManyHasAssociationsMixin<RecommendedCourseModel, RecommendedCourseId>;
  countRecommendedCourses!: Sequelize.HasManyCountAssociationsMixin;
  // Course hasMany UserCourse via courseId
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
  // Course belongsTo CreatedByUser via createdBy
  CreatedByUser!: UserModel;
  getCreatedBy_user!: Sequelize.BelongsToGetAssociationMixin<UserModel>;
  setCreatedBy_user!: Sequelize.BelongsToSetAssociationMixin<UserModel, UserId>;
  createCreatedBy_user!: Sequelize.BelongsToCreateAssociationMixin<UserModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CourseModel {
    return CourseModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    banner: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    status: {
      type: DataTypes.ENUM('draft','submitted','published','rejected'),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'courses',
    modelName: 'Course',
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
        name: "createdBy",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
    ]
  });
  }
}
