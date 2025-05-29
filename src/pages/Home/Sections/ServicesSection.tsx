import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import {
    FaRegBuilding,
    FaIndustry,
    FaHome,
    FaTimes,
    FaCog,
    FaClock,
    FaUsers,
    FaLaptopCode,
    FaClipboardCheck,
    FaSeedling,
    FaShieldAlt,
    FaChartLine,
    FaTools,
    FaEye
} from 'react-icons/fa';

// Animações elegantes e sutis
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const modalSlideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeInOverlay = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const drawLine = keyframes`
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.1;
  }
`;

// Paleta P&B elegante
const SECTION_BG_COLOR = '#1a1a1a'; // Preto suave
const CARD_BG = '#202020'; // Cinza escuro
const CARD_BORDER = '#495057'; // Cinza médio escuro para bordas
const CARD_HOVER_BORDER = '#f8f9fa'; // Cinza muito claro para hover
const CARD_TEXT = '#f8f9fa'; // Cinza muito claro
const BUTTON_BG = '#f8f9fa'; // Cinza muito claro
const BUTTON_TEXT = '#1a1a1a'; // Preto suave
const MODAL_BG = '#202020'; // Cinza escuro
const MODAL_BORDER = '#495057'; // Cinza médio escuro
const MODAL_TEXT = '#f8f9fa'; // Cinza muito claro
const OVERLAY_COLOR = 'rgba(255, 255, 255, 0.75)'; // Overlay claro
const ACCENT_COLOR = '#adb5bd'; // Cinza claro para acentos

// Dados com ícones específicos para diferenciais
const servicesData = [
    {
        id: "construcao-civil",
        icon: "building",
        titulo: "Construção Civil",
        shortText: "Execução de obras industriais, comerciais e residenciais de alto padrão.",
        descricao: "Execução completa de obras industriais, centros logísticos, edifícios comerciais e residências de alto padrão. Nossa abordagem integra planejamento estratégico, gestão eficiente e controle rigoroso de qualidade para entregar projetos que superam expectativas.",
        diferenciais: [
            { icon: "cog", text: "Projetos sob medida para cada cliente" },
            { icon: "clock", text: "Cumprimento rigoroso de prazos e orçamento" },
            { icon: "users", text: "Equipe técnica altamente especializada" },
            { icon: "laptop", text: "Tecnologias modernas (BIM, drones)" },
            { icon: "check", text: "Gestão completa do projeto à entrega" }
        ]
    },
    {
        id: "infraestrutura",
        icon: "industry",
        titulo: "Infraestrutura e Terraplenagem",
        shortText: "Serviços especializados de terraplenagem, pavimentação e drenagem.",
        descricao: "Serviços especializados em terraplenagem, pavimentação asfáltica, sistemas de drenagem e preparação de solo. Utilizamos equipamentos de precisão e técnicas avançadas para garantir fundações sólidas e duradouras.",
        diferenciais: [
            { icon: "tools", text: "Preparação de solo precisa e eficiente" },
            { icon: "chart", text: "Soluções completas para infraestrutura" },
            { icon: "cog", text: "Equipamentos modernos e equipe experiente" },
            { icon: "seedling", text: "Sustentabilidade e baixo impacto ambiental" }
        ]
    },
    {
        id: "saneamento",
        icon: "home",
        titulo: "Saneamento e Urbanização",
        shortText: "Implantação de redes de água, esgoto e infraestrutura urbana completa.",
        descricao: "Desenvolvimento de sistemas de saneamento básico, implantação de redes de água e esgoto, drenagem urbana e infraestrutura completa para loteamentos. Projetos que promovem desenvolvimento sustentável das comunidades.",
        diferenciais: [
            { icon: "check", text: "Projetos de urbanização integrados" },
            { icon: "seedling", text: "Sistemas sustentáveis e eficientes" },
            { icon: "shield", text: "Conformidade com normas técnicas" },
            { icon: "users", text: "Foco na qualidade de vida das comunidades" }
        ]
    },
    {
        id: "pisos-e-empreitada",
        icon: "building",
        titulo: "Pisos Industriais e Gestão de Obras",
        shortText: "Pisos de alta resistência e gestão completa através de empreitada integral.",
        descricao: "Execução de pisos industriais de alta performance e gestão total de obras através do regime de empreitada integral. Oferecemos responsabilidade única e otimização de recursos em cada etapa do projeto.",
        diferenciais: [
            { icon: "shield", text: "Pisos industriais de alta durabilidade" },
            { icon: "chart", text: "Gestão otimizada de recursos" },
            { icon: "users", text: "Responsabilidade única e centralizada" },
            { icon: "eye", text: "Transparência total no processo" }
        ]
    },
];

// Helper para ícones
const getIconComponent = (iconName: string) => {
    switch (iconName) {
        case 'building': return <FaRegBuilding />;
        case 'industry': return <FaIndustry />;
        case 'home': return <FaHome />;
        default: return <FaRegBuilding />;
    }
};

const getDifferentialIcon = (iconName: string) => {
    switch (iconName) {
        case 'cog': return <FaCog />;
        case 'clock': return <FaClock />;
        case 'users': return <FaUsers />;
        case 'laptop': return <FaLaptopCode />;
        case 'check': return <FaClipboardCheck />;
        case 'tools': return <FaTools />;
        case 'chart': return <FaChartLine />;
        case 'seedling': return <FaSeedling />;
        case 'shield': return <FaShieldAlt />;
        case 'eye': return <FaEye />;
        default: return <FaClipboardCheck />;
    }
};

// Global style
const GlobalStyle = createGlobalStyle<{ $modalOpen: boolean }>`
  body {
    overflow: ${({ $modalOpen }) => ($modalOpen ? 'hidden' : 'unset')};
  }
`;

// Background SVG minimalista
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
  stroke: ${ACCENT_COLOR};
  stroke-width: 0.5;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: ${drawLine} 3s ease-out forwards;
  animation-delay: ${({ delay = 0 }) => delay}s;
`;

const ServicesSectionContainer = styled.section`
  position: relative;
  max-width: 100%
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  scroll-snap-align: start;
  background-color: ${SECTION_BG_COLOR};
  padding: 6rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    justify-content: flex-start;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0 0 1rem 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: ${CARD_TEXT};
  text-align: center;
  animation: ${fadeIn} 1s ease-out forwards;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
  }
`;

const SectionSubtitle = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  margin: 0 0 4rem 0;
  color: ${ACCENT_COLOR};
  text-align: center;
  max-width: 600px;
  animation: ${fadeIn} 1s ease-out 0.2s both;
  position: relative;
  z-index: 10;
`;

const CardsGrid = styled.div`
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    animation: ${fadeIn} 1s ease-out 0.4s both;
    justify-content: center;

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 1.2rem;
    }
`;

const ServiceCard = styled.div`
  background-color: ${CARD_BG};
  border: 1px solid ${CARD_BORDER};
  border-radius: 8px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  min-height: 350px;
  justify-content: space-between;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: ${CARD_HOVER_BORDER};
  }
`;

const CardIconWrapper = styled.div`
  color: ${CARD_TEXT};
  margin-bottom: 1.5rem;
  
  svg {
    width: 48px;
    height: 48px;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  color: ${CARD_TEXT};
`;

const CardShortText = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  color: ${ACCENT_COLOR};
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const DiscoverButton = styled.button`
  background: ${BUTTON_BG};
  color: ${BUTTON_TEXT};
  padding: 0.875rem 1.75rem;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid ${BUTTON_BG};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: ${BUTTON_BG};
    border-color: ${BUTTON_BG};
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Modal Components - Corrigido para centralização perfeita
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${OVERLAY_COLOR};
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  animation: ${fadeInOverlay} 0.3s ease-out forwards;
  overflow: auto;
`;

const ModalContent = styled.div<{ $isOpen: boolean }>`
  background: ${MODAL_BG};
  border: 1px solid ${MODAL_BORDER};
  border-radius: 12px;
  padding: 3rem;
  max-width: 700px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: ${modalSlideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  margin: auto;

  @media (max-width: 768px) {
    padding: 2rem;
    width: 95%;
    max-height: 90vh;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${CARD_BORDER};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${ACCENT_COLOR};
    border-radius: 3px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${CARD_BORDER};
`;

const ModalIconWrapper = styled.div`
  color: ${MODAL_TEXT};
  margin-right: 1rem;
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const ModalTitle = styled.h3`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin: 0;
  color: ${MODAL_TEXT};
  flex: 1;
`;

const ModalDescription = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.7;
  margin: 0 0 2.5rem 0;
  color: ${MODAL_TEXT};
`;

const ModalDifferentialsTitle = styled.h4`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 0 1.5rem 0;
  color: ${MODAL_TEXT};
`;

// Layout simplificado para diferenciais
const ModalDifferentialsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ModalDifferentialItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const DifferentialIcon = styled.div`
  color: ${ACCENT_COLOR};
  flex-shrink: 0;
  margin-top: 0.2rem;
  
  svg {
    width: 16px;
    height: 16px;
    opacity: 0.8;
  }
`;

const DifferentialText = styled.span`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: 0.95rem;
  color: ${MODAL_TEXT};
  line-height: 1.5;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${ACCENT_COLOR};
  transition: all 0.3s ease;
  border-radius: 4px;

  &:hover {
    background: ${SECTION_BG_COLOR};
    color: ${MODAL_TEXT};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// Componente Principal
const ServicesSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);

    useEffect(() => {
        const montserratLink = document.createElement('link');
        montserratLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
        montserratLink.rel = 'stylesheet';
        if (!document.head.querySelector(`link[href="${montserratLink.href}"]`)) {
            document.head.appendChild(montserratLink);
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const handleOpenModal = (serviceId: string) => {
        const service = servicesData.find(s => s.id === serviceId);
        if (service) {
            setSelectedService(service);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedService(null), 300);
    };

    return (
        <>
            <GlobalStyle $modalOpen={isModalOpen} />
            <ServicesSectionContainer id="services">
                <BackgroundSVG viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                    <AnimatedLine d="M 0 200 L 1200 200" delay={0} />
                    <AnimatedLine d="M 0 400 L 1200 400" delay={0.5} />
                    <AnimatedLine d="M 0 600 L 1200 600" delay={1} />
                    <AnimatedLine d="M 300 0 L 300 800" delay={1.5} />
                    <AnimatedLine d="M 900 0 L 900 800" delay={2} />
                </BackgroundSVG>

                <SectionTitle>Nossos Serviços</SectionTitle>
                <SectionSubtitle>
                    Soluções completas em engenharia com excelência técnica e compromisso
                </SectionSubtitle>

                <CardsGrid>
                    {servicesData.map((service) => (
                        <ServiceCard key={service.id}>
                            <div>
                                <CardIconWrapper>
                                    {getIconComponent(service.icon)}
                                </CardIconWrapper>
                                <CardTitle>{service.titulo}</CardTitle>
                                <CardShortText>{service.shortText}</CardShortText>
                            </div>
                            <DiscoverButton onClick={() => handleOpenModal(service.id)}>
                                Saiba Mais
                            </DiscoverButton>
                        </ServiceCard>
                    ))}
                </CardsGrid>
            </ServicesSectionContainer>

            {/* Modal */}
            {isModalOpen && (
                <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}>
                    <ModalContent $isOpen={isModalOpen} onClick={(e) => e.stopPropagation()}>
                        <ModalCloseButton onClick={handleCloseModal} aria-label="Fechar modal">
                            <FaTimes />
                        </ModalCloseButton>

                        {selectedService && (
                            <>
                                <ModalHeader>
                                    <ModalIconWrapper>
                                        {getIconComponent(selectedService.icon)}
                                    </ModalIconWrapper>
                                    <ModalTitle>{selectedService.titulo}</ModalTitle>
                                </ModalHeader>

                                <ModalDescription>{selectedService.descricao}</ModalDescription>

                                <ModalDifferentialsTitle>Nossos Diferenciais</ModalDifferentialsTitle>

                                <ModalDifferentialsList>
                                    {selectedService.diferenciais.map((differential, index) => (
                                        <ModalDifferentialItem key={index}>
                                            <DifferentialIcon>
                                                {getDifferentialIcon(differential.icon)}
                                            </DifferentialIcon>
                                            <DifferentialText>{differential.text}</DifferentialText>
                                        </ModalDifferentialItem>
                                    ))}
                                </ModalDifferentialsList>
                            </>
                        )}
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
};

export default ServicesSection;