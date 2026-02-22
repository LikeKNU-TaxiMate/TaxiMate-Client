import { baseApi } from '@/api/baseApi.ts';
import { API_PATH } from '@/constants/path.ts';
import { CreatePartyRes, Party, PartyDetail } from '@/types/party.ts';
import { RegisterData } from '@/types';
import formatPathWithParams from '@/utils/formatPathWithParams.ts';

const partyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPartys: builder.query<
      Party[],
      {
        minLatitude: number;
        minLongitude: number;
        maxLatitude: number;
        maxLongitude: number;
      }
    >({
      query: (arg) => ({
        url: API_PATH.PARTY.GET.ALL,
        params: arg,
      }),
      transformResponse: (response: { data: Party[] }) => response.data,
      keepUnusedDataFor: 0,
    }),
    getPartyById: builder.query<PartyDetail, string>({
      query: (id) => formatPathWithParams(API_PATH.PARTY.GET.BY_ID, id),
      transformResponse: (response: { data: PartyDetail }) => response.data,
      keepUnusedDataFor: 1,
    }),
    getJoinPartys: builder.query<Party[], string>({
      query: () => API_PATH.PARTY.GET.JOIN_POSTS,
      transformResponse: (response: { data: Party[] }) => response.data,
      keepUnusedDataFor: 3,
    }),
    getClosePartys: builder.query<Party[], string>({
      query: () => API_PATH.PARTY.GET.CLOSE_POSTS,
      transformResponse: (response: { data: Party[] }) => response.data,
      keepUnusedDataFor: 3,
    }),
    createParty: builder.mutation<CreatePartyRes, RegisterData>({
      query: (patch) => ({
        url: API_PATH.PARTY.POST,
        method: 'POST',
        body: patch,
      }),
    }),
  }),
});

export const {
  useLazyGetPartysQuery,
  useGetPartyByIdQuery,
  useGetJoinPartysQuery,
  useGetClosePartysQuery,
  useCreatePartyMutation,
} = partyApi;
