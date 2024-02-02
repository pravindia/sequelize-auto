import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId, UserModel } from './userModel';

export interface UserCredential {
  id: number;
  userId: number;
  passwordHash: string;

  // associations
  User?: User;
}

export type UserCredentialPk = "id";
export type UserCredentialId = UserCredentialModel[UserCredentialPk];
type UserCredentialOptionalAttributes = "id";
export type UserCredentialCreationAttributes = Optional<UserCredential, UserCredentialOptionalAttributes>;

export class UserCredentialModel extends Model<UserCredential, UserCredentialCreationAttributes> implements UserCredential {
  id!: number;
  userId!: number;
  passwordHash!: string;

  // UserCredential belongsTo User via userId
  User!: UserModel;
  getUser!: Sequelize.BelongsToGetAssociationMixin<UserModel>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<UserModel, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<UserModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserCredentialModel {
    return UserCredentialModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "user_credentials_ibfk_1"
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_credentials',
    modelName: 'UserCredential',
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
        name: "user_credentials_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
