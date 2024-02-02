import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Organisation, OrganisationId, OrganisationModel } from './organisationModel';
import type { User, UserId, UserModel } from './userModel';

export interface OrganisationAdmin {
  userId: number;
  organisationId: number;
  role: 'admin' | 'finance';

  // associations
  Organisation?: Organisation;
  User?: User;
}

export type OrganisationAdminPk = "userId" | "organisationId";
export type OrganisationAdminId = OrganisationAdminModel[OrganisationAdminPk];
export type OrganisationAdminCreationAttributes = OrganisationAdmin;

export class OrganisationAdminModel extends Model<OrganisationAdmin, OrganisationAdminCreationAttributes> implements OrganisationAdmin {
  userId!: number;
  organisationId!: number;
  role!: 'admin' | 'finance';

  // OrganisationAdmin belongsTo Organisation via organisationId
  Organisation!: OrganisationModel;
  getOrganisation!: Sequelize.BelongsToGetAssociationMixin<OrganisationModel>;
  setOrganisation!: Sequelize.BelongsToSetAssociationMixin<OrganisationModel, OrganisationId>;
  createOrganisation!: Sequelize.BelongsToCreateAssociationMixin<OrganisationModel>;
  // OrganisationAdmin belongsTo User via userId
  User!: UserModel;
  getUser!: Sequelize.BelongsToGetAssociationMixin<UserModel>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<UserModel, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<UserModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrganisationAdminModel {
    return OrganisationAdminModel.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "An organisation admin",
      references: {
        model: 'organisations',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.ENUM('admin','finance'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'organisation_admins',
    modelName: 'OrganisationAdmin',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "organisationId" },
          { name: "userId" },
        ]
      },
      {
        name: "organisation_admins_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
          { name: "organisationId" },
        ]
      },
    ]
  });
  }
}
