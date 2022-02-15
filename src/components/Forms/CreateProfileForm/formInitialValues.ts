import { EWorkersQuantity } from '@enums';
import { ServiceOptionType } from '@models';

export interface CreateProfileFormValues {
  profileType: string;
  specialistProfileType: string;
  workersNumber: string;
  services: ServiceOptionType[];
  experienceCases: ExperienceCaseProfile[];
}

export const formInitValues: CreateProfileFormValues = {
  profileType: '',
  specialistProfileType: '',
  workersNumber: EWorkersQuantity.SMALL,
  services: [],
  experienceCases: []
};
export interface ExperienceCase {
  title: string;
  description: string;
  startYear?: string;
  endYear?: string;
  startMonth?: string;
  endMonth?: string;
}

export interface ExperienceCaseProfile extends ExperienceCase {
  startDate?: string;
  endDate?: string;
}
