import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Doctor, DoctorId, DoctorModel } from './doctorModel';
import type { Specialty, SpecialtyId, SpecialtyModel } from './specialtyModel';

export interface DoctorSpecialty {
  doctorId: number;
  specialtyId: number;

  // associations
  Doctor?: Doctor;
  Specialty?: Specialty;
}

export type DoctorSpecialtyPk = "doctorId" | "specialtyId";
export type DoctorSpecialtyId = DoctorSpecialtyModel[DoctorSpecialtyPk];
export type DoctorSpecialtyCreationAttributes = DoctorSpecialty;

export class DoctorSpecialtyModel extends Model<DoctorSpecialty, DoctorSpecialtyCreationAttributes> implements DoctorSpecialty {
  doctorId!: number;
  specialtyId!: number;

  // DoctorSpecialty belongsTo Doctor via doctorId
  Doctor!: DoctorModel;
  getDoctor!: Sequelize.BelongsToGetAssociationMixin<DoctorModel>;
  setDoctor!: Sequelize.BelongsToSetAssociationMixin<DoctorModel, DoctorId>;
  createDoctor!: Sequelize.BelongsToCreateAssociationMixin<DoctorModel>;
  // DoctorSpecialty belongsTo Specialty via specialtyId
  Specialty!: SpecialtyModel;
  getSpecialty!: Sequelize.BelongsToGetAssociationMixin<SpecialtyModel>;
  setSpecialty!: Sequelize.BelongsToSetAssociationMixin<SpecialtyModel, SpecialtyId>;
  createSpecialty!: Sequelize.BelongsToCreateAssociationMixin<SpecialtyModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof DoctorSpecialtyModel {
    return DoctorSpecialtyModel.init({
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'doctors',
        key: 'id'
      }
    },
    specialtyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'specialties',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'doctor_specialties',
    modelName: 'DoctorSpecialty',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "doctorId" },
          { name: "specialtyId" },
        ]
      },
      {
        name: "doctor_specialties_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "doctorId" },
          { name: "specialtyId" },
        ]
      },
      {
        name: "doctor_specialties_specialties_FK",
        using: "BTREE",
        fields: [
          { name: "specialtyId" },
        ]
      },
    ]
  });
  }
}
