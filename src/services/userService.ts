import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { GetUserResponse } from '../models/responses/userResponses';
import { prepareAuthHeaders } from '../utils/index';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL || ''}/user`,
    prepareHeaders: prepareAuthHeaders
  }),
  endpoints: (build) => ({
    getUser: build.query<GetUserResponse, string>({
      query: (id) => ({ url: `/${id}` })
    })
  })
});

export const { useGetUserQuery } = usersApi;
