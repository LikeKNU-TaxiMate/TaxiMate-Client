// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_PATH = {
  SEARCH: {
    GET: 'https://dapi.kakao.com/v2/local/search/keyword.json',
  },
  PARTY: {
    GET: {
      ALL: `/api/v1/parties`,
      // 포스트 ID 조회
      BY_ID: `/api/v1/parties/:id`,
      // 특정 유저의 전체 포스트 조회
      BY_USER: `/posts/user/:id`,
      JOIN_POSTS: `/api/v1/participation`,
      CLOSE_POSTS: `/api/v1/participation?isTerminated=true`,
    },
    POST: `/api/v1/parties`,
  },
  USER: {
    GET_ACCESS_TOKEN: `/oauth2/kakao`,
    GET_REFRESH_ACCESS_TOKEN: `/api/v1/auth/tokens`,
    GET_PROFILES: `/api/v1/profiles`,
    SET_PUSH_ALARM: `/api/v1/notifications/tokens`,
  },
  CHAT: {
    PARTICIPATION: `/api/v1/participation`,
    GET_CHAT_LIST: `/api/v1/chats`,
    GET_CHAT: '/api/v1/chats/:id',
  },
};

export const CLIENT_PATH = {
  SEARCH: '/search',
  POST_DETAIL: '/posts/:id',
  CREATE_POST: '/create-post',
  CHAT_LISTS: '/chat-list',
  CHAT_ROOM: '/chat-list/:id',
  USAGE_HISTORY: '/usage-history',
  MY_PROFILE: '/my-profile',
  LOGIN: '/login',
  LOGIN_LOADING: '/login-loading',
};
