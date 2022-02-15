import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RequestDefault, ResponseDefault, Tender } from '@models';
import { TenderBid } from '@components';
import { TenderBidders } from '../models/responses/tenderResponses';
import { TenderCreateBody } from '../models/requests/tendersRequests';
import { prepareAuthHeaders } from '../utils/index';

export const tendersApi = createApi({
  reducerPath: 'tendersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL || ''}/tenders`,
    prepareHeaders: prepareAuthHeaders
  }),
  tagTypes: ['Tenders', 'Tender'],
  endpoints: (build) => ({
    getAllTenders: build.query<ResponseDefault<{ tenders: Partial<Tender>[] }>, RequestDefault>({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params
      }),
      providesTags: () => ['Tenders']
    }),
    getTender: build.query<ResponseDefault<{ tender: Tender }>, { id: string } & RequestDefault>({
      query: ({ id, ...params }) => ({
        url: `/${id}`,
        method: 'GET',
        params
      }),
      providesTags: () => ['Tender']
    }),
    getTenderBidders: build.query<
      ResponseDefault<{ tender: Partial<{ tenderBidders: TenderBidders[] }> }>,
      { id: string } & RequestDefault
    >({
      query: ({ id, ...params }) => ({
        url: `/${id}/bidders`,
        method: 'GET',
        params
      })
    }),
    createTender: build.mutation<void, Partial<TenderCreateBody>>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Tenders']
    }),
    createTenderBid: build.mutation<void, { body: TenderBid; id: string }>({
      query: ({ body, id }) => ({
        url: `/${id}/makeBid`,
        method: 'POST',
        body
      })
    }),
    updateTender: build.mutation<void, { body: Partial<TenderCreateBody>; id: string }>({
      query: ({ body, id }) => ({
        url: `/${id}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Tender', 'Tenders']
    }),
    deleteTender: build.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'delete'
      }),
      invalidatesTags: ['Tenders']
    })
  })
});

export const {
  useGetAllTendersQuery,
  useGetTenderQuery,
  useGetTenderBiddersQuery,
  useCreateTenderMutation,
  useDeleteTenderMutation,
  useUpdateTenderMutation,
  useCreateTenderBidMutation
} = tendersApi;
