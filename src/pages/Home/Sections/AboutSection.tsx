import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
// import { FaRegCircle } from 'react-icons/fa'; // Removido FaRegCircle, usando Loader agora
import Loader from '../../../components/Loader.tsx'; // Mantido Loader

// Animações
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); } /* Ajusta translateY */
  to { opacity: 1; transform: translateY(0); }
`;

const drawLine = keyframes`
  0% {
    stroke-dashoffset: 1000;
    opacity: 0;
  }
  30% {
     opacity: 0.1; /* Opacidade sutil durante o desenho */
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.05; /* Opacidade final mais baixa */
  }
`;

// Paleta de cores (usando seus valores)
const LIGHT_COLOR = '#121212'; // Cinza muito escuro
const DARK_COLOR = '#f0f0f0'; // Cinza muito claro


// Styled Components
const AboutSectionContainer = styled.section`
  position: relative;
  width: 100vw; /* Garante 100% da largura da viewport */
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  scroll-snap-align: start;
  background-color: ${DARK_COLOR}; /* Fundo claro para esta seção */
  color: ${LIGHT_COLOR}; /* Cor do texto padrão para o fundo claro */
  padding: 6rem 2rem; /* Padding para espaço interno */

  @media (max-width: 768px) {
      padding: 4rem 1.5rem;
      min-height: auto; /* Altura mínima automática no mobile */
  }
   @media (max-width: 480px) {
      padding: 3rem 1rem;
  }
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
  stroke: ${LIGHT_COLOR}; /* Linhas escuras sobre fundo claro */
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
  padding: 0; /* Padding controlado pelo container */
  display: grid;
  grid-template-columns: 1fr; /* Default to single column */
  gap: 4rem; /* Espaçamento entre as seções no mobile */
  align-items: start; /* Alinha ao topo */
  width: 100%; /* Garante que o wrapper ocupe a largura total disponível */


  @media (min-width: 769px) {
    grid-template-columns: 1fr 1.2fr; /* Colunas desiguais para layout interessante */
    gap: 8rem; /* Aumenta gap entre colunas no desktop */
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
  font-size: clamp(1.8rem, 4.5vw, 2.8rem); /* Reduzido */
  margin: 0 0 1rem 0; /* Ajusta margem inferior */
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: ${LIGHT_COLOR}; /* Título escuro */
  text-align: left; /* Alinha título à esquerda no desktop */

  @media (max-width: 768px) {
    font-size: clamp(1.6rem, 6vw, 2.2rem); /* Reduzido */
    margin-bottom: 0.75rem;
    text-align: center; /* Centraliza título no mobile */
  }
  @media (max-width: 480px) {
    font-size: clamp(1.4rem, 7vw, 1.8rem); /* Reduzido */
    margin-bottom: 0.5rem;
  }
`;


const IntroText = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(0.9rem, 2vw, 1rem); /* Reduzido */
  line-height: 1.6;
  margin: 0 0 3rem 0;
  opacity: 0.9;
  color: ${LIGHT_COLOR}; /* Texto escuro */
  text-align: left; /* Alinha texto à esquerda no desktop */

  @media (max-width: 768px) {
    font-size: clamp(0.85rem, 3vw, 0.95rem); /* Reduzido */
    margin-bottom: 2.5rem;
    text-align: center; /* Centraliza texto no mobile */
  }
   @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
`;


const KeyNumbersContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem linha */
  gap: 3rem; /* Espaçamento entre os itens */
  justify-content: flex-start; /* Alinha à esquerda no desktop */


  @media (max-width: 768px) {
    gap: 2rem; /* Reduz espaçamento no mobile */
    justify-content: center; /* Centraliza os itens no mobile */
  }
   @media (max-width: 480px) {
    gap: 1.5rem; /* Reduz mais no mobile menor */
    flex-direction: column; /* Empilha verticalmente no mobile menor */
    align-items: center; /* Centraliza itens empilhados */
  }
`;


const NumberItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* Adiciona flex-basis para controlar o tamanho base dos itens no wrap */
  flex-basis: 120px; /* Tamanho base para 3 colunas no desktop/tablet */

   @media (max-width: 480px) {
    flex-basis: auto; /* Remove tamanho base ao empilhar */
    width: 100%; /* Ocupa largura total ao empilhar */
    align-items: center; /* Centraliza conteúdo ao empilhar */
  }
`;


const NumberIconWrapper = styled.div`
  position: relative;
  width: 50px; /* Reduzido */
  height: 50px; /* Reduzido */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: ${LIGHT_COLOR}; /* Cor do ícone */


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
    width: 30px; /* Reduzido */
    height: 1px;
    background: ${LIGHT_COLOR}; /* Linha escura */
  }

   @media (max-width: 480px) {
    width: 40px; /* Reduzido */
    height: 40px; /* Reduzido */
     &::after {
        width: 25px; /* Reduzido */
     }
  }
`;


const NumberValue = styled.span`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 2rem; /* Reduzido */
  line-height: 1;
  margin-bottom: 0.25rem;
  color: ${LIGHT_COLOR}; /* Cor do valor */

   @media (max-width: 480px) {
    font-size: 1.8rem; /* Reduzido */
  }
`;


const NumberLabel = styled.span`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: 0.8rem; /* Reduzido */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.8;
  color: ${LIGHT_COLOR}; /* Cor do label */

   @media (max-width: 480px) {
    font-size: 0.75rem; /* Reduzido */
  }
`;


const DetailedText = styled.div`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(0.9rem, 1.8vw, 1rem); /* Reduzido */
  line-height: 1.7;
  opacity: 0.9;
  color: ${LIGHT_COLOR}; /* Texto detalhado escuro */


  p {
    margin: 0 0 1.2rem 0; /* Reduzido margem entre parágrafos */
    &:last-child {
      margin-bottom: 0;
    }
  }


  strong {
      font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: clamp(0.85rem, 2.5vw, 0.95rem); /* Reduzido */
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
                  {/* Loader é um componente externo que você está usando */}
                  <Loader />
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
