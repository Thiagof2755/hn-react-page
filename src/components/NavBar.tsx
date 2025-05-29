import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animateScroll, Link as ScrollLink, scrollSpy } from 'react-scroll';
import LogoImg from '../assets/images/LogoBasic.png';

// Tipos
interface NavLink {
  name: string;
  to: string;
}

// Estilos com styled-components
const NavContainer = styled.nav`
  max-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    height: 65px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 38px;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;

  a {
    display: block;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 0.95rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    letter-spacing: -0.01em;
    border-radius: 8px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    cursor: pointer;

    &:hover {
      color: #000;
      background: rgba(0, 0, 0, 0.04);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &.active a {
    color: #000;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.06);
  }

  &.active a::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: #000;
    border-radius: 50%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: #333;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: #000;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HamburgerIcon = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 18px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.3s ease-in-out;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: currentColor;
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    top: ${({ isOpen }) => (isOpen ? '8px' : '0px')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(135deg)' : 'rotate(0deg)')};
  }

  span:nth-child(2) {
    top: 8px;
    opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
    left: ${({ isOpen }) => (isOpen ? '-30px' : '0')};
  }

  span:nth-child(3) {
    top: ${({ isOpen }) => (isOpen ? '8px' : '16px')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-135deg)' : 'rotate(0deg)')};
  }
`;

const MobileDrawer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 280px;
  background: #fff;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  overflow-y: auto;

  @media (max-width: 320px) {
    width: 100vw;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const DrawerLogo = styled.img`
  height: 36px;
  width: auto;
  object-fit: contain;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  color: #666;
  transition: all 0.2s ease;
  font-size: 24px;
  line-height: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: #000;
  }
`;

const DrawerNav = styled.nav`
  padding: 1rem 0;
`;

const DrawerList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const DrawerItem = styled.li`
  a {
    display: block;
    padding: 1rem 2rem;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 1.1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.04);
      color: #000;
      border-left-color: #000;
    }

    &:active {
      background: rgba(0, 0, 0, 0.08);
    }
  }

  &.active a {
    color: #000;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.04);
    border-left-color: #000;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 998;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Links de navegação
const LINKS: NavLink[] = [
  { name: 'Início', to: 'hero' },
  { name: 'Sobre', to: 'about' },
  { name: 'Especialidades', to: 'Atuacao' },
  { name: 'Processo', to: 'process' },
  { name: 'Serviços', to: 'services' },
  { name: 'Contato', to: 'contact' },
];

// Componente principal
const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll e seção ativa
  useEffect(() => {
    scrollSpy.update();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Efeito de scroll no navbar
      setScrolled(scrollPosition > 20);

      // Detecta seção ativa
      const sections = LINKS.map(link => document.getElementById(link.to));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (
          section &&
          scrollPosition >= section.offsetTop - 100 &&
          scrollPosition < section.offsetTop + section.offsetHeight - 50
        ) {
          setActiveSection(LINKS[i].to);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez no mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha drawer quando redimensiona para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Previne scroll do body quando drawer está aberto
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  const toggleDrawer = () => {
    setDrawerOpen(prev => !prev);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const scrollToTop = () => {
    animateScroll.scrollToTop({
      duration: 800,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <>
      <NavContainer className={scrolled ? 'scrolled' : ''}>
        <NavContent>
          <LogoContainer onClick={scrollToTop}>
            <Logo src={LogoImg} alt="Logo" />
          </LogoContainer>

          {/* Menu Desktop */}
          <NavList>
            {LINKS.map((link) => (
              <NavItem key={link.to} className={activeSection === link.to ? 'active' : ''}>
                <ScrollLink
                  to={link.to}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  spy={true}
                  aria-label={`Navegar para ${link.name}`}
                >
                  {link.name}
                </ScrollLink>
              </NavItem>
            ))}
          </NavList>

          {/* Botão Mobile */}
          <MobileMenuButton onClick={toggleDrawer} aria-label="Menu">
            <HamburgerIcon isOpen={drawerOpen}>
              <span></span>
              <span></span>
              <span></span>
            </HamburgerIcon>
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      {/* Overlay */}
      <Overlay isOpen={drawerOpen} onClick={closeDrawer} />

      {/* Drawer Mobile */}
      <MobileDrawer isOpen={drawerOpen}>
        <DrawerHeader>
          <DrawerLogo src={LogoImg} alt="Logo" />
          <CloseButton onClick={closeDrawer} aria-label="Fechar menu">
            ×
          </CloseButton>
        </DrawerHeader>
        
        <DrawerNav>
          <DrawerList>
            {LINKS.map((link) => (
              <DrawerItem key={link.to} className={activeSection === link.to ? 'active' : ''}>
                <ScrollLink
                  to={link.to}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  onClick={closeDrawer}
                  aria-label={`Ir para ${link.name}`}
                >
                  {link.name}
                </ScrollLink>
              </DrawerItem>
            ))}
          </DrawerList>
        </DrawerNav>
      </MobileDrawer>
    </>
  );
};

export default NavBar;
