import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import reactNativePostMessage from '@/utils/reactNativePostMessage.ts';

import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import { JoinButton } from '@/components/PostDetail/PostDetail.style.ts';

import TaxiIcon from '@/assets/icons/header/taxi-icon.svg?react';
import KnuLogoIcon from '@/assets/icons/header/knu-logo-icon.svg?react';

const OnboardingPage = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (sliderRef.current) {
      if (currentSlide === 4) {
        navigate('/');
      }
      sliderRef.current.slickNext();
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  return (
    <>
      <Header>
        <HeaderItem>
          택시팟
          <TaxiIcon />
        </HeaderItem>
        <button
          onClick={() => {
            reactNativePostMessage('like_knu');
          }}
        >
          <KnuLogoIcon />
        </button>
      </Header>
      <Main>
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          {...settings}
          useCSS={true}
        >
          <div>
            <Image src={'/onboarding1.png'} />
          </div>
          <div>
            <Image src={'/onboarding2.png'} />
          </div>
          <div>
            <Image src={'/onboarding3.png'} />
          </div>
          <div>
            <Image src={'/onboarding4.png'} />
          </div>
          <div>
            <Image src={'/onboarding5.png'} />
          </div>
        </Slider>
        <NextButton onClick={next}>
          {currentSlide === 4 ? '완료' : '다음'}
        </NextButton>
      </Main>
    </>
  );
};
export default OnboardingPage;

const NextButton = styled(JoinButton)`
  margin: 0 auto;
  width: 200px;
  min-height: 40px;
`;

const Image = styled.img`
  margin-bottom: 60px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;
