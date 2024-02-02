import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Address, AddressId, AddressModel } from './addressModel';

export interface Zone {
  id: number;
  country_id: number;
  name: string;
  code: string;
  active: boolean;

  // associations
  Addresses?: Address[];
}

export type ZonePk = "id";
export type ZoneId = ZoneModel[ZonePk];
type ZoneOptionalAttributes = "id" | "active";
export type ZoneCreationAttributes = Optional<Zone, ZoneOptionalAttributes>;

export class ZoneModel extends Model<Zone, ZoneCreationAttributes> implements Zone {
  id!: number;
  country_id!: number;
  name!: string;
  code!: string;
  active!: boolean;

  // Zone hasMany Address via zoneId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof ZoneModel {
    return ZoneModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'zone',
    modelName: 'Zone',
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
