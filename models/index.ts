import type { Sequelize } from "sequelize";
import { AddressModel } from "./addressModel";
import { AppointmentModel } from "./appointmentModel";
import { AssessmentInstructionModel } from "./assessmentInstructionModel";
import { AssessmentOptionModel } from "./assessmentOptionModel";
import { CountryModel } from "./countryModel";
import { CourseAssessmentModel } from "./courseAssessmentModel";
import { CourseAuthorModel } from "./courseAuthorModel";
import { CourseContentModel } from "./courseContentModel";
import { CourseLevelModel } from "./courseLevelModel";
import { CourseModel } from "./courseModel";
import { DoctorSpecialtyModel } from "./doctorSpecialtyModel";
import { DoctorModel } from "./doctorModel";
import { EmploymentInviteModel } from "./employmentInviteModel";
import { EmploymentModel } from "./employmentModel";
import { NotificationModel } from "./notificationModel";
import { OrganisationAdminModel } from "./organisationAdminModel";
import { OrganisationModel } from "./organisationModel";
import { PatientModel } from "./patientModel";
import { RecommendedCourseModel } from "./recommendedCourseModel";
import { RecommendedDoctorModel } from "./recommendedDoctorModel";
import { SpecialtyModel } from "./specialtyModel";
import { UserCourseAssessmentModel } from "./userCourseAssessmentModel";
import { UserCourseModel } from "./userCourseModel";
import { UserCredentialModel } from "./userCredentialModel";
import { UserModel } from "./userModel";
import { ZoneModel } from "./zoneModel";

import type { Address, AddressCreationAttributes } from "./addressModel";
import type { Appointment, AppointmentCreationAttributes } from "./appointmentModel";
import type { AssessmentInstruction, AssessmentInstructionCreationAttributes } from "./assessmentInstructionModel";
import type { AssessmentOption, AssessmentOptionCreationAttributes } from "./assessmentOptionModel";
import type { Country, CountryCreationAttributes } from "./countryModel";
import type { CourseAssessment, CourseAssessmentCreationAttributes } from "./courseAssessmentModel";
import type { CourseAuthor, CourseAuthorCreationAttributes } from "./courseAuthorModel";
import type { CourseContent, CourseContentCreationAttributes } from "./courseContentModel";
import type { CourseLevel, CourseLevelCreationAttributes } from "./courseLevelModel";
import type { Course, CourseCreationAttributes } from "./courseModel";
import type { DoctorSpecialty, DoctorSpecialtyCreationAttributes } from "./doctorSpecialtyModel";
import type { Doctor, DoctorCreationAttributes } from "./doctorModel";
import type { EmploymentInvite, EmploymentInviteCreationAttributes } from "./employmentInviteModel";
import type { Employment, EmploymentCreationAttributes } from "./employmentModel";
import type { Notification, NotificationCreationAttributes } from "./notificationModel";
import type { OrganisationAdmin, OrganisationAdminCreationAttributes } from "./organisationAdminModel";
import type { Organisation, OrganisationCreationAttributes } from "./organisationModel";
import type { Patient, PatientCreationAttributes } from "./patientModel";
import type { RecommendedCourse, RecommendedCourseCreationAttributes } from "./recommendedCourseModel";
import type { RecommendedDoctor, RecommendedDoctorCreationAttributes } from "./recommendedDoctorModel";
import type { Specialty, SpecialtyCreationAttributes } from "./specialtyModel";
import type { UserCourseAssessment, UserCourseAssessmentCreationAttributes } from "./userCourseAssessmentModel";
import type { UserCourse, UserCourseCreationAttributes } from "./userCourseModel";
import type { UserCredential, UserCredentialCreationAttributes } from "./userCredentialModel";
import type { User, UserCreationAttributes } from "./userModel";
import type { Zone, ZoneCreationAttributes } from "./zoneModel";

export type {
  Address, AddressCreationAttributes,
  Appointment, AppointmentCreationAttributes,
  AssessmentInstruction, AssessmentInstructionCreationAttributes,
  AssessmentOption, AssessmentOptionCreationAttributes,
  Country, CountryCreationAttributes,
  CourseAssessment, CourseAssessmentCreationAttributes,
  CourseAuthor, CourseAuthorCreationAttributes,
  CourseContent, CourseContentCreationAttributes,
  CourseLevel, CourseLevelCreationAttributes,
  Course, CourseCreationAttributes,
  DoctorSpecialty, DoctorSpecialtyCreationAttributes,
  Doctor, DoctorCreationAttributes,
  EmploymentInvite, EmploymentInviteCreationAttributes,
  Employment, EmploymentCreationAttributes,
  Notification, NotificationCreationAttributes,
  OrganisationAdmin, OrganisationAdminCreationAttributes,
  Organisation, OrganisationCreationAttributes,
  Patient, PatientCreationAttributes,
  RecommendedCourse, RecommendedCourseCreationAttributes,
  RecommendedDoctor, RecommendedDoctorCreationAttributes,
  Specialty, SpecialtyCreationAttributes,
  UserCourseAssessment, UserCourseAssessmentCreationAttributes,
  UserCourse, UserCourseCreationAttributes,
  UserCredential, UserCredentialCreationAttributes,
  User, UserCreationAttributes,
  Zone, ZoneCreationAttributes,
};

export const modelsBuilder = (sq: Sequelize) => {
  const db = {
    Address: AddressModel.initModel(sq),
    Appointment: AppointmentModel.initModel(sq),
    AssessmentInstruction: AssessmentInstructionModel.initModel(sq),
    AssessmentOption: AssessmentOptionModel.initModel(sq),
    Country: CountryModel.initModel(sq),
    Course: CourseModel.initModel(sq),
    CourseAssessment: CourseAssessmentModel.initModel(sq),
    CourseAuthor: CourseAuthorModel.initModel(sq),
    CourseContent: CourseContentModel.initModel(sq),
    CourseLevel: CourseLevelModel.initModel(sq),
    Doctor: DoctorModel.initModel(sq),
    DoctorSpecialty: DoctorSpecialtyModel.initModel(sq),
    Employment: EmploymentModel.initModel(sq),
    EmploymentInvite: EmploymentInviteModel.initModel(sq),
    Notification: NotificationModel.initModel(sq),
    Organisation: OrganisationModel.initModel(sq),
    OrganisationAdmin: OrganisationAdminModel.initModel(sq),
    Patient: PatientModel.initModel(sq),
    RecommendedCourse: RecommendedCourseModel.initModel(sq),
    RecommendedDoctor: RecommendedDoctorModel.initModel(sq),
    Specialty: SpecialtyModel.initModel(sq),
    User: UserModel.initModel(sq),
    UserCourse: UserCourseModel.initModel(sq),
    UserCourseAssessment: UserCourseAssessmentModel.initModel(sq),
    UserCredential: UserCredentialModel.initModel(sq),
    Zone: ZoneModel.initModel(sq),
  }

  db.Doctor.belongsToMany(db.Specialty, { as: 'Specialties', through: db.DoctorSpecialty, foreignKey: "doctorId", otherKey: "specialtyId" });
  db.Organisation.belongsToMany(db.User, { as: 'Users', through: db.OrganisationAdmin, foreignKey: "organisationId", otherKey: "userId" });
  db.Specialty.belongsToMany(db.Doctor, { as: 'Doctors', through: db.DoctorSpecialty, foreignKey: "specialtyId", otherKey: "doctorId" });
  db.User.belongsToMany(db.Organisation, { as: 'Organisations', through: db.OrganisationAdmin, foreignKey: "userId", otherKey: "organisationId" });
  db.Address.belongsTo(db.Country, { foreignKey: "countryId" });
  db.Address.belongsTo(db.Zone, { foreignKey: "zoneId" });
  db.Address.hasMany(db.Doctor, { as: "Doctors", foreignKey: "addressId" });
  db.Address.hasMany(db.Organisation, { as: "Organisations", foreignKey: "addressId" });
  db.Address.hasMany(db.User, { as: "Users", foreignKey: "addressId" });
  db.Appointment.belongsTo(db.Doctor, { foreignKey: "doctorId" });
  db.Appointment.belongsTo(db.Employment, { foreignKey: "employmentId" });
  db.AssessmentInstruction.belongsTo(db.CourseLevel, { as: "Level", foreignKey: "levelId" });
  db.AssessmentOption.belongsTo(db.CourseAssessment, { as: "Assessment", foreignKey: "assessmentId" });
  db.AssessmentOption.hasMany(db.CourseAssessment, { as: "CourseAssessments", foreignKey: "answerId" });
  db.AssessmentOption.hasMany(db.UserCourseAssessment, { as: "UserCourseAssessments", foreignKey: "answerId" });
  db.Country.hasMany(db.Address, { as: "Addresses", foreignKey: "countryId" });
  db.Course.belongsTo(db.User, { as: "CreatedByUser", foreignKey: "createdBy" });
  db.Course.hasMany(db.CourseAuthor, { as: "CourseAuthors", foreignKey: "courseId" });
  db.Course.hasMany(db.CourseLevel, { as: "CourseLevels", foreignKey: "courseId" });
  db.Course.hasMany(db.RecommendedCourse, { as: "RecommendedCourses", foreignKey: "courseId" });
  db.Course.hasMany(db.UserCourse, { as: "UserCourses", foreignKey: "courseId" });
  db.CourseAssessment.belongsTo(db.AssessmentOption, { as: "Answer", foreignKey: "answerId" });
  db.CourseAssessment.belongsTo(db.CourseLevel, { as: "Level", foreignKey: "levelId" });
  db.CourseAssessment.hasMany(db.AssessmentOption, { as: "AssessmentOptions", foreignKey: "assessmentId" });
  db.CourseAssessment.hasMany(db.UserCourseAssessment, { as: "UserCourseAssessments", foreignKey: "questionId" });
  db.CourseAuthor.belongsTo(db.Course, { foreignKey: "courseId" });
  db.CourseAuthor.belongsTo(db.Doctor, { foreignKey: "doctorId" });
  db.CourseContent.belongsTo(db.CourseLevel, { as: "Level", foreignKey: "levelId" });
  db.CourseLevel.belongsTo(db.Course, { foreignKey: "courseId" });
  db.CourseLevel.hasMany(db.AssessmentInstruction, { as: "AssessmentInstructions", foreignKey: "levelId" });
  db.CourseLevel.hasMany(db.CourseAssessment, { as: "CourseAssessments", foreignKey: "levelId" });
  db.CourseLevel.hasMany(db.CourseContent, { as: "CourseContents", foreignKey: "levelId" });
  db.CourseLevel.hasMany(db.UserCourse, { as: "UserCourses", foreignKey: "levelId" });
  db.Doctor.belongsTo(db.Address, { foreignKey: "addressId" });
  db.Doctor.belongsTo(db.User, { foreignKey: "userId" });
  db.Doctor.hasMany(db.Appointment, { as: "Appointments", foreignKey: "doctorId" });
  db.Doctor.hasMany(db.CourseAuthor, { as: "CourseAuthors", foreignKey: "doctorId" });
  db.Doctor.hasMany(db.DoctorSpecialty, { as: "DoctorSpecialties", foreignKey: "doctorId" });
  db.Doctor.hasMany(db.Patient, { as: "Patients", foreignKey: "doctorId" });
  db.Doctor.hasMany(db.RecommendedDoctor, { as: "RecommendedDoctors", foreignKey: "doctorId" });
  db.DoctorSpecialty.belongsTo(db.Doctor, { foreignKey: "doctorId" });
  db.DoctorSpecialty.belongsTo(db.Specialty, { foreignKey: "specialtyId" });
  db.Employment.belongsTo(db.Organisation, { foreignKey: "organisationId" });
  db.Employment.belongsTo(db.User, { foreignKey: "userId" });
  db.Employment.hasMany(db.Appointment, { as: "Appointments", foreignKey: "employmentId" });
  db.Employment.hasMany(db.RecommendedCourse, { as: "RecommendedCourses", foreignKey: "employmentId" });
  db.Employment.hasMany(db.RecommendedDoctor, { as: "RecommendedDoctors", foreignKey: "employmentId" });
  db.Employment.hasMany(db.UserCourse, { as: "UserCourses", foreignKey: "employmentId" });
  db.EmploymentInvite.belongsTo(db.Organisation, { foreignKey: "organisationId" });
  db.EmploymentInvite.belongsTo(db.User, { foreignKey: "userId" });
  db.Notification.belongsTo(db.User, { foreignKey: "userId" });
  db.Organisation.belongsTo(db.Address, { foreignKey: "addressId" });
  db.Organisation.hasMany(db.Employment, { as: "Employments", foreignKey: "organisationId" });
  db.Organisation.hasMany(db.EmploymentInvite, { as: "EmploymentInvites", foreignKey: "organisationId" });
  db.Organisation.hasMany(db.OrganisationAdmin, { as: "OrganisationAdmins", foreignKey: "organisationId" });
  db.OrganisationAdmin.belongsTo(db.Organisation, { foreignKey: "organisationId" });
  db.OrganisationAdmin.belongsTo(db.User, { foreignKey: "userId" });
  db.Patient.belongsTo(db.Doctor, { foreignKey: "doctorId" });
  db.Patient.belongsTo(db.User, { foreignKey: "userId" });
  db.RecommendedCourse.belongsTo(db.Course, { foreignKey: "courseId" });
  db.RecommendedCourse.belongsTo(db.Employment, { foreignKey: "employmentId" });
  db.RecommendedDoctor.belongsTo(db.Doctor, { foreignKey: "doctorId" });
  db.RecommendedDoctor.belongsTo(db.Employment, { foreignKey: "employmentId" });
  db.Specialty.hasMany(db.DoctorSpecialty, { as: "DoctorSpecialties", foreignKey: "specialtyId" });
  db.User.belongsTo(db.Address, { foreignKey: "addressId" });
  db.User.hasMany(db.Course, { as: "Courses", foreignKey: "createdBy" });
  db.User.hasMany(db.Employment, { as: "Employments", foreignKey: "userId" });
  db.User.hasMany(db.EmploymentInvite, { as: "EmploymentInvites", foreignKey: "userId" });
  db.User.hasMany(db.Notification, { as: "Notifications", foreignKey: "userId" });
  db.User.hasMany(db.OrganisationAdmin, { as: "OrganisationAdmins", foreignKey: "userId" });
  db.User.hasMany(db.Patient, { as: "Patients", foreignKey: "userId" });
  db.User.hasMany(db.UserCourse, { as: "UserCourses", foreignKey: "userId" });
  db.User.hasOne(db.Doctor, { foreignKey: "userId" });
  db.User.hasOne(db.UserCredential, { foreignKey: "userId" });
  db.UserCourse.belongsTo(db.Course, { foreignKey: "courseId" });
  db.UserCourse.belongsTo(db.CourseLevel, { as: "Level", foreignKey: "levelId" });
  db.UserCourse.belongsTo(db.Employment, { foreignKey: "employmentId" });
  db.UserCourse.belongsTo(db.User, { foreignKey: "userId" });
  db.UserCourse.hasMany(db.UserCourseAssessment, { as: "UserCourseAssessments", foreignKey: "userCourseId" });
  db.UserCourseAssessment.belongsTo(db.AssessmentOption, { as: "Answer", foreignKey: "answerId" });
  db.UserCourseAssessment.belongsTo(db.CourseAssessment, { as: "Question", foreignKey: "questionId" });
  db.UserCourseAssessment.belongsTo(db.UserCourse, { foreignKey: "userCourseId" });
  db.UserCredential.belongsTo(db.User, { foreignKey: "userId" });
  db.Zone.hasMany(db.Address, { as: "Addresses", foreignKey: "zoneId" });

  return db;
}

