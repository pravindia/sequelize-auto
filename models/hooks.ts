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

}

