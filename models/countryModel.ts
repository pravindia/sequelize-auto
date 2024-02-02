import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Address, AddressId, AddressModel } from './addressModel';

export interface Country {
  id: number;
  name: string;
  iso_code_2: string;
  iso_code_3: string;
  address_format_id: number;
  postcode_required: boolean;
  status: boolean;

  // associations
  Addresses?: Address[];
}

export type CountryPk = "id";
export type CountryId = CountryModel[CountryPk];
type CountryOptionalAttributes = "id" | "status";
export type CountryCreationAttributes = Optional<Country, CountryOptionalAttributes>;

export class CountryModel extends Model<Country, CountryCreationAttributes> implements Country {
  id!: number;
  name!: string;
  iso_code_2!: string;
  iso_code_3!: string;
  address_format_id!: number;
  postcode_required!: boolean;
  status!: boolean;

  // Country hasMany Address via countryId
  Addresses!: AddressModel[];
  getAddresses!: Sequelize.HasManyGetAssociationsMixin<AddressModel>;
  setAddresses!: Sequelize.HasManySetAssociationsMixin<AddressModel, AddressId>;
  addAddress!: Sequelize.HasManyAddAssociationMixin<AddressModel, AddressId>;
  addAddresses!: Sequelize.HasManyAddAssociationsMixin<AddressModel, AddressId>;
  createAddress!: Sequelize.HasManyCreateAssociationMixin<AddressModel>;
  removeAddress!: Sequelize.HasManyRemoveAssociationMixin<AddressModel, AddressId>;
  removeAddresses!: Sequelize.HasManyRemoveAssociationsMixin<AddressModel, AddressId>;
  hasAddress!: Sequelize.HasManyHasAssociationMixin<AddressModel, AddressId>;
  hasAddresses!: Sequelize.HasManyHasAssociationsMixin<AddressModel, AddressId>;
  countAddresses!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof CountryModel {
    return CountryModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    iso_code_2: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    iso_code_3: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    address_format_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postcode_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'country',
    modelName: 'Country',
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
