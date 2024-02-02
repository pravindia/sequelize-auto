import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Address, AddressId, AddressModel } from './addressModel';
import type { EmploymentInvite, EmploymentInviteId, EmploymentInviteModel } from './employmentInviteModel';
import type { Employment, EmploymentId, EmploymentModel } from './employmentModel';
import type { OrganisationAdmin, OrganisationAdminId, OrganisationAdminModel } from './organisationAdminModel';
import type { User, UserId, UserModel } from './userModel';

export interface Organisation {
  id: number;
  legalName?: string;
  description?: string;
  picture?: string;
  addressId?: number;
  email?: string;
  phone?: string;
  banner?: string;
  active: boolean;
  isDeleted: boolean;
  createdAt: Date;

  // associations
  Address?: Address;
  EmploymentInvites?: EmploymentInvite[];
  Employments?: Employment[];
  OrganisationAdmins?: OrganisationAdmin[];
  Users?: User[];
}

export type OrganisationPk = "id";
export type OrganisationId = OrganisationModel[OrganisationPk];
type OrganisationOptionalAttributes = "id" | "legalName" | "description" | "picture" | "addressId" | "email" | "phone" | "banner" | "active" | "isDeleted" | "createdAt";
export type OrganisationCreationAttributes = Optional<Organisation, OrganisationOptionalAttributes>;

export class OrganisationModel extends Model<Organisation, OrganisationCreationAttributes> implements Organisation {
  id!: number;
  legalName?: string;
  description?: string;
  picture?: string;
  addressId?: number;
  email?: string;
  phone?: string;
  banner?: string;
  active!: boolean;
  isDeleted!: boolean;
  createdAt!: Date;

  // Organisation belongsTo Address via addressId
  Address!: AddressModel;
  getAddress!: Sequelize.BelongsToGetAssociationMixin<AddressModel>;
  setAddress!: Sequelize.BelongsToSetAssociationMixin<AddressModel, AddressId>;
  createAddress!: Sequelize.BelongsToCreateAssociationMixin<AddressModel>;
  // Organisation hasMany EmploymentInvite via organisationId
  EmploymentInvites!: EmploymentInviteModel[];
  getEmploymentInvites!: Sequelize.HasManyGetAssociationsMixin<EmploymentInviteModel>;
  setEmploymentInvites!: Sequelize.HasManySetAssociationsMixin<EmploymentInviteModel, EmploymentInviteId>;
  addEmploymentInvite!: Sequelize.HasManyAddAssociationMixin<EmploymentInviteModel, EmploymentInviteId>;
  addEmploymentInvites!: Sequelize.HasManyAddAssociationsMixin<EmploymentInviteModel, EmploymentInviteId>;
  createEmploymentInvite!: Sequelize.HasManyCreateAssociationMixin<EmploymentInviteModel>;
  removeEmploymentInvite!: Sequelize.HasManyRemoveAssociationMixin<EmploymentInviteModel, EmploymentInviteId>;
  removeEmploymentInvites!: Sequelize.HasManyRemoveAssociationsMixin<EmploymentInviteModel, EmploymentInviteId>;
  hasEmploymentInvite!: Sequelize.HasManyHasAssociationMixin<EmploymentInviteModel, EmploymentInviteId>;
  hasEmploymentInvites!: Sequelize.HasManyHasAssociationsMixin<EmploymentInviteModel, EmploymentInviteId>;
  countEmploymentInvites!: Sequelize.HasManyCountAssociationsMixin;
  // Organisation hasMany Employment via organisationId
  Employments!: EmploymentModel[];
  getEmployments!: Sequelize.HasManyGetAssociationsMixin<EmploymentModel>;
  setEmployments!: Sequelize.HasManySetAssociationsMixin<EmploymentModel, EmploymentId>;
  addEmployment!: Sequelize.HasManyAddAssociationMixin<EmploymentModel, EmploymentId>;
  addEmployments!: Sequelize.HasManyAddAssociationsMixin<EmploymentModel, EmploymentId>;
  createEmployment!: Sequelize.HasManyCreateAssociationMixin<EmploymentModel>;
  removeEmployment!: Sequelize.HasManyRemoveAssociationMixin<EmploymentModel, EmploymentId>;
  removeEmployments!: Sequelize.HasManyRemoveAssociationsMixin<EmploymentModel, EmploymentId>;
  hasEmployment!: Sequelize.HasManyHasAssociationMixin<EmploymentModel, EmploymentId>;
  hasEmployments!: Sequelize.HasManyHasAssociationsMixin<EmploymentModel, EmploymentId>;
  countEmployments!: Sequelize.HasManyCountAssociationsMixin;
  // Organisation hasMany OrganisationAdmin via organisationId
  OrganisationAdmins!: OrganisationAdminModel[];
  getOrganisationAdmins!: Sequelize.HasManyGetAssociationsMixin<OrganisationAdminModel>;
  setOrganisationAdmins!: Sequelize.HasManySetAssociationsMixin<OrganisationAdminModel, OrganisationAdminId>;
  addOrganisationAdmin!: Sequelize.HasManyAddAssociationMixin<OrganisationAdminModel, OrganisationAdminId>;
  addOrganisationAdmins!: Sequelize.HasManyAddAssociationsMixin<OrganisationAdminModel, OrganisationAdminId>;
  createOrganisationAdmin!: Sequelize.HasManyCreateAssociationMixin<OrganisationAdminModel>;
  removeOrganisationAdmin!: Sequelize.HasManyRemoveAssociationMixin<OrganisationAdminModel, OrganisationAdminId>;
  removeOrganisationAdmins!: Sequelize.HasManyRemoveAssociationsMixin<OrganisationAdminModel, OrganisationAdminId>;
  hasOrganisationAdmin!: Sequelize.HasManyHasAssociationMixin<OrganisationAdminModel, OrganisationAdminId>;
  hasOrganisationAdmins!: Sequelize.HasManyHasAssociationsMixin<OrganisationAdminModel, OrganisationAdminId>;
  countOrganisationAdmins!: Sequelize.HasManyCountAssociationsMixin;
  // Organisation belongsToMany User via organisationId and userId
  Users!: User[];
  getUsers!: Sequelize.BelongsToManyGetAssociationsMixin<UserModel>;
  setUsers!: Sequelize.BelongsToManySetAssociationsMixin<UserModel, UserId>;
  addUser!: Sequelize.BelongsToManyAddAssociationMixin<UserModel, UserId>;
  addUsers!: Sequelize.BelongsToManyAddAssociationsMixin<UserModel, UserId>;
  createUser!: Sequelize.BelongsToManyCreateAssociationMixin<UserModel>;
  removeUser!: Sequelize.BelongsToManyRemoveAssociationMixin<UserModel, UserId>;
  removeUsers!: Sequelize.BelongsToManyRemoveAssociationsMixin<UserModel, UserId>;
  hasUserId_user!: Sequelize.BelongsToManyHasAssociationMixin<UserModel, UserId>;
  hasUsers!: Sequelize.BelongsToManyHasAssociationsMixin<UserModel, UserId>;
  countUsers!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrganisationModel {
    return OrganisationModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    legalName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    banner: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'organisations',
    modelName: 'Organisation',
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
        name: "organisations_address_FK",
        using: "BTREE",
        fields: [
          { name: "addressId" },
        ]
      },
    ]
  });
  }
}
