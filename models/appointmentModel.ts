import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Doctor, DoctorId, DoctorModel } from './doctorModel';
import type { Employment, EmploymentId, EmploymentModel } from './employmentModel';

export interface Appointment {
  id: number;
  title?: string;
  doctorId: number;
  employmentId: number;
  startDate?: Date;
  endDate?: Date;

  // associations
  Doctor?: Doctor;
  Employment?: Employment;
}

export type AppointmentPk = "id";
export type AppointmentId = AppointmentModel[AppointmentPk];
type AppointmentOptionalAttributes = "id" | "title" | "startDate" | "endDate";
export type AppointmentCreationAttributes = Optional<Appointment, AppointmentOptionalAttributes>;

export class AppointmentModel extends Model<Appointment, AppointmentCreationAttributes> implements Appointment {
  id!: number;
  title?: string;
  doctorId!: number;
  employmentId!: number;
  startDate?: Date;
  endDate?: Date;

  // Appointment belongsTo Doctor via doctorId
  Doctor!: DoctorModel;
  getDoctor!: Sequelize.BelongsToGetAssociationMixin<DoctorModel>;
  setDoctor!: Sequelize.BelongsToSetAssociationMixin<DoctorModel, DoctorId>;
  createDoctor!: Sequelize.BelongsToCreateAssociationMixin<DoctorModel>;
  // Appointment belongsTo Employment via employmentId
  Employment!: EmploymentModel;
  getEmployment!: Sequelize.BelongsToGetAssociationMixin<EmploymentModel>;
  setEmployment!: Sequelize.BelongsToSetAssociationMixin<EmploymentModel, EmploymentId>;
  createEmployment!: Sequelize.BelongsToCreateAssociationMixin<EmploymentModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppointmentModel {
    return AppointmentModel.init({
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'appointments',
    modelName: 'Appointment',
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
