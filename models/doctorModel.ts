import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Address, AddressId, AddressModel } from './addressModel';
import type { Appointment, AppointmentId, AppointmentModel } from './appointmentModel';
import type { CourseAuthor, CourseAuthorId, CourseAuthorModel } from './courseAuthorModel';
import type { DoctorSpecialty, DoctorSpecialtyId, DoctorSpecialtyModel } from './doctorSpecialtyModel';
import type { Patient, PatientId, PatientModel } from './patientModel';
import type { RecommendedDoctor, RecommendedDoctorId, RecommendedDoctorModel } from './recommendedDoctorModel';
import type { Specialty, SpecialtyId, SpecialtyModel } from './specialtyModel';
import type { User, UserId, UserModel } from './userModel';

export interface Doctor {
  id: number;
  userId: number;
  description?: string;
  picture?: string;
  email?: string;
  phone?: string;
  banner?: string;
  addressId?: number;
  active: boolean;
  isDeleted: boolean;
  createdAt: Date;

  // associations
  Address?: Address;
  Appointments?: Appointment[];
  CourseAuthors?: CourseAuthor[];
  DoctorSpecialties?: DoctorSpecialty[];
  Patients?: Patient[];
  RecommendedDoctors?: RecommendedDoctor[];
  Specialties?: Specialty[];
  User?: User;
}

export type DoctorPk = "id";
export type DoctorId = DoctorModel[DoctorPk];
type DoctorOptionalAttributes = "id" | "description" | "picture" | "email" | "phone" | "banner" | "addressId" | "active" | "isDeleted" | "createdAt";
export type DoctorCreationAttributes = Optional<Doctor, DoctorOptionalAttributes>;

export class DoctorModel extends Model<Doctor, DoctorCreationAttributes> implements Doctor {
  id!: number;
  userId!: number;
  description?: string;
  picture?: string;
  email?: string;
  phone?: string;
  banner?: string;
  addressId?: number;
  active!: boolean;
  isDeleted!: boolean;
  createdAt!: Date;

  // Doctor belongsTo Address via addressId
  Address!: AddressModel;
  getAddress!: Sequelize.BelongsToGetAssociationMixin<AddressModel>;
  setAddress!: Sequelize.BelongsToSetAssociationMixin<AddressModel, AddressId>;
  createAddress!: Sequelize.BelongsToCreateAssociationMixin<AddressModel>;
  // Doctor hasMany Appointment via doctorId
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
  // Doctor hasMany CourseAuthor via doctorId
  CourseAuthors!: CourseAuthorModel[];
  getCourseAuthors!: Sequelize.HasManyGetAssociationsMixin<CourseAuthorModel>;
  setCourseAuthors!: Sequelize.HasManySetAssociationsMixin<CourseAuthorModel, CourseAuthorId>;
  addCourseAuthor!: Sequelize.HasManyAddAssociationMixin<CourseAuthorModel, CourseAuthorId>;
  addCourseAuthors!: Sequelize.HasManyAddAssociationsMixin<CourseAuthorModel, CourseAuthorId>;
  createCourseAuthor!: Sequelize.HasManyCreateAssociationMixin<CourseAuthorModel>;
  removeCourseAuthor!: Sequelize.HasManyRemoveAssociationMixin<CourseAuthorModel, CourseAuthorId>;
  removeCourseAuthors!: Sequelize.HasManyRemoveAssociationsMixin<CourseAuthorModel, CourseAuthorId>;
  hasCourseAuthor!: Sequelize.HasManyHasAssociationMixin<CourseAuthorModel, CourseAuthorId>;
  hasCourseAuthors!: Sequelize.HasManyHasAssociationsMixin<CourseAuthorModel, CourseAuthorId>;
  countCourseAuthors!: Sequelize.HasManyCountAssociationsMixin;
  // Doctor hasMany DoctorSpecialty via doctorId
  DoctorSpecialties!: DoctorSpecialtyModel[];
  getDoctorSpecialties!: Sequelize.HasManyGetAssociationsMixin<DoctorSpecialtyModel>;
  setDoctorSpecialties!: Sequelize.HasManySetAssociationsMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  addDoctorSpecialty!: Sequelize.HasManyAddAssociationMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  addDoctorSpecialties!: Sequelize.HasManyAddAssociationsMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  createDoctorSpecialty!: Sequelize.HasManyCreateAssociationMixin<DoctorSpecialtyModel>;
  removeDoctorSpecialty!: Sequelize.HasManyRemoveAssociationMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  removeDoctorSpecialties!: Sequelize.HasManyRemoveAssociationsMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  hasDoctorSpecialty!: Sequelize.HasManyHasAssociationMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  hasDoctorSpecialties!: Sequelize.HasManyHasAssociationsMixin<DoctorSpecialtyModel, DoctorSpecialtyId>;
  countDoctorSpecialties!: Sequelize.HasManyCountAssociationsMixin;
  // Doctor hasMany Patient via doctorId
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
  // Doctor hasMany RecommendedDoctor via doctorId
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
  // Doctor belongsToMany Specialty via doctorId and specialtyId
  Specialties!: Specialty[];
  getSpecialties!: Sequelize.BelongsToManyGetAssociationsMixin<SpecialtyModel>;
  setSpecialties!: Sequelize.BelongsToManySetAssociationsMixin<SpecialtyModel, SpecialtyId>;
  addSpecialty!: Sequelize.BelongsToManyAddAssociationMixin<SpecialtyModel, SpecialtyId>;
  addSpecialties!: Sequelize.BelongsToManyAddAssociationsMixin<SpecialtyModel, SpecialtyId>;
  createSpecialty!: Sequelize.BelongsToManyCreateAssociationMixin<SpecialtyModel>;
  removeSpecialty!: Sequelize.BelongsToManyRemoveAssociationMixin<SpecialtyModel, SpecialtyId>;
  removeSpecialties!: Sequelize.BelongsToManyRemoveAssociationsMixin<SpecialtyModel, SpecialtyId>;
  hasSpecialtyId_specialty!: Sequelize.BelongsToManyHasAssociationMixin<SpecialtyModel, SpecialtyId>;
  hasSpecialties!: Sequelize.BelongsToManyHasAssociationsMixin<SpecialtyModel, SpecialtyId>;
  countSpecialties!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Doctor belongsTo User via userId
  User!: UserModel;
  getUser!: Sequelize.BelongsToGetAssociationMixin<UserModel>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<UserModel, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<UserModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof DoctorModel {
    return DoctorModel.init({
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
      unique: "doctors_ibfk_1"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'doctors',
    modelName: 'Doctor',
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
        name: "doctors_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "doctors_address_FK",
        using: "BTREE",
        fields: [
          { name: "addressId" },
        ]
      },
    ]
  });
  }
}
