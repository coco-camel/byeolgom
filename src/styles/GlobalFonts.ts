import { createGlobalStyle } from 'styled-components';

import NotoSansKRRegular from '../assets/fonts/NotoSansKR-Regular.ttf';
import NotoSansKRMedium from '../assets/fonts/NotoSansKR-Medium.ttf';
import NotoSansKRLight from '../assets/fonts/NotoSansKR-Light.ttf';
import NotoSansKRExtraLight from '../assets/fonts/NotoSansKR-ExtraLight.ttf';
import NotoSansKRSemiBold from '../assets/fonts/NotoSansKR-SemiBold.ttf';
import NotoSansKRBold from '../assets/fonts/NotoSansKR-Bold.ttf';
import NotoSansKRExtraBold from '../assets/fonts/NotoSansKR-ExtraBold.ttf';
import NotoSansKRBlack from '../assets/fonts/NotoSansKR-Black.ttf';
import NotoSansKRThin from '../assets/fonts/NotoSansKR-Thin.ttf';

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



`;

export default GlobalFonts;
