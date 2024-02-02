import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { DoctorSpecialty, DoctorSpecialtyId, DoctorSpecialtyModel } from './doctorSpecialtyModel';
import type { Doctor, DoctorId, DoctorModel } from './doctorModel';

export interface Specialty {
  id: number;
  title?: string;

  // associations
  DoctorSpecialties?: DoctorSpecialty[];
  Doctors?: Doctor[];
}

export type SpecialtyPk = "id";
export type SpecialtyId = SpecialtyModel[SpecialtyPk];
type SpecialtyOptionalAttributes = "id" | "title";
export type SpecialtyCreationAttributes = Optional<Specialty, SpecialtyOptionalAttributes>;

export class SpecialtyModel extends Model<Specialty, SpecialtyCreationAttributes> implements Specialty {
  id!: number;
  title?: string;

  // Specialty hasMany DoctorSpecialty via specialtyId
  DoctorSpecialties!: DoctorSpecialtyModel[];
  getDoctorSpecialties!: Sequelize.HasManyGetAssociationsMixin<DoctorSpecialtyModel>;
  setDoctorSpecialties!: Sequelize.HasManySetAssociationsMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  addDoctorSpecialty!: Sequelize.HasManyAddAssociationMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  addDoctorSpecialties!: Sequelize.HasManyAddAssociationsMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  createDoctorSpecialty!: Sequelize.HasManyCreateAssociationMixin<DoctorSpecialtyModel>;
  removeDoctorSpecialty!: Sequelize.HasManyRemoveAssociationMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  removeDoctorSpecialties!: Sequelize.HasManyRemoveAssociationsMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  hasDoctorSpecialty!: Sequelize.HasManyHasAssociationMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  hasDoctorSpecialties!: Sequelize.HasManyHasAssociationsMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  countDoctorSpecialties!: Sequelize.HasManyCountAssociationsMixin;
  // Specialty belongsToMany Doctor via specialtyId and doctorId
  Doctors!: Doctor[];
  getDoctors!: Sequelize.BelongsToManyGetAssociationsMixin<DoctorModel>;
  setDoctors!: Sequelize.BelongsToManySetAssociationsMixin<DoctorModel, DoctorId>;
  addDoctor!: Sequelize.BelongsToManyAddAssociationMixin<DoctorModel, DoctorId>;
  addDoctors!: Sequelize.BelongsToManyAddAssociationsMixin<DoctorModel, DoctorId>;
  createDoctor!: Sequelize.BelongsToManyCreateAssociationMixin<DoctorModel>;
  removeDoctor!: Sequelize.BelongsToManyRemoveAssociationMixin<DoctorModel, DoctorId>;
  removeDoctors!: Sequelize.BelongsToManyRemoveAssociationsMixin<DoctorModel, DoctorId>;
  hasDoctor!: Sequelize.BelongsToManyHasAssociationMixin<DoctorModel, DoctorId>;
  hasDoctors!: Sequelize.BelongsToManyHasAssociationsMixin<DoctorModel, DoctorId>;
  countDoctors!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof SpecialtyModel {
    return SpecialtyModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'specialties',
    modelName: 'Specialty',
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
    ]
  });
  }
}
