import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 16px;
    font-family: 'pretendard';
	vertical-align: baseline;
    box-sizing: border-box;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
input { 
    box-sizing: border-box;
    border: none;
    outline:none
}
input:checked {
    border: none
}
button {
    background: none;
    border:none;
    cursor: pointer;
    outline:none;
	padding: 0;
}
a {
	text-decoration: none;
	outline: none;
	&:hover, &:active {
		text-decoration: none;
	}
    color: #222;
}

body {
	cursor: url('/src/assets/images/starBearPo.svg'), default;
}

body.hovering {
  	cursor: url("/src/assets/images/starBearPo.svg"), pointer;
}

body {
	background-image: url("/src/assets/images/webBG.png");
	background-size: cover;
	/* background-color: #2f3438; */
	color: ${({ theme }) => theme.fontColor};
}
`;

export default GlobalStyle;
