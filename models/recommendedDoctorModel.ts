import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Doctor, DoctorId, DoctorModel } from './doctorModel';
import type { Employment, EmploymentId, EmploymentModel } from './employmentModel';

export interface RecommendedDoctor {
  id: number;
  doctorId: number;
  employmentId: number;
  recommenderId?: number;
  recommender?: 'app' | 'admin' | 'employer';

  // associations
  Doctor?: Doctor;
  Employment?: Employment;
}

export type RecommendedDoctorPk = "id";
export type RecommendedDoctorId = RecommendedDoctorModel[RecommendedDoctorPk];
type RecommendedDoctorOptionalAttributes = "id" | "recommenderId" | "recommender";
export type RecommendedDoctorCreationAttributes = Optional<RecommendedDoctor, RecommendedDoctorOptionalAttributes>;

export class RecommendedDoctorModel extends Model<RecommendedDoctor, RecommendedDoctorCreationAttributes> implements RecommendedDoctor {
  id!: number;
  doctorId!: number;
  employmentId!: number;
  recommenderId?: number;
  recommender?: 'app' | 'admin' | 'employer';

  // RecommendedDoctor belongsTo Doctor via doctorId
  Doctor!: DoctorModel;
  getDoctor!: Sequelize.BelongsToGetAssociationMixin<DoctorModel>;
  setDoctor!: Sequelize.BelongsToSetAssociationMixin<DoctorModel, DoctorId>;
  createDoctor!: Sequelize.BelongsToCreateAssociationMixin<DoctorModel>;
  // RecommendedDoctor belongsTo Employment via employmentId
  Employment!: EmploymentModel;
  getEmployment!: Sequelize.BelongsToGetAssociationMixin<EmploymentModel>;
  setEmployment!: Sequelize.BelongsToSetAssociationMixin<EmploymentModel, EmploymentId>;
  createEmployment!: Sequelize.BelongsToCreateAssociationMixin<EmploymentModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof RecommendedDoctorModel {
    return RecommendedDoctorModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctors',
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
      comment: "The ID of who recommended this doctor to employee. Null is recommended automatically by application"
    },
    recommender: {
      type: DataTypes.ENUM('app','admin','employer'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'recommended_doctors',
    modelName: 'RecommendedDoctor',
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
        name: "doctorId",
        using: "BTREE",
        fields: [
          { name: "doctorId" },
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
