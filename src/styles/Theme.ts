import lightBackground from '@/lightBackground.svg';
import background from '@/background.svg';

export const lightTheme = {
  bgImage: `url(${lightBackground})`,
  fontColor: '#000',
  ModalBox: '#eee',
  ModalOverlay: '#456BF0',
  StateModal: '#eee',
  footerArea: '#d7e5fa',
  button: '#b0b0b0',
  fill: '#000239',
  sendButton: '#eee',
  contentSendButton: '#B0B0B0',
  contenttext: '#000000',
  chatSendButton: '#D7E5FA',
  commentContent: '#D7E5FA',
  commentContentme: '#eee',
  loadingBG: 'rgba(43,66,187,0.3)',
};

export const darkTheme = {
  bgImage: `url(${background})`,
  fontColor: '#eee',
  ModalBox: '#1E2734',
  ModalOverlay: '#2F4768',
  StateModal: '#121212',
  footerArea: '#2f4768',
  button: '#eee',
  fill: '#eee',
  sendButton: '#eee',
  contentSendButton: '#eee',
  contenttext: '#121212',
  chatSendButton: '#2F4768',
  commentContent: '#2F4768',
  commentContentme: '#121212',
  loadingBG: 'rgba(47,71,104,0.3)',
};

export const theme = {
  lightTheme,
  darkTheme,
};
