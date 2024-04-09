import {
  ModalHeader,
  BackButton,
  AnimatedWrapper,
  StyledImg,
  WhiteBox,
  ModalOverlay,
} from './ContentStyle';

function GetOtherWorry() {
  return (
    <>
      <ModalHeader>
        <BackButton />
      </ModalHeader>
      <AnimatedWrapper>
        <StyledImg />
        <WhiteBox />
      </AnimatedWrapper>
      <ModalOverlay />
    </>
  );
}

export default GetOtherWorry;
