import { createGlobalStyle } from 'styled-components';

import NotoSansKRRegular from '/assets/fonts/Noto_Sans_KR/static/NotoSansKR-Regular.ttf';
import NotoSansKRMedium from '/assets/fonts/Noto_Sans_KR/static/NotoSansKR-Medium.ttf';
import NotoSansKRLight from '/assets/fonts/Noto_Sans_KR/static/NotoSansKR-Light.ttf';
import NotoSansKRExtraLight from '/assets/fonts/Noto_Sans_KR/static/NotoSansKR-ExtraLight.ttf';
import NotoSansKRSemiBold from '/assets/fonts/Noto_Sans_KR/static/NotoSansKR-SemiBold.ttf';
import NotoSansKRBold from '/assets/fonts/Noto_Sans_KR/static/NotoSansKR-Bold.ttf';
import NotoSansKRExtraBold from '/assets/fonts/Noto_Sans_KR/static/NotoSansKR-ExtraBold.ttf';
import NotoSansKRBlack from '/assets/fonts/Noto_Sans_KR/static/NotoSansKR-Black.ttf';
import NotoSansKRThin from '/assets/fonts/Noto_Sans_KR/static/NotoSansKR-Thin.ttf';

import PyeongChangPeaceLight from '/assets/fonts/pyeongChangPeace/PyeongChangPeace-Light.ttf';
import PyeongChangPeaceBold from '/assets/fonts/pyeongChangPeace/PyeongChangPeace-Bold.ttf';

import PretendardVariable from '/assets/fonts/pretendard/PretendardVariable.ttf';

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRThin}) format('truetype');
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRExtraLight}) format('truetype');
    font-weight: 200;
    font-style: normal;
  }
@font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRLight}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRMedium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRSemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRExtraBold}) format('truetype');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRBlack}) format('truetype');
    font-weight: 900;
    font-style: normal;
  }
  // PyeongChang font faces
  @font-face {
    font-family: 'PyeongChangPeace-Light';
    src: url(${PyeongChangPeaceLight}) format('truetype');
    font-weight: light;
    font-style: normal;
  }
  @font-face {
    font-family: 'PyeongChangPeace-Bold';
    src: url(${PyeongChangPeaceBold}) format('truetype');
    font-weight: Bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'pretendard';
    src: url(${PretendardVariable}) format('truetype');
    font-style: normal;
    line-height: 140%;
  }
`;

export default GlobalFonts;
