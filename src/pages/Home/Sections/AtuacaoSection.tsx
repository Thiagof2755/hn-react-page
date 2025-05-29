import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';


// Fade-in para entrada suave dos elementos
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Animação das linhas de fundo (efeito de desenho)
const drawLine = keyframes`
  0% {
    stroke-dashoffset: 1000;
    opacity: 0;
  }
  30% {
    opacity: 0.08;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.04;
  }
`;

/* ===========================
   🎨 Paleta de Cores Refinada
=========================== */

const BG_COLOR = '#1a1a1a'; // Cinza escuro mais suave
const CARD_BG = '#2a2a2a'; // Cinza escuro para
const CARD_BORDER = '#404040'; // Borda sutil
const CARD_ACCENT = '#ffffff'; // Branco para acentos
const TEXT_COLOR = '#ffffff'; // Texto branco
const TEXT_SECONDARY = '#b0b0b0'; // Texto secundário
const HOVER_ACCENT = '#f0f0f0'; // Cor de hover

/* ===========================
   📦 Styled Components
=========================== */

// Container principal da seção
const AtuacaoSectionContainer = styled.section`
  max-width: 100%;
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, ${BG_COLOR} 0%, #252525 100%);
  color: ${TEXT_COLOR};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  scroll-snap-align: start;
  position: relative;
    maxrgin: 0 ;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    min-height: auto;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

// Título da seção
const SectionTitle = styled.h2`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  margin: 0 0 1rem 0;
  text-align: center;
  animation: ${fadeIn} 1s ease-out forwards;
  color: ${TEXT_COLOR};
  letter-spacing: -0.02em;
  line-height: 1.2;
  position: relative;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${CARD_ACCENT}, transparent);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.6rem, 6vw, 2.2rem);
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.4rem, 7vw, 1.8rem);
  }
`;

// Subtítulo da seção
const SectionSubtitle = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  margin: 0 0 4rem 0;
  text-align: center;
  color: ${TEXT_SECONDARY};
  max-width: 600px;
  line-height: 1.6;
  animation: ${fadeIn} 1s ease-out 0.2s both;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
    font-size: clamp(0.85rem, 3vw, 1rem);
  }

  @media (max-width: 480px) {
    margin-bottom: 2.5rem;
  }
`;

// Grid responsivo de cards
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 350px));
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
  animation: ${fadeIn} 1s ease-out 0.4s both;
  justify-content: center;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    max-width: 600px;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    grid-template-columns: 1fr;
    max-width: 100%;
  }
`;

// Card de serviço
const ServiceCard = styled.div`
  position: relative;
  background: ${CARD_BG};
  border: 1px solid ${CARD_BORDER};
  border-radius: 12px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 320px;
  overflow: hidden;
  cursor: default;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-12px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: ${HOVER_ACCENT};
  }

  // Forma abstrata sutil no fundo do card
  &::before {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    top: -40%;
    left: -20%;
    background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%);
    transform: rotate(-15deg);
    z-index: 1;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1.5;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    min-height: 280px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    min-height: 260px;
    border-radius: 8px;
  }
`;

// Conteúdo principal do card
const CardContent = styled.div`
  position: relative;
  z-index: 2;
  flex-grow: 1;
`;

// Título dentro do card
const CardTitle = styled.h3`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  margin: 0 0 1rem 0;
  color: ${TEXT_COLOR};
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: clamp(1.2rem, 4vw, 1.4rem);
    margin-bottom: 0.75rem;
  }
`;

// Texto descritivo do card
const InitialText = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(0.9rem, 2vw, 1rem);
  line-height: 1.7;
  margin: 0 0 2rem 0;
  color: ${TEXT_SECONDARY};
  opacity: 0.95;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  }

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }
`;

// Container das palavras-chave
const KeywordsContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

// Cada palavra-chave no card
const Keyword = styled.span`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: clamp(0.75rem, 1.8vw, 0.85rem);
  color: ${TEXT_COLOR};
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 0.875rem;
  border-radius: 20px;
  opacity: 0.9;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: ${HOVER_ACCENT};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.75rem;
    font-size: clamp(0.7rem, 2vw, 0.8rem);
  }

  @media (max-width: 480px) {
    padding: 0.35rem 0.6rem;
    border-radius: 15px;
  }
`;

// SVG de fundo com linhas diagonais
const BackgroundSVG = styled.svg`
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  z-index: 1;
  opacity: 0.6;

  @media (max-width: 768px) {
    width: 140%;
    height: 140%;
    top: -20%;
    left: -20%;
  }
`;

// Linha animada no SVG
const AnimatedLine = styled.path<{ delay?: number }>`
  fill: none;
  stroke: ${TEXT_COLOR};
  stroke-width: 0.5;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${drawLine} 3s ease-out forwards;
  animation-delay: ${({ delay = 0 }) => delay}s;
`;

// Dados das especialidades
const specialties = [
  {
    title: 'Industrial',
    initialText: 'Soluções completas para construções e reformas industriais, focando em eficiência operacional e funcionalidade.',
    keywords: ['Fluxo eficiente', 'Layouts otimizados', 'Estruturas robustas'],
  },
  {
    title: 'Comercial',
    initialText: 'Projetos e execuções que valorizam a identidade da sua marca e a experiência do cliente final.',
    keywords: ['Design estratégico', 'Espaços funcionais', 'Acabamentos premium'],
  },
  {
    title: 'Residencial',
    initialText: 'Construção de residências de alto padrão com foco em conforto, segurança e exclusividade.',
    keywords: ['Alto padrão', 'Personalização', 'Detalhes únicos'],
  },
];

const AtuacaoSection: React.FC = () => {
  // Importa a fonte Montserrat quando o componente monta
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    if (!document.head.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }
  }, []);

  return (
    <AtuacaoSectionContainer id="Atuacao">
      {/* SVG de fundo com linhas abstratas */}
      <BackgroundSVG viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        {/* Padrão de linhas mais sutil e organizado */}
        <AnimatedLine d="M 0 300 L 1920 500" delay={0} />
        <AnimatedLine d="M 0 700 L 1920 900" delay={0.3} />
        <AnimatedLine d="M 400 0 L 600 1080" delay={0.6} />
        <AnimatedLine d="M 1000 0 L 1200 1080" delay={0.9} />
        <AnimatedLine d="M 1600 0 L 1800 1080" delay={1.2} />
      </BackgroundSVG>

      {/* Cabeçalho da seção */}
      <SectionTitle>Áreas de Atuação</SectionTitle>
      <SectionSubtitle>
        Excelência técnica e soluções personalizadas para cada segmento
      </SectionSubtitle>

      {/* Cards de especialidades */}
      <CardsGrid>
        {specialties.map((specialty, index) => (
          <ServiceCard key={index}>
            <CardContent>
              <CardTitle>{specialty.title}</CardTitle>
              <InitialText>{specialty.initialText}</InitialText>
            </CardContent>
            <KeywordsContainer>
              {specialty.keywords.map((kw, i) => (
                <Keyword key={i}>{kw}</Keyword>
              ))}
            </KeywordsContainer>
          </ServiceCard>
        ))}
      </CardsGrid>
    </AtuacaoSectionContainer>
  );
};

export default AtuacaoSection;
