import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaRegCircle } from 'react-icons/fa';
import Loader from '../../../components/Loader.tsx';

// Animações
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const drawLine = keyframes`
  0% {
    stroke-dashoffset: 1000;
    opacity: 0;
  }
  30% {
     opacity: 0.05; /* Opacidade muito baixa durante o desenho */
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.03; /* Opacidade final ainda mais baixa */
  }
`;

// Paleta de cores suavizada
const LIGHT_COLOR = '#121212'; // Cinza muito escuro
const DARK_COLOR = '#f0f0f0'; // Cinza muito claro

// Styled Components
const AboutSectionContainer = styled.section`
  position: relative;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  scroll-snap-align: start;
  background-color: ${DARK_COLOR}; /* Fundo sólido escuro */
  color: ${LIGHT_COLOR}; /* Cor do texto padrão para o fundo escuro */
`;

const BackgroundSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  /* Opacidade inicial 0, controlada pela animação */
`;

const AnimatedLine = styled.path<{ delay?: number }>`
  fill: none;
  stroke: ${LIGHT_COLOR}; /* Linhas claras sobre fundo escuro */
  stroke-width: 0.5; /* Traço extra fino */
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  opacity: 0; /* Começa invisível */
  animation: ${drawLine} 3s ease-out forwards;
  animation-delay: ${({ delay = 0 }) => delay}s;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10; /* Conteúdo acima do SVG */
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem; /* Aumenta padding para mais espaço */
  display: grid;
  grid-template-columns: 1fr; /* Default to single column */
  gap: 4rem;
  align-items: start; /* Alinha ao topo */

  @media (min-width: 769px) {
    grid-template-columns: 1fr 1.2fr; /* Colunas desiguais para layout interessante */
    gap: 8rem; /* Aumenta gap entre colunas */
    padding: 8rem 2rem;
  }
`;

const LeftPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 1s ease-out forwards;
`;

const RightPanelContent = styled.div`
   display: flex;
  flex-direction: column;
  animation: ${fadeIn} 1s ease-out 0.3s forwards; /* Slight delay for effect */
`;


const SectionTitle = styled.h2`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0 0 2rem 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: ${LIGHT_COLOR}; /* Título claro */

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
    margin-bottom: 1.5rem;
  }
`;

const IntroText = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.6;
  margin: 0 0 3rem 0;
  opacity: 0.9;
  color: ${LIGHT_COLOR}; /* Texto claro */

  @media (max-width: 768px) {
    font-size: clamp(0.95rem, 4vw, 1.1rem);
    margin-bottom: 2.5rem;
  }
`;

const KeyNumbersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center; /* Center numbers on mobile */

  @media (min-width: 769px) {
    justify-content: flex-start; /* Align left on desktop */
    gap: 4rem;
  }
`;

const NumberItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NumberIconWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: ${LIGHT_COLOR}; /* Ícone claro */

  svg {
    width: 100%;
    height: 100%;
    stroke-width: 1;
    fill: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 1px;
    background: ${LIGHT_COLOR}; /* Linha clara */
  }
`;

const NumberValue = styled.span`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 1;
  margin-bottom: 0.25rem;
  color: ${LIGHT_COLOR}; /* Valor claro */
`;

const NumberLabel = styled.span`
  font-family: 'Montserrat', -apple-system, BlinkSansMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.8;
  color: ${LIGHT_COLOR}; /* Label claro */
`;

const DetailedText = styled.div`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  line-height: 1.7;
  opacity: 0.9;
  color: ${LIGHT_COLOR}; /* Texto detalhado claro */

  p {
    margin: 0 0 1.5rem 0;
    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
      font-weight: 600;
  }
`;


// Componente Principal
const AboutSection: React.FC = () => {
    useEffect(() => {
        // Adiciona Google Fonts se não estiver carregada
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        if (!document.querySelector(`link[href="${link.href}"]`)) {
            document.head.appendChild(link);
        }
    }, []);

    // Placeholder numbers - replace with actual data if available
    const keyNumbers = [
        { value: '5+', label: 'Anos' },
        { value: '50k+', label: 'M² Entregues' },
        { value: '100%', label: 'Satisfeitos' },
    ];

    return (
        <AboutSectionContainer id="about">
            <BackgroundSVG
                viewBox="0 0 1920 1080" // Viewbox para cobrir a área
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Linhas Abstratas de Fundo */}
                <AnimatedLine d="M 0 100 L 1920 300" delay={0} />
                <AnimatedLine d="M 0 500 L 1920 700" delay={0.2} />
                <AnimatedLine d="M 0 900 L 1920 1000" delay={0.4} />
                <AnimatedLine d="M 300 0 L 500 1080" delay={0.6} />
                <AnimatedLine d="M 800 0 L 900 1080" delay={0.8} />
                <AnimatedLine d="M 1400 0 L 1600 1080" delay={1.0} />
            </BackgroundSVG>

            <ContentWrapper>
                {/* Conteúdo da Coluna Esquerda (Desktop) / Topo (Mobile) */}
                <LeftPanelContent>
                    <SectionTitle>
                        Quem Somos
                    </SectionTitle>
                    <IntroText>
                        Fundada em Uberlândia, somos referência no Triângulo Mineiro no setor da construção civil, atuando com excelência no regime de empreitada integral.
                    </IntroText>

                    <KeyNumbersContainer>
                        {keyNumbers.map((item, index) => (
                            <NumberItem key={index}>
                                <NumberIconWrapper>
                                    <Loader/>
                                </NumberIconWrapper>
                                <NumberValue>{item.value}</NumberValue>
                                <NumberLabel>{item.label}</NumberLabel>
                            </NumberItem>
                        ))}
                    </KeyNumbersContainer>
                </LeftPanelContent>

                {/* Conteúdo da Coluna Direita (Desktop) / Base (Mobile) */}
                <RightPanelContent>
                    <DetailedText>
                        <p>A HN Engenharia e Construções Ltda. oferece <strong>soluções completas</strong>, desde o projeto até a entrega final, atendendo obras industriais, comerciais e residenciais de alto padrão, sempre com foco na <strong>qualidade, segurança, cumprimento de prazos e inovação</strong>. Seu compromisso é transformar projetos em realidade, priorizando eficiência operacional, sustentabilidade e alto desempenho.</p>
                        <p>Com uma <strong>equipe técnica altamente qualificada</strong> e parcerias estratégicas, a HN Engenharia entrega obras robustas, funcionais e duráveis. Sua atuação abrange serviços como terraplenagem, drenagem, pavimentação, saneamento, loteamentos urbanos e pisos industriais, além de incorporar <strong>tecnologias de ponta</strong> como drones, BIM e ferramentas de gestão integrada.</p>
                        <p>A empresa se destaca pelo <strong>comprometimento, transparência</strong> e busca constante por inovação, mantendo como propósito deixar um legado de desenvolvimento e progresso por onde passa.</p>
                    </DetailedText>
                </RightPanelContent>
            </ContentWrapper>
        </AboutSectionContainer>
    );
};

export default AboutSection;
