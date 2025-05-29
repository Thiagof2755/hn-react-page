import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animações
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
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
const ProcessSectionContainer = styled.section`
  position: relative;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

const SectionTitle = styled.h2<{ isVisible: boolean }>`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 4.5vw, 2.8rem); /* Reduzido */
  margin: 0 0 1rem 0; /* Ajusta margem inferior */
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: ${LIGHT_COLOR}; /* Título escuro */
  text-align: center; /* Centraliza título */
  opacity: 0; /* Inicialmente invisível */
  transform: translateY(30px); /* Posição inicial para animação */
  ${({ isVisible }) => isVisible && css`
    animation: ${fadeIn} 1s ease-out forwards;
  `}

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${LIGHT_COLOR}, transparent);
  }


  @media (max-width: 768px) {
    font-size: clamp(1.6rem, 6vw, 2.2rem); /* Reduzido */
    margin-bottom: 0.75rem;
  }
  @media (max-width: 480px) {
    font-size: clamp(1.4rem, 7vw, 1.8rem); /* Reduzido */
    margin-bottom: 0.5rem;
  }
`;

const ProcessDescription = styled.p<{ isVisible: boolean }>`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(0.9rem, 2vw, 1rem); /* Reduzido */
  line-height: 1.6;
  margin: 0 auto 4rem auto; /* Centraliza e adiciona margem */
  opacity: 0; /* Inicialmente invisível */
  transform: translateY(30px); /* Posição inicial para animação */
  max-width: 800px; /* Limita largura para legibilidade */
  text-align: center;
  color: ${LIGHT_COLOR}; /* Texto escuro */
   ${({ isVisible }) => isVisible && css`
    animation: ${fadeIn} 1s ease-out 0.3s forwards;
  `}

  @media (max-width: 768px) {
    font-size: clamp(0.85rem, 3vw, 0.95rem); /* Reduzido */
    margin-bottom: 3rem;
  }
  @media (max-width: 480px) {
    margin-bottom: 2.5rem;
  }
`;

const ProcessStepsContainer = styled.div`
  position: relative;
  z-index: 10; /* Garante que o conteúdo fique acima do SVG */
  max-width: 900px; /* Limita a largura dos passos */
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem; /* Reduzido o espaçamento entre os passos */
`;

const ProcessStep = styled.div<{ isVisible: boolean; delay: number }>`
  display: flex;
  align-items: start; /* Alinha itens ao topo */
  gap: 1.5rem; /* Reduzido o espaçamento entre número/ícone e texto */
  opacity: 0; /* Inicialmente invisível */
  transform: translateY(30px); /* Posição inicial para animação */

  ${({ isVisible, delay }) => isVisible && css`
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: ${delay}s;
  `}


  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.2rem; /* Reduzido */
  }
`;

const StepNumber = styled.div`
  flex-shrink: 0; /* Não permite que o número diminua */
  width: 45px; /* Reduzido */
  height: 45px; /* Reduzido */
  border: 2px solid ${LIGHT_COLOR}; /* Borda escura */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 1.3rem; /* Reduzido */
  color: ${LIGHT_COLOR}; /* Número escuro */
  background-color: rgba(255, 255, 255, 0.5); /* Fundo sutil no número */

  @media (max-width: 768px) {
    width: 38px; /* Reduzido */
    height: 38px; /* Reduzido */
    font-size: 1.1rem; /* Reduzido */
  }
`;

const StepContent = styled.div`
  flex-grow: 1; /* Permite que o conteúdo cresça */
`;

const StepTitle = styled.h3`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: clamp(1rem, 1.8vw, 1.2rem); /* Reduzido */
  margin: 0 0 0.4rem 0; /* Reduzido margem */
  color: ${LIGHT_COLOR}; /* Título do passo escuro */

  @media (max-width: 768px) {
    font-size: clamp(0.95rem, 2.5vw, 1.1rem); /* Reduzido */
  }
`;

const StepDescription = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(0.85rem, 1.6vw, 0.95rem); /* Reduzido */
  line-height: 1.6;
  opacity: 0.9;
  color: ${LIGHT_COLOR}; /* Descrição do passo escuro */

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 2.2vw, 0.9rem); /* Reduzido */
  }
`;


const BackgroundSVG = styled.svg<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const AnimatedLine = styled.path<{ isVisible: boolean; delay?: number }>`
  fill: none;
  stroke: ${LIGHT_COLOR}; /* Linhas escuras sobre fundo claro */
  stroke-width: 0.5; /* Traço extra fino */
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  opacity: 0; /* Começa invisível */

  ${({ isVisible, delay = 0 }) => isVisible && css`
    animation: ${drawLine} 3s ease-out forwards;
    animation-delay: ${delay}s;
  `}
`;


// Dados dos Processos
const processSteps = [
    {
        number: 1,
        title: 'Análise & Viabilidade',
        description: 'Levantamento de requisitos, estudo do terreno, avaliação técnica, legal, operacional e financeira. Aqui, entendemos o contexto, os desafios e definimos as diretrizes do projeto.',
    },
    {
        number: 2,
        title: 'Planejamento Estratégico',
        description: 'Desenvolvemos soluções de engenharia personalizadas, definindo arquitetura, estruturas, instalações, eficiência energética, sustentabilidade e cronograma técnico.',
    },
    {
        number: 3,
        title: 'Projeto Executivo Integrado',
        description: 'Transformamos as soluções em projetos executivos detalhados, utilizando modelagem BIM, garantindo precisão, compatibilização entre disciplinas e máxima eficiência construtiva.',
    },
    {
        number: 4,
        title: 'Execução & Gestão Completa',
        description: 'Assumimos toda a gestão da obra: desde terraplenagem, fundações, estruturas, instalações até acabamentos. Gerenciamos prazos, custos, qualidade e segurança até a entrega final, pronta para operar.',
    },
];


// Componente Principal
const ProcessSection: React.FC = () => {
    const sectionRef = useRef(null); // Cria uma referência para a seção
    const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade

    useEffect(() => {
        // Adiciona Google Fonts se não estiver carregada
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        if (!document.querySelector(`link[href="${link.href}"]`)) {
            document.head.appendChild(link);
        }

        // Lógica do Intersection Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Quando a seção entrar na viewport (pelo menos 10% visível)
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Podemos parar de observar depois que ela se torna visível
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Define que a animação dispara quando 10% do elemento está visível
                rootMargin: '0px', // Sem margem extra na viewport
            }
        );

        // Começa a observar a seção se a referência existir
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Limpeza: desconecta o observer quando o componente desmonta
        return () => {
            if (sectionRef.current) {
                 // Verifica se o elemento ainda está sendo observado antes de desconectar
                 // Isso evita um erro se o unobserve já foi chamado dentro do callback
                 try {
                    observer.unobserve(sectionRef.current);
                 } catch (e) {
                     // Ignora erro se já não estiver observando
                 }
            }
            observer.disconnect();
        };

    }, []); // Array de dependências vazio significa que este efeito roda apenas uma vez no mount/unmount

    return (
        <ProcessSectionContainer id="process" ref={sectionRef}> {/* Associa a referência à section */}

            {/* Passa o estado isVisible para os componentes que precisam animar */}
            <BackgroundSVG
                viewBox="0 0 1920 1080" // Viewbox para cobrir a área
                preserveAspectRatio="xMidYMid slice"
                isVisible={isVisible} // Passa isVisible
            >
                {/* Linhas Abstratas de Fundo (animação condicional) */}
                <AnimatedLine d="M 0 100 L 1920 300" delay={0} isVisible={isVisible} />
                <AnimatedLine d="M 0 500 L 1920 700" delay={0.2} isVisible={isVisible} />
                <AnimatedLine d="M 0 900 L 1920 1000" delay={0.4} isVisible={isVisible} />
                <AnimatedLine d="M 300 0 L 500 1080" delay={0.6} isVisible={isVisible} />
                <AnimatedLine d="M 800 0 L 900 1080" delay={0.8} isVisible={isVisible} />
                <AnimatedLine d="M 1400 0 L 1600 1080" delay={1.0} isVisible={isVisible} />
            </BackgroundSVG>

            {/* Título e Descrição (animação condicional) */}
            <SectionTitle isVisible={isVisible}>
                Nosso Processo
            </SectionTitle>

            <ProcessDescription isVisible={isVisible}>
                Na HN Engenharia, conduzimos cada projeto de forma completa, estruturada e inteligente. Nossa metodologia integra todas as etapas — do estudo inicial à entrega da obra — com foco absoluto em eficiência, qualidade e segurança.
            </ProcessDescription>

            <ProcessStepsContainer>
                {processSteps.map((step, index) => (
                    <ProcessStep
                        key={step.number}
                        isVisible={isVisible} // Passa isVisible
                        delay={0.5 + index * 0.15} // Ajusta delay para animação sequencial mais rápida
                    >
                        <StepNumber>{step.number}</StepNumber>
                        <StepContent>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </StepContent>
                    </ProcessStep>
                ))}
            </ProcessStepsContainer>
        </ProcessSectionContainer>
    );
};

export default ProcessSection;
