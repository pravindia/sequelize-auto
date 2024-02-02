import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Appointment, AppointmentId, AppointmentModel } from './appointmentModel';
import type { Organisation, OrganisationId, OrganisationModel } from './organisationModel';
import type { RecommendedCourse, RecommendedCourseId, RecommendedCourseModel } from './recommendedCourseModel';
import type { RecommendedDoctor, RecommendedDoctorId, RecommendedDoctorModel } from './recommendedDoctorModel';
import type { UserCourse, UserCourseId, UserCourseModel } from './userCourseModel';
import type { User, UserId, UserModel } from './userModel';

export interface Employment {
  id: number;
  userId: number;
  organisationId?: number;
  orgName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  active: boolean;
  isDeleted: boolean;
  createdAt: Date;

  // associations
  Appointments?: Appointment[];
  RecommendedCourses?: RecommendedCourse[];
  RecommendedDoctors?: RecommendedDoctor[];
  UserCourses?: UserCourse[];
  Organisation?: Organisation;
  User?: User;
}

export type EmploymentPk = "id";
export type EmploymentId = EmploymentModel[EmploymentPk];
type EmploymentOptionalAttributes = "id" | "organisationId" | "orgName" | "description" | "startDate" | "endDate" | "active" | "isDeleted" | "createdAt";
export type EmploymentCreationAttributes = Optional<Employment, EmploymentOptionalAttributes>;

export class EmploymentModel extends Model<Employment, EmploymentCreationAttributes> implements Employment {
  id!: number;
  userId!: number;
  organisationId?: number;
  orgName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  active!: boolean;
  isDeleted!: boolean;
  createdAt!: Date;

  // Employment hasMany Appointment via employmentId
  Appointments!: AppointmentModel[];
  getAppointments!: Sequelize.HasManyGetAssociationsMixin<AppointmentModel>;
  setAppointments!: Sequelize.HasManySetAssociationsMixin<AppointmentModel, AppointmentId>;
  addAppointment!: Sequelize.HasManyAddAssociationMixin<AppointmentModel, AppointmentId>;
  addAppointments!: Sequelize.HasManyAddAssociationsMixin<AppointmentModel, AppointmentId>;
  createAppointment!: Sequelize.HasManyCreateAssociationMixin<AppointmentModel>;
  removeAppointment!: Sequelize.HasManyRemoveAssociationMixin<AppointmentModel, AppointmentId>;
  removeAppointments!: Sequelize.HasManyRemoveAssociationsMixin<AppointmentModel, AppointmentId>;
  hasAppointment!: Sequelize.HasManyHasAssociationMixin<AppointmentModel, AppointmentId>;
  hasAppointments!: Sequelize.HasManyHasAssociationsMixin<AppointmentModel, AppointmentId>;
  countAppointments!: Sequelize.HasManyCountAssociationsMixin;
  // Employment hasMany RecommendedCourse via employmentId
  RecommendedCourses!: RecommendedCourseModel[];
  getRecommendedCourses!: Sequelize.HasManyGetAssociationsMixin<RecommendedCourseModel>;
  setRecommendedCourses!: Sequelize.HasManySetAssociationsMixin<RecommendedCourseModel, RecommendedCourseId>;
  addRecommendedCourse!: Sequelize.HasManyAddAssociationMixin<RecommendedCourseModel, RecommendedCourseId>;
  addRecommendedCourses!: Sequelize.HasManyAddAssociationsMixin<RecommendedCourseModel, RecommendedCourseId>;
  createRecommendedCourse!: Sequelize.HasManyCreateAssociationMixin<RecommendedCourseModel>;
  removeRecommendedCourse!: Sequelize.HasManyRemoveAssociationMixin<RecommendedCourseModel, RecommendedCourseId>;
  removeRecommendedCourses!: Sequelize.HasManyRemoveAssociationsMixin<RecommendedCourseModel, RecommendedCourseId>;
  hasRecommendedCourse!: Sequelize.HasManyHasAssociationMixin<RecommendedCourseModel, RecommendedCourseId>;
  hasRecommendedCourses!: Sequelize.HasManyHasAssociationsMixin<RecommendedCourseModel, RecommendedCourseId>;
  countRecommendedCourses!: Sequelize.HasManyCountAssociationsMixin;
  // Employment hasMany RecommendedDoctor via employmentId
  RecommendedDoctors!: RecommendedDoctorModel[];
  getRecommendedDoctors!: Sequelize.HasManyGetAssociationsMixin<RecommendedDoctorModel>;
  setRecommendedDoctors!: Sequelize.HasManySetAssociationsMixin<RecommendedDoctorModel, RecommendedDoctorId>;
  addRecommendedDoctor!: Sequelize.HasManyAddAssociationMixin<RecommendedDoctorModel, RecommendedDoctorId>;
  addRecommendedDoctors!: Sequelize.HasManyAddAssociationsMixin<RecommendedDoctorModel, RecommendedDoctorId>;
  createRecommendedDoctor!: Sequelize.HasManyCreateAssociationMixin<RecommendedDoctorModel>;
  removeRecommendedDoctor!: Sequelize.HasManyRemoveAssociationMixin<RecommendedDoctorModel, RecommendedDoctorId>;
  removeRecommendedDoctors!: Sequelize.HasManyRemoveAssociationsMixin<RecommendedDoctorModel, RecommendedDoctorId>;
  hasRecommendedDoctor!: Sequelize.HasManyHasAssociationMixin<RecommendedDoctorModel, RecommendedDoctorId>;
  hasRecommendedDoctors!: Sequelize.HasManyHasAssociationsMixin<RecommendedDoctorModel, RecommendedDoctorId>;
  countRecommendedDoctors!: Sequelize.HasManyCountAssociationsMixin;
  // Employment hasMany UserCourse via employmentId
  UserCourses!: UserCourseModel[];
  getUserCourses!: Sequelize.HasManyGetAssociationsMixin<UserCourseModel>;
  setUserCourses!: Sequelize.HasManySetAssociationsMixin<UserCourseModel, UserCourseId>;
  addUserCourse!: Sequelize.HasManyAddAssociationMixin<UserCourseModel, UserCourseId>;
  addUserCourses!: Sequelize.HasManyAddAssociationsMixin<UserCourseModel, UserCourseId>;
  createUserCourse!: Sequelize.HasManyCreateAssociationMixin<UserCourseModel>;
  removeUserCourse!: Sequelize.HasManyRemoveAssociationMixin<UserCourseModel, UserCourseId>;
  removeUserCourses!: Sequelize.HasManyRemoveAssociationsMixin<UserCourseModel, UserCourseId>;
  hasUserCourse!: Sequelize.HasManyHasAssociationMixin<UserCourseModel, UserCourseId>;
  hasUserCourses!: Sequelize.HasManyHasAssociationsMixin<UserCourseModel, UserCourseId>;
  countUserCourses!: Sequelize.HasManyCountAssociationsMixin;
  // Employment belongsTo Organisation via organisationId
  Organisation!: OrganisationModel;
  getOrganisation!: Sequelize.BelongsToGetAssociationMixin<OrganisationModel>;
  setOrganisation!: Sequelize.BelongsToSetAssociationMixin<OrganisationModel, OrganisationId>;
  createOrganisation!: Sequelize.BelongsToCreateAssociationMixin<OrganisationModel>;
  // Employment belongsTo User via userId
  User!: UserModel;
  getUser!: Sequelize.BelongsToGetAssociationMixin<UserModel>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<UserModel, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<UserModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof EmploymentModel {
    return EmploymentModel.init({
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
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "if null org is not verified",
      references: {
        model: 'organisations',
        key: 'id'
      }
    },
    orgName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "if org is not found orgName is used insted"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    tableName: 'employments',
    modelName: 'Employment',
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
      {
        name: "employerId",
        using: "BTREE",
        fields: [
          { name: "organisationId" },
        ]
      },
    ]
  });
  }
}
