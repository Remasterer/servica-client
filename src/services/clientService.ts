import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareAuthHeaders } from '../utils/index';

export const clientApi = createApi({
  reducerPath: 'clientAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL || ''}/client`,
    prepareHeaders: prepareAuthHeaders
  }),
  endpoints: (build) => ({
    createClientProfile: build.mutation<void, void>({
      query: () => ({
        url: '/profile',
        method: 'POST'
      })
    })
  })
});

export const { useCreateClientProfileMutation } = clientApi;
