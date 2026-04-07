import { createContext, useContext, useEffect, useState } from 'react';
import Cursor from './components/ui/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Certifications from './components/Certifications';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Recommendations from './components/Recommendations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import MusicPlayer from './components/ui/MusicPlayer';
import UIBootLoader from './components/ui/UIBootLoader';
import GoldPetals from './components/ui/GoldPetals';

export type Theme = 'dark' | 'light' | 'navy';

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export const ThemeContext = createContext<ThemeCtx>({
  theme: 'navy',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const SECTION_ACCENTS: Record<string, string> = {
  home:            '#22c55e',
  about:           '#14b8a6',
  certifications:  '#8b5cf6',
  skills:          '#f59e0b',
  projects:        '#3b82f6',
  recommendations: '#f43f5e',
  contact:         '#22c55e',
};

export default function App() {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('gc-theme') as Theme) || 'navy';
  });

  const [booting, setBooting]           = useState(false);
  const [pendingTheme, setPendingTheme] = useState<Theme | null>(null);

  const setTheme = (t: Theme) => {
    if (t === theme) return;
    setPendingTheme(t);
    setBooting(true);
  };

  const onBootComplete = () => {
    if (pendingTheme) {
      setThemeState(pendingTheme);
      localStorage.setItem('gc-theme', pendingTheme);
    }
    setBooting(false);
    setPendingTheme(null);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sectionIds = Object.keys(SECTION_ACCENTS);
    document.documentElement.setAttribute('data-section', 'home');
    document.documentElement.style.setProperty('--section-accent', SECTION_ACCENTS['home']);
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const accent = SECTION_ACCENTS[id] ?? SECTION_ACCENTS['home'];
              document.documentElement.setAttribute('data-section', id);
              document.documentElement.style.setProperty('--section-accent', accent);
            }
          });
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <GoldPetals />
      <Background3D />
      <Cursor />
      <Nav />
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Certifications />
        <Skills />
        <Projects />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
      <MusicPlayer />
      {booting && pendingTheme && (
        <UIBootLoader targetTheme={pendingTheme} onComplete={onBootComplete} />
      )}
    </ThemeContext.Provider>
  );
}
