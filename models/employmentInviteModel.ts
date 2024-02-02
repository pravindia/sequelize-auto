import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Organisation, OrganisationId, OrganisationModel } from './organisationModel';
import type { User, UserId, UserModel } from './userModel';

export interface EmploymentInvite {
  id: number;
  userId?: number;
  organisationId: number;
  email?: string;
  employmentCode?: string;
  active: boolean;
  isDeleted: boolean;
  createdAt: Date;

  // associations
  Organisation?: Organisation;
  User?: User;
}

export type EmploymentInvitePk = "id";
export type EmploymentInviteId = EmploymentInviteModel[EmploymentInvitePk];
type EmploymentInviteOptionalAttributes = "id" | "userId" | "email" | "employmentCode" | "active" | "isDeleted" | "createdAt";
export type EmploymentInviteCreationAttributes = Optional<EmploymentInvite, EmploymentInviteOptionalAttributes>;

export class EmploymentInviteModel extends Model<EmploymentInvite, EmploymentInviteCreationAttributes> implements EmploymentInvite {
  id!: number;
  userId?: number;
  organisationId!: number;
  email?: string;
  employmentCode?: string;
  active!: boolean;
  isDeleted!: boolean;
  createdAt!: Date;

  // EmploymentInvite belongsTo Organisation via organisationId
  Organisation!: OrganisationModel;
  getOrganisation!: Sequelize.BelongsToGetAssociationMixin<OrganisationModel>;
  setOrganisation!: Sequelize.BelongsToSetAssociationMixin<OrganisationModel, OrganisationId>;
  createOrganisation!: Sequelize.BelongsToCreateAssociationMixin<OrganisationModel>;
  // EmploymentInvite belongsTo User via userId
  User!: UserModel;
  getUser!: Sequelize.BelongsToGetAssociationMixin<UserModel>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<UserModel, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<UserModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof EmploymentInviteModel {
    return EmploymentInviteModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "the org which gives invite",
      references: {
        model: 'organisations',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "employment-related email of employee, example, {name}@{employment}.com"
    },
    employmentCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "invite \/ validation of an employment"
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
    tableName: 'employment_invites',
    modelName: 'EmploymentInvite',
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
        name: "employerId",
        using: "BTREE",
        fields: [
          { name: "organisationId" },
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
