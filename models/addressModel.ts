import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Country, CountryId, CountryModel } from './countryModel';
import type { Doctor, DoctorId, DoctorModel } from './doctorModel';
import type { Organisation, OrganisationId, OrganisationModel } from './organisationModel';
import type { User, UserId, UserModel } from './userModel';
import type { Zone, ZoneId, ZoneModel } from './zoneModel';

export interface Address {
  id: number;
  street?: string;
  houseNumber?: string;
  city?: string;
  countryCode?: string;
  postalCode?: string;
  countryId?: number;
  zoneId?: number;
  active: boolean;
  default: boolean;

  // associations
  Doctors?: Doctor[];
  Organisations?: Organisation[];
  Users?: User[];
  Country?: Country;
  Zone?: Zone;
}

export type AddressPk = "id";
export type AddressId = AddressModel[AddressPk];
type AddressOptionalAttributes = "id" | "street" | "houseNumber" | "city" | "countryCode" | "postalCode" | "countryId" | "zoneId" | "active" | "default";
export type AddressCreationAttributes = Optional<Address, AddressOptionalAttributes>;

export class AddressModel extends Model<Address, AddressCreationAttributes> implements Address {
  id!: number;
  street?: string;
  houseNumber?: string;
  city?: string;
  countryCode?: string;
  postalCode?: string;
  countryId?: number;
  zoneId?: number;
  active!: boolean;
  default!: boolean;

  // Address hasMany Doctor via addressId
  Doctors!: DoctorModel[];
  getDoctors!: Sequelize.HasManyGetAssociationsMixin<DoctorModel>;
  setDoctors!: Sequelize.HasManySetAssociationsMixin<DoctorModel, DoctorId>;
  addDoctor!: Sequelize.HasManyAddAssociationMixin<DoctorModel, DoctorId>;
  addDoctors!: Sequelize.HasManyAddAssociationsMixin<DoctorModel, DoctorId>;
  createDoctor!: Sequelize.HasManyCreateAssociationMixin<DoctorModel>;
  removeDoctor!: Sequelize.HasManyRemoveAssociationMixin<DoctorModel, DoctorId>;
  removeDoctors!: Sequelize.HasManyRemoveAssociationsMixin<DoctorModel, DoctorId>;
  hasDoctor!: Sequelize.HasManyHasAssociationMixin<DoctorModel, DoctorId>;
  hasDoctors!: Sequelize.HasManyHasAssociationsMixin<DoctorModel, DoctorId>;
  countDoctors!: Sequelize.HasManyCountAssociationsMixin;
  // Address hasMany Organisation via addressId
  Organisations!: OrganisationModel[];
  getOrganisations!: Sequelize.HasManyGetAssociationsMixin<OrganisationModel>;
  setOrganisations!: Sequelize.HasManySetAssociationsMixin<OrganisationModel, OrganisationId>;
  addOrganisation!: Sequelize.HasManyAddAssociationMixin<OrganisationModel, OrganisationId>;
  addOrganisations!: Sequelize.HasManyAddAssociationsMixin<OrganisationModel, OrganisationId>;
  createOrganisation!: Sequelize.HasManyCreateAssociationMixin<OrganisationModel>;
  removeOrganisation!: Sequelize.HasManyRemoveAssociationMixin<OrganisationModel, OrganisationId>;
  removeOrganisations!: Sequelize.HasManyRemoveAssociationsMixin<OrganisationModel, OrganisationId>;
  hasOrganisation!: Sequelize.HasManyHasAssociationMixin<OrganisationModel, OrganisationId>;
  hasOrganisations!: Sequelize.HasManyHasAssociationsMixin<OrganisationModel, OrganisationId>;
  countOrganisations!: Sequelize.HasManyCountAssociationsMixin;
  // Address hasMany User via addressId
  Users!: UserModel[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<UserModel>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<UserModel, UserId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<UserModel, UserId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<UserModel, UserId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<UserModel>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<UserModel, UserId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<UserModel, UserId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<UserModel, UserId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<UserModel, UserId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;
  // Address belongsTo Country via countryId
  Country!: CountryModel;
  getCountry!: Sequelize.BelongsToGetAssociationMixin<CountryModel>;
  setCountry!: Sequelize.BelongsToSetAssociationMixin<CountryModel, CountryId>;
  createCountry!: Sequelize.BelongsToCreateAssociationMixin<CountryModel>;
  // Address belongsTo Zone via zoneId
  Zone!: ZoneModel;
  getZone!: Sequelize.BelongsToGetAssociationMixin<ZoneModel>;
  setZone!: Sequelize.BelongsToSetAssociationMixin<ZoneModel, ZoneId>;
  createZone!: Sequelize.BelongsToCreateAssociationMixin<ZoneModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AddressModel {
    return AddressModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    houseNumber: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    countryCode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    postalCode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'country',
        key: 'id'
      }
    },
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'zone',
        key: 'id'
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'address',
    modelName: 'Address',
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
        name: "address_country_FK",
        using: "BTREE",
        fields: [
          { name: "countryId" },
        ]
      },
      {
        name: "address_zone_FK",
        using: "BTREE",
        fields: [
          { name: "zoneId" },
        ]
      },
    ]
  });
  }
}
