import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Course, CourseId, CourseModel } from './courseModel';
import type { Employment, EmploymentId, EmploymentModel } from './employmentModel';

export interface RecommendedCourse {
  id: number;
  courseId: number;
  employmentId: number;
  recommenderId?: number;
  recommender?: 'app' | 'admin' | 'employer';

  // associations
  Course?: Course;
  Employment?: Employment;
}

export type RecommendedCoursePk = "id";
export type RecommendedCourseId = RecommendedCourseModel[RecommendedCoursePk];
type RecommendedCourseOptionalAttributes = "id" | "recommenderId" | "recommender";
export type RecommendedCourseCreationAttributes = Optional<RecommendedCourse, RecommendedCourseOptionalAttributes>;

export class RecommendedCourseModel extends Model<RecommendedCourse, RecommendedCourseCreationAttributes> implements RecommendedCourse {
  id!: number;
  courseId!: number;
  employmentId!: number;
  recommenderId?: number;
  recommender?: 'app' | 'admin' | 'employer';

  // RecommendedCourse belongsTo Course via courseId
  Course!: CourseModel;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<CourseModel>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<CourseModel, CourseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<CourseModel>;
  // RecommendedCourse belongsTo Employment via employmentId
  Employment!: EmploymentModel;
  getEmployment!: Sequelize.BelongsToGetAssociationMixin<EmploymentModel>;
  setEmployment!: Sequelize.BelongsToSetAssociationMixin<EmploymentModel, EmploymentId>;
  createEmployment!: Sequelize.BelongsToCreateAssociationMixin<EmploymentModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof RecommendedCourseModel {
    return RecommendedCourseModel.init({
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
    employmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employments',
        key: 'id'
      }
    },
    recommenderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "The ID of who recommended this course to employee. Null is recommended automatically by application"
    },
    recommender: {
      type: DataTypes.ENUM('app','admin','employer'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'recommended_courses',
    modelName: 'RecommendedCourse',
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
