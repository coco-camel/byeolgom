import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HOWTO_1 from '@/HOWTO_1.svg';
import HOWTO_2 from '@/HOWTO_2.svg';
import HOWTO_3 from '@/HOWTO_3.svg';
import HOWTO_4 from '@/HOWTO_4.svg';
import Back from '@/back.svg?react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
interface SliderMethods extends Slider {
  slickNext: () => void;
}

function HowTo() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (current: number) => {
      setIsLastSlide(current === 3);
    },
  };

  const navigate = useNavigate();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const sliderRef = useRef<SliderMethods>(null);

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleNextOrFinish = () => {
    if (isLastSlide) {
      navigate(-1);
    } else {
      if (sliderRef.current !== null) {
        sliderRef.current.slickNext();
      }
    }
  };

  return (
    <>
      <StyledHeader>
        <button onClick={handleBackNavigation}>
          <Back width={20} height={20} fill="#EEEEEE" />
        </button>
      </StyledHeader>
      <StyledSlider ref={sliderRef} {...settings}>
        <div>
          <img src={HOWTO_1} alt="how to 1" width={'100%'} height={'100%'} />
        </div>
        <div>
          <img src={HOWTO_2} alt="how to 2" width={'100%'} height={'100%'} />
        </div>
        <div>
          <img src={HOWTO_3} alt="how to 3" width={'100%'} height={'100%'} />
        </div>
        <div>
          <img src={HOWTO_4} alt="how to 4" width={'100%'} height={'100%'} />
        </div>
      </StyledSlider>
      <StyledFooter onClick={handleNextOrFinish}>
        <FooterButton>
          <span>{isLastSlide ? '완료' : '다음'}</span>
        </FooterButton>
      </StyledFooter>
    </>
  );
}

export default HowTo;
const FooterButton = styled.button`
  span {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.fontColor};
  }
`;
const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 54px;
  background: ${({ theme }) => theme.footerArea};
  z-index: 1000;
  text-align: center;

  &:hover {
    background-color: #e88438;
  }
`;
const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 54px;
  color: white;
  z-index: 1000;
  button {
    margin-left: 20px;
    margin-top: 15px;
  }
`;

const StyledSlider = styled(Slider)`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .slick-dots {
    bottom: 77px;
    top: auto;
  }

  .slick-dots li button:before {
    opacity: 1;
    color: white;
    font-size: 8px;
  }
  .slick-dots li.slick-active button:before {
    opacity: 1;
    color: #e88438;
    font-size: 12px;
  }
`;
