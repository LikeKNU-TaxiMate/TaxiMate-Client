import redirectToStoreOrWeb from './redirectToStoreOrWeb.ts';

/**
 * 다른 앱으로 이동하거나, 앱이 없는 경우 스토어 또는 웹으로 리디렉션합니다.
 */
const openOtherApp = (
  deepLink: string,
  iosUrl: string,
  androidUrl: string,
  webUrl?: string
) => {
  const clickedAt = Date.now();
  // 1. 앱 실행 시도 (deepLink를 사용하여)
  location.href = deepLink;

  // 2. 1.5초 후 앱이 설치되지 않은 경우 대체 경로 이동
  setTimeout(() => {
    const elapsed = Date.now() - clickedAt;
    if (elapsed < 2000) {
      redirectToStoreOrWeb(androidUrl, iosUrl, webUrl);
    }
  }, 1500);
};

export default openOtherApp;
