import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Doctor, DoctorId, DoctorModel } from './doctorModel';
import type { User, UserId, UserModel } from './userModel';

export interface Patient {
  id: number;
  doctorId: number;
  userId: number;

  // associations
  Doctor?: Doctor;
  User?: User;
}

export type PatientPk = "id";
export type PatientId = PatientModel[PatientPk];
type PatientOptionalAttributes = "id";
export type PatientCreationAttributes = Optional<Patient, PatientOptionalAttributes>;

export class PatientModel extends Model<Patient, PatientCreationAttributes> implements Patient {
  id!: number;
  doctorId!: number;
  userId!: number;

  // Patient belongsTo Doctor via doctorId
  Doctor!: DoctorModel;
  getDoctor!: Sequelize.BelongsToGetAssociationMixin<DoctorModel>;
  setDoctor!: Sequelize.BelongsToSetAssociationMixin<DoctorModel, DoctorId>;
  createDoctor!: Sequelize.BelongsToCreateAssociationMixin<DoctorModel>;
  // Patient belongsTo User via userId
  User!: UserModel;
  getUser!: Sequelize.BelongsToGetAssociationMixin<UserModel>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<UserModel, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<UserModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PatientModel {
    return PatientModel.init({
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'patients',
    modelName: 'Patient',
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
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
