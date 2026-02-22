import type { UserAgentPlatform } from '../types/postDetail.types.ts';

const getUserAgentPlatform = (): UserAgentPlatform => {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'unknown';
};

const redirectToStoreOrWeb = (
  androidUrl: string,
  iosUrl: string,
  webUrl?: string
) => {
  const platform = getUserAgentPlatform();

  switch (platform) {
    case 'ios':
      location.href = iosUrl;
      break;
    case 'android':
      location.href = androidUrl;
      break;
    default:
      if (webUrl) {
        location.href = webUrl;
      } else {
        alert('현재 사용 중인 기기에서는 이동이 불가능합니다.');
      }
  }
};

export default redirectToStoreOrWeb;
