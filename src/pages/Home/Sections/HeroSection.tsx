import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';

// Animations
const drawLine = keyframes`
  0% {
    stroke-dashoffset: 2000;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.08;
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  scroll-snap-align: start;
  padding: 2rem;
  maxgin: 0 ;
`;

const BackgroundSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const AnimatedLine = styled.path<{ delay?: number }>`
  fill: none;
  stroke: #fff;
  stroke-width: 1;
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  opacity: 0;
  animation: ${drawLine} 4s ease-out forwards;
  animation-delay: ${({ delay = 0 }) => delay}s;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  animation: ${fadeInUp} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s both;
`;

const MainTitle = styled.h1`

  font-weight: 700;
  font-size: clamp(2.5rem, 4.5vw, 4rem);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.15;
  margin: 0 0 1.5rem 0;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 4.5vw, 4rem);
    letter-spacing: 0.02em;
    line-height: 1.2;
  }

  @media (max-width: 480px) {
     font-size: clamp(2.5rem, 4.5vw, 4rem);
  }
`;

const MainTitlesub = styled.h2`
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    font-size: clamp(1.2rem, 2.2vw, 1rem);
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 1.2;
    margin: 0 0 1.5rem 0;
    color: #fff;
    opacity: 0.85;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.08);

    @media (max-width: 768px) {
        font-size: clamp(1.2rem, 2.2vw, 1rem);
        margin-bottom: 1rem;
    }

    @media (max-width: 480px) {
        font-size: clamp(1.2rem, 2.2vw, 1rem);
    }
`;

const Subtitle = styled.h2`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  font-size: clamp(1.2rem, 2.2vw, 1.3rem);
  line-height: 1.6;
  margin: 0 auto 3rem auto;
  margin-top: 1rem;
  opacity: 0.9;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: clamp(1.1rem, 3.5vw, 1.5rem);
    margin-bottom: 2rem;
    max-width: 90%;
  }
`;

const CTAButton = styled(ScrollLink)`
  display: inline-block;
  background: #fff;
  color: #111;
  padding: 1.2rem 3.2rem;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  border: 2px solid #fff;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);

  &:hover {
    background: transparent;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: clamp(0.95rem, 3vw, 1.1rem);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUp} 1s ease-out 2s both, ${pulse} 2s infinite 3s;
`;

const ScrollArrow = styled.div`
  width: 20px;
  height: 20px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
  opacity: 0.7;
`;

const ScrollText = styled.span`
  display: block;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #fff;
  opacity: 0.8;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const HeroSection: React.FC = () => {
    useEffect(() => {
        // Pré-carrega as fontes
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
        fontLink.rel = 'stylesheet';

        const preconnect1 = document.createElement('link');
        preconnect1.rel = 'preconnect';
        preconnect1.href = 'https://fonts.googleapis.com';

        const preconnect2 = document.createElement('link');
        preconnect2.rel = 'preconnect';
        preconnect2.href = 'https://fonts.gstatic.com';
        preconnect2.crossOrigin = 'anonymous';

        if (!document.querySelector('link[href*="montserrat"]')) {
            document.head.append(preconnect1, preconnect2, fontLink);
        }
    }, []);

    return (
        <HeroContainer id="hero">
            <BackgroundSVG
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
            >
                <AnimatedLine d="M 0 100 C 300 400 800 200 1200 600 S 1800 900 1920 800" delay={0} />
                <AnimatedLine d="M 1920 200 C 1600 500 1100 300 700 700 S 200 1000 0 980" delay={0.2} />
                <AnimatedLine d="M 500 0 L 500 1080" delay={0.4} />
                <AnimatedLine d="M 1400 0 L 1400 1080" delay={0.6} />
                <AnimatedLine d="M 0 540 L 1920 540" delay={0.8} />
            </BackgroundSVG>

            <ContentWrapper>
                <MainTitle>
                    HN Engenharia
                </MainTitle>
                <MainTitlesub>
                    Inovação em Construções
                </MainTitlesub>

                <Subtitle>
                    Soluções integradas em engenharia civil, industrial e gestão de projetos, combinando tradição e tecnologia
                </Subtitle>

                <CTAButton
                    to="about"
                    smooth={true}
                    duration={1000}
                    offset={-80}
                    aria-label="Conheça nossos serviços de engenharia"
                >
                    Saiba Mais
                </CTAButton>
            </ContentWrapper>

            <ScrollIndicator>
                <ScrollText>Explore Conosco</ScrollText>
                <ScrollArrow />
            </ScrollIndicator>
        </HeroContainer>
    );
};

export default HeroSection;