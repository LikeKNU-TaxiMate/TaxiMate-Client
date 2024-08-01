import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_PATH } from '@/constants/path.ts';
import { Post } from '@/types/post.ts';

// base URL과 엔드포인트들로 서비스 정의
export const localApi = createApi({
  reducerPath: 'localApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getPosts: builder.query<{ data: Post[] }, string>({
      query: () => API_PATH.POST.GET.ALL,
    }),
  }),
});

// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const { useGetPostsQuery } = localApi;