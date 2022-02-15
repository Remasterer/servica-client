import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { prepareAuthHeaders } from '../utils/index';
import { ExperienceCaseProfile } from '../components/Forms/CreateProfileForm/formInitialValues';

export interface CreateSpecialistProfile {
  specialistProfileType: string;
  workersNumber: string;
  services: string[];
  experienceCases: ExperienceCaseProfile[];
}

export const specialistAPI = createApi({
  reducerPath: 'specialistAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL || ''}/specialist`,
    prepareHeaders: prepareAuthHeaders
  }),
  endpoints: (build) => ({
    createSpecialistProfile: build.mutation<void, CreateSpecialistProfile>({
      query: (specialistProfile) => ({
        url: '/profile',
        method: 'POST',
        body: specialistProfile
      })
    })
  })
});

export const { useCreateSpecialistProfileMutation } = specialistAPI;
