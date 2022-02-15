import { ExperienceCase } from '../../components/Forms/CreateProfileForm/formInitialValues';
import { ESpecialistProfileType, EWorkersQuantity } from '../../enums/profileTypes';
import { User } from '../user';

export type GetUserResponse = {
  specialistProfile: {
    specialistProfileType: ESpecialistProfileType;
    workersNumber: EWorkersQuantity;
    services: string[];
    experienceCases: ({ id: string; startDate: string; endDate: string } & ExperienceCase)[];
  };
} & User;
