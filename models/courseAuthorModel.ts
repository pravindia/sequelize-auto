import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Course, CourseId, CourseModel } from './courseModel';
import type { Doctor, DoctorId, DoctorModel } from './doctorModel';

export interface CourseAuthor {
  id: number;
  courseId: number;
  doctorId?: number;
  name: string;
  primaryAuthor?: boolean;

  // associations
  Course?: Course;
  Doctor?: Doctor;
}

export type CourseAuthorPk = "id";
export type CourseAuthorId = CourseAuthorModel[CourseAuthorPk];
type CourseAuthorOptionalAttributes = "id" | "doctorId" | "primaryAuthor";
export type CourseAuthorCreationAttributes = Optional<CourseAuthor, CourseAuthorOptionalAttributes>;

export class CourseAuthorModel extends Model<CourseAuthor, CourseAuthorCreationAttributes> implements CourseAuthor {
  id!: number;
  courseId!: number;
  doctorId?: number;
  name!: string;
  primaryAuthor?: boolean;

  // CourseAuthor belongsTo Course via courseId
  Course!: CourseModel;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<CourseModel>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<CourseModel, CourseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<CourseModel>;
  // CourseAuthor belongsTo Doctor via doctorId
  Doctor!: DoctorModel;
  getDoctor!: Sequelize.BelongsToGetAssociationMixin<DoctorModel>;
  setDoctor!: Sequelize.BelongsToSetAssociationMixin<DoctorModel, DoctorId>;
  createDoctor!: Sequelize.BelongsToCreateAssociationMixin<DoctorModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CourseAuthorModel {
    return CourseAuthorModel.init({
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
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "optional only specified if the author is a doctor is Mentavit",
      references: {
        model: 'doctors',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    primaryAuthor: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course_authors',
    modelName: 'CourseAuthor',
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
        name: "doctorId",
        using: "BTREE",
        fields: [
          { name: "doctorId" },
        ]
      },
    ]
  });
  }
}
