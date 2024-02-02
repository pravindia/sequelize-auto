import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Address, AddressId, AddressModel } from './addressModel';
import type { Course, CourseId, CourseModel } from './courseModel';
import type { Doctor, DoctorId, DoctorModel } from './doctorModel';
import type { EmploymentInvite, EmploymentInviteId, EmploymentInviteModel } from './employmentInviteModel';
import type { Employment, EmploymentId, EmploymentModel } from './employmentModel';
import type { Notification, NotificationId, NotificationModel } from './notificationModel';
import type { OrganisationAdmin, OrganisationAdminId, OrganisationAdminModel } from './organisationAdminModel';
import type { Organisation, OrganisationId, OrganisationModel } from './organisationModel';
import type { Patient, PatientId, PatientModel } from './patientModel';
import type { UserCourse, UserCourseId, UserCourseModel } from './userCourseModel';
import type { UserCredential, UserCredentialId, UserCredentialModel } from './userCredentialModel';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  banner?: string;
  gender?: 'male' | 'female';
  phoneNumber?: string;
  addressId?: number;
  active: boolean;
  isDeleted: boolean;
  createdAt: Date;

  // associations
  Address?: Address;
  Courses?: Course[];
  Doctor?: Doctor;
  EmploymentInvites?: EmploymentInvite[];
  Employments?: Employment[];
  Notifications?: Notification[];
  OrganisationAdmins?: OrganisationAdmin[];
  Organisations?: Organisation[];
  Patients?: Patient[];
  UserCourses?: UserCourse[];
  UserCredential?: UserCredential;
}

export type UserPk = "id";
export type UserId = UserModel[UserPk];
type UserOptionalAttributes = "id" | "picture" | "banner" | "gender" | "phoneNumber" | "addressId" | "active" | "isDeleted" | "createdAt";
export type UserCreationAttributes = Optional<User, UserOptionalAttributes>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  id!: number;
  email!: string;
  firstName!: string;
  lastName!: string;
  picture?: string;
  banner?: string;
  gender?: 'male' | 'female';
  phoneNumber?: string;
  addressId?: number;
  active!: boolean;
  isDeleted!: boolean;
  createdAt!: Date;

  // User belongsTo Address via addressId
  Address!: AddressModel;
  getAddress!: Sequelize.BelongsToGetAssociationMixin<AddressModel>;
  setAddress!: Sequelize.BelongsToSetAssociationMixin<AddressModel, AddressId>;
  createAddress!: Sequelize.BelongsToCreateAssociationMixin<AddressModel>;
  // User hasMany Course via createdBy
  Courses!: CourseModel[];
  getCourses!: Sequelize.HasManyGetAssociationsMixin<CourseModel>;
  setCourses!: Sequelize.HasManySetAssociationsMixin<CourseModel, CourseId>;
  addCourse!: Sequelize.HasManyAddAssociationMixin<CourseModel, CourseId>;
  addCourses!: Sequelize.HasManyAddAssociationsMixin<CourseModel, CourseId>;
  createCourse!: Sequelize.HasManyCreateAssociationMixin<CourseModel>;
  removeCourse!: Sequelize.HasManyRemoveAssociationMixin<CourseModel, CourseId>;
  removeCourses!: Sequelize.HasManyRemoveAssociationsMixin<CourseModel, CourseId>;
  hasCourse!: Sequelize.HasManyHasAssociationMixin<CourseModel, CourseId>;
  hasCourses!: Sequelize.HasManyHasAssociationsMixin<CourseModel, CourseId>;
  countCourses!: Sequelize.HasManyCountAssociationsMixin;
  // User hasOne Doctor via userId
  Doctor!: DoctorModel;
  getDoctor!: Sequelize.HasOneGetAssociationMixin<DoctorModel>;
  setDoctor!: Sequelize.HasOneSetAssociationMixin<DoctorModel, DoctorId>;
  createDoctor!: Sequelize.HasOneCreateAssociationMixin<DoctorModel>;
  // User hasMany EmploymentInvite via userId
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
  // User hasMany Employment via userId
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
  // User hasMany Notification via userId
  Notifications!: NotificationModel[];
  getNotifications!: Sequelize.HasManyGetAssociationsMixin<NotificationModel>;
  setNotifications!: Sequelize.HasManySetAssociationsMixin<NotificationModel, NotificationId>;
  addNotification!: Sequelize.HasManyAddAssociationMixin<NotificationModel, NotificationId>;
  addNotifications!: Sequelize.HasManyAddAssociationsMixin<NotificationModel, NotificationId>;
  createNotification!: Sequelize.HasManyCreateAssociationMixin<NotificationModel>;
  removeNotification!: Sequelize.HasManyRemoveAssociationMixin<NotificationModel, NotificationId>;
  removeNotifications!: Sequelize.HasManyRemoveAssociationsMixin<NotificationModel, NotificationId>;
  hasNotification!: Sequelize.HasManyHasAssociationMixin<NotificationModel, NotificationId>;
  hasNotifications!: Sequelize.HasManyHasAssociationsMixin<NotificationModel, NotificationId>;
  countNotifications!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany OrganisationAdmin via userId
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
  // User belongsToMany Organisation via userId and organisationId
  Organisations!: Organisation[];
  getOrganisations!: Sequelize.BelongsToManyGetAssociationsMixin<OrganisationModel>;
  setOrganisations!: Sequelize.BelongsToManySetAssociationsMixin<OrganisationModel, OrganisationId>;
  addOrganisation!: Sequelize.BelongsToManyAddAssociationMixin<OrganisationModel, OrganisationId>;
  addOrganisations!: Sequelize.BelongsToManyAddAssociationsMixin<OrganisationModel, OrganisationId>;
  createOrganisation!: Sequelize.BelongsToManyCreateAssociationMixin<OrganisationModel>;
  removeOrganisation!: Sequelize.BelongsToManyRemoveAssociationMixin<OrganisationModel, OrganisationId>;
  removeOrganisations!: Sequelize.BelongsToManyRemoveAssociationsMixin<OrganisationModel, OrganisationId>;
  hasOrganisation!: Sequelize.BelongsToManyHasAssociationMixin<OrganisationModel, OrganisationId>;
  hasOrganisations!: Sequelize.BelongsToManyHasAssociationsMixin<OrganisationModel, OrganisationId>;
  countOrganisations!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User hasMany Patient via userId
  Patients!: PatientModel[];
  getPatients!: Sequelize.HasManyGetAssociationsMixin<PatientModel>;
  setPatients!: Sequelize.HasManySetAssociationsMixin<PatientModel, PatientId>;
  addPatient!: Sequelize.HasManyAddAssociationMixin<PatientModel, PatientId>;
  addPatients!: Sequelize.HasManyAddAssociationsMixin<PatientModel, PatientId>;
  createPatient!: Sequelize.HasManyCreateAssociationMixin<PatientModel>;
  removePatient!: Sequelize.HasManyRemoveAssociationMixin<PatientModel, PatientId>;
  removePatients!: Sequelize.HasManyRemoveAssociationsMixin<PatientModel, PatientId>;
  hasPatient!: Sequelize.HasManyHasAssociationMixin<PatientModel, PatientId>;
  hasPatients!: Sequelize.HasManyHasAssociationsMixin<PatientModel, PatientId>;
  countPatients!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany UserCourse via userId
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
  // User hasOne UserCredential via userId
  UserCredential!: UserCredentialModel;
  getUserCredential!: Sequelize.HasOneGetAssociationMixin<UserCredentialModel>;
  setUserCredential!: Sequelize.HasOneSetAssociationMixin<UserCredentialModel, UserCredentialId>;
  createUserCredential!: Sequelize.HasOneCreateAssociationMixin<UserCredentialModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserModel {
    return UserModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    banner: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male','female'),
      allowNull: true
    },
    phoneNumber: {
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
    tableName: 'users',
    modelName: 'User',
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
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_address_FK",
        using: "BTREE",
        fields: [
          { name: "addressId" },
        ]
      },
    ]
  });
  }
}
