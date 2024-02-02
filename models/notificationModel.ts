import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId, UserModel } from './userModel';

export interface Notification {
  id: number;
  userId: number;
  content: string;
  route?: string;
  read?: boolean;
  date?: Date;
  module?: 'course' | 'appointment';
  createdAt: Date;

  // associations
  User?: User;
}

export type NotificationPk = "id";
export type NotificationId = NotificationModel[NotificationPk];
type NotificationOptionalAttributes = "id" | "route" | "read" | "date" | "module" | "createdAt";
export type NotificationCreationAttributes = Optional<Notification, NotificationOptionalAttributes>;

export class NotificationModel extends Model<Notification, NotificationCreationAttributes> implements Notification {
  id!: number;
  userId!: number;
  content!: string;
  route?: string;
  read?: boolean;
  date?: Date;
  module?: 'course' | 'appointment';
  createdAt!: Date;

  // Notification belongsTo User via userId
  User!: UserModel;
  getUser!: Sequelize.BelongsToGetAssociationMixin<UserModel>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<UserModel, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<UserModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof NotificationModel {
    return NotificationModel.init({
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
      }
    },
    content: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    route: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    module: {
      type: DataTypes.ENUM('course','appointment'),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'notifications',
    modelName: 'Notification',
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
