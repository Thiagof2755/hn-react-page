import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa'; // Ícones para contato

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
     opacity: 0.08; /* Opacidade muito baixa durante o desenho */
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.04; /* Opacidade final ainda mais baixa */
  }
`;

// Paleta de cores refinada (usando a paleta elegante do último ajuste)
const BG_COLOR = '#1a1a1a'; // Fundo escuro
const TEXT_COLOR = '#f0f0f0'; // Texto claro
const ACCENT_COLOR = '#b0b0b0'; // Cinza médio para acentos
const INPUT_BG = 'rgba(240, 240, 240, 0.05)'; // Fundo input sutilmente claro
const INPUT_BORDER = 'rgba(240, 240, 240, 0.2)'; // Borda input sutilmente clara
const INPUT_PLACEHOLDER = 'rgba(240, 240, 240, 0.5)'; // Placeholder claro
const BUTTON_SECONDARY_BORDER = '#f0f0f0'; // Borda botão secundário clara
const BUTTON_SECONDARY_TEXT = '#f0f0f0'; // Texto botão secundário claro


// Styled Components
const ContactSectionContainer = styled.section`
  position: relative;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centraliza verticalmente se o conteúdo for menor que a tela */
  overflow: hidden;
  scroll-snap-align: start;
  background: linear-gradient(135deg, ${BG_COLOR} 0%, #252525 100%); /* Gradiente sutil */
  color: ${TEXT_COLOR};
  padding: 6rem 2rem; /* Padding para espaço interno */

  @media (max-width: 768px) {
      padding: 4rem 1.5rem;
      min-height: auto; /* Altura mínima flexível no mobile */
      justify-content: flex-start; /* Alinha ao topo no mobile */
  }

  @media (max-width: 480px) {
      padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  margin: 0 0 1rem 0; /* Ajusta margem inferior */
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: ${TEXT_COLOR}; /* Título claro */
  text-align: center; /* Centraliza título */
  animation: ${fadeIn} 1s ease-out forwards;
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
    background: linear-gradient(90deg, transparent, ${ACCENT_COLOR}, transparent);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.6rem, 6vw, 2.2rem);
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.4rem, 7vw, 1.8rem);
  }
`;

const IntroText = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  line-height: 1.6;
  margin: 0 auto 4rem auto; /* Centraliza e aumenta margem inferior */
  opacity: 0.9;
  max-width: 700px; /* Aumenta a largura máxima */
  color: ${ACCENT_COLOR}; /* Texto secundário */
  text-align: center;
  animation: ${fadeIn} 1s ease-out 0.2s forwards;
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

const ContactContent = styled.div`
  position: relative;
  z-index: 10; /* Conteúdo acima do SVG */
  max-width: 600px; /* Largura máxima para o formulário e contatos */
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem; /* Espaçamento entre blocos de conteúdo */
  animation: ${fadeIn} 1s ease-out 0.4s forwards;
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center; /* Centraliza no mobile */
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1rem;
  line-height: 1.4;
  color: ${TEXT_COLOR}; /* Cor do texto */

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: ${ACCENT_COLOR}; /* Cor do ícone */
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${ACCENT_COLOR}; /* Leve opacidade no hover */
  }

  &:focus {
    outline: 2px solid ${ACCENT_COLOR};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const MessageInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const Input = styled.input`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1rem;
  padding: 1rem;
  background-color: ${INPUT_BG};
  border: 1px solid ${INPUT_BORDER};
  border-radius: 4px;
  color: ${TEXT_COLOR}; /* Texto claro */
  outline: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: ${INPUT_PLACEHOLDER};
  }

  &:focus {
    border-color: ${ACCENT_COLOR}; /* Borda de acento no focus */
    background-color: rgba(240, 240, 240, 0.1);
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.875rem;
  }
`;

const TextArea = styled.textarea`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1rem;
  padding: 1rem;
  background-color: ${INPUT_BG};
  border: 1px solid ${INPUT_BORDER};
  border-radius: 4px;
  color: ${TEXT_COLOR};
  outline: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  min-height: 150px;
  resize: vertical; /* Permite redimensionar apenas verticalmente */

  &::placeholder {
    color: ${INPUT_PLACEHOLDER};
  }

  &:focus {
    border-color: ${ACCENT_COLOR};
    background-color: rgba(240, 240, 240, 0.1);
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.875rem;
    min-height: 120px;
  }
`;

const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: none; /* Fundo transparente */
  color: ${BUTTON_SECONDARY_TEXT}; /* Texto claro */
  padding: 1rem 2.5rem;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 2px solid ${BUTTON_SECONDARY_BORDER}; /* Borda clara */
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  align-self: center; /* Centraliza o botão */
  margin-top: 1rem;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(240, 240, 240, 0.1); /* Fundo sutil no hover */
    border-color: ${ACCENT_COLOR};
    color: ${ACCENT_COLOR};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    background: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    width: 100%; /* Ocupa largura total no mobile */
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
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
  stroke: ${TEXT_COLOR}; /* Linhas escuras sobre fundo claro */
  stroke-width: 0.5; /* Traço extra fino */
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  opacity: 0; /* Começa invisível */
  animation: ${drawLine} 3s ease-out forwards;
  animation-delay: ${({ delay = 0 }) => delay}s;
`;

// Componente Principal
const ContactSection: React.FC = () => {
  // Usamos o estado para capturar os dados dos inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Adiciona Google Fonts se não estiver carregada
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Número de WhatsApp no formato internacional (55 + DDD + Número)
  const whatsappNumber = '5534999103084'; // Substitua pelo número correto se necessário

  // Função para gerar o link do WhatsApp com a mensagem preenchida
  const generateWhatsAppLink = () => {
    const { name, email, message } = formData;
    const text = `Olá HN Engenharia!%0A%0ANome: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMensagem: ${encodeURIComponent(message)}`;
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <ContactSectionContainer id="contact">
       <BackgroundSVG
            viewBox="0 0 1920 1080" // Viewbox para cobrir a área
            preserveAspectRatio="xMidYMid slice"
        >
            {/* Linhas Abstratas de Fundo (ajustadas para fundo claro) */}
            <AnimatedLine d="M 0 200 L 1920 400" delay={0} />
            <AnimatedLine d="M 0 600 L 1920 800" delay={0.3} />
            <AnimatedLine d="M 400 0 L 600 1080" delay={0.6} />
            <AnimatedLine d="M 1200 0 L 1400 1080" delay={0.9} />
        </BackgroundSVG>

      <SectionTitle>
        Vamos Conversar
      </SectionTitle>

      <IntroText>
        Preencha os campos abaixo e clique no botão para nos enviar uma mensagem direta pelo WhatsApp.
      </IntroText>

      <ContactContent>
        {/* Informações de Contato (mantidas como referência) */}
        <ContactInfoContainer>
            <ContactInfoItem>
                <ContactIcon><FaEnvelope /></ContactIcon>
                <ContactLink href="mailto:contato@hnengenharia" aria-label="Enviar email para HN Engenharia">
                    contato@hnengenharia
                </ContactLink>
            </ContactInfoItem>
            <ContactInfoItem>
                <ContactIcon><FaPhone /></ContactIcon>
                 <ContactLink href={`tel:+${whatsappNumber}`} aria-label="Ligar para HN Engenharia">
                    (34) 99910-3084
                </ContactLink>
            </ContactInfoItem>
        </ContactInfoContainer>

        {/* Campos para capturar dados para a mensagem do WhatsApp */}
        <MessageInputsContainer>
          <Input
            type="text"
            name="name"
            placeholder="Seu Nome"
            value={formData.name}
            onChange={handleInputChange}
            aria-label="Campo Nome"
          />
          <Input
            type="email"
            name="email"
            placeholder="Seu Email"
            value={formData.email}
            onChange={handleInputChange}
            aria-label="Campo Email"
          />
          <TextArea
            name="message"
            placeholder="Sua Mensagem"
            value={formData.message}
            onChange={handleInputChange}
            aria-label="Campo Mensagem"
          />
        </MessageInputsContainer>

        {/* Botão WhatsApp que usa os dados dos campos */}
        <WhatsAppButton
            href={generateWhatsAppLink()} // Link gerado dinamicamente
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chamar HN Engenharia no WhatsApp com mensagem"
            // Opcional: Adicionar disabled se campos obrigatórios não estiverem preenchidos
            // disabled={!formData.name || !formData.email || !formData.message}
        >
            <FaWhatsapp /> Enviar Mensagem via WhatsApp
        </WhatsAppButton>

      </ContactContent>
    </ContactSectionContainer>
  );
};

export default ContactSection;
