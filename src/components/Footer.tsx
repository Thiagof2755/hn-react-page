import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

// Styled Components
const FooterContainer = styled.footer`
  max-width: 100%;
  background-color: #1a1a1a;
  color: #fff;
  padding: 4rem 0 2rem; // Alterado para padding vertical apenas
  width: 100%;
  margin-top: auto;
  overflow: hidden; // Garante que não haja scroll horizontal
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: start;
  padding: 0 2rem; // Padding lateral movido para cá

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
    padding: 0 1.5rem; // Ajuste para mobile
  }
`;


const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CompanyName = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

const ContactInfo = styled.address`
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  line-height: 1.4;
  color: #e5e5e5;

  @media (max-width: 768px) {
    justify-content: center;
    font-size: 1rem;
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #fff;
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
    color: #fff;
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.5rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const SocialTitle = styled.h4`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
  width: 100%;


  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: scale(1.1) translateY(-2px);
    opacity: 0.8;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  &:active {
    transform: scale(1.05) translateY(-1px);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  margin: 2rem 0 1.5rem;
`;

const Copyright = styled.div`
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.85rem;
  color: #999;
  line-height: 1.4;
  letter-spacing: -0.005em;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Componente Principal
const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <FooterContainer>
            <FooterContent>
                {/* Seção de Contato */}
                <ContactSection>
                    <CompanyName>HN Engenharia e Construções</CompanyName>

                    <ContactInfo>
                        <ContactItem>
                            <ContactIcon>
                                <FaMapMarkerAlt />
                            </ContactIcon>
                            <span>Uberlândia, Minas Gerais</span>
                        </ContactItem>

                        <ContactItem>
                            <ContactIcon>
                                <FaEnvelope />
                            </ContactIcon>
                            <ContactLink
                                href="mailto:contato@hnengenharia"
                                aria-label="Enviar email para HN Engenharia"
                            >
                                contato@hnengenharia
                            </ContactLink>
                        </ContactItem>

                        <ContactItem>
                            <ContactIcon>
                                <FaPhone />
                            </ContactIcon>
                            <ContactLink
                                href="tel:+5534999103084"
                                aria-label="Ligar para HN Engenharia"
                            >
                                (34) 99910-3084
                            </ContactLink>
                        </ContactItem>
                    </ContactInfo>
                </ContactSection>

                {/* Seção de Redes Sociais */}
                <SocialSection>
                    <SocialTitle>Siga-nos</SocialTitle>

                    <SocialLinks>
                        <SocialLink
                            href="https://instagram.com/hnengenharia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram da HN Engenharia"
                        >
                            <FaInstagram />
                        </SocialLink>

                        <SocialLink
                            href="https://linkedin.com/company/hnengenharia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn da HN Engenharia"
                        >
                            <FaLinkedin />
                        </SocialLink>
                    </SocialLinks>
                </SocialSection>
            </FooterContent>

            <Divider />

            <Copyright>
                © {currentYear} HN Engenharia e Construções Ltda. Todos os direitos reservados.
            </Copyright>
        </FooterContainer>
    );
};

export default Footer;
