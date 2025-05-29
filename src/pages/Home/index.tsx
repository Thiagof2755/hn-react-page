
import HeroSection from './Sections/HeroSection.tsx';
import AboutSection from './Sections/AboutSection.tsx';
import AtuacaoSection from './Sections/AtuacaoSection.tsx';
import ProcessSection from './Sections/ProcessSection.tsx';
import ContactSection from './Sections/ContactSection.tsx';
import ServicesSection from './Sections/ServicesSection.tsx';


export default function Home() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <AtuacaoSection />
            <ProcessSection />
            <ServicesSection />
            <ContactSection />
        </>
    );
}
