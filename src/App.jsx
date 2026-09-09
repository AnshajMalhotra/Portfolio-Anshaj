import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import AboutMe from "./components/AboutMe";
import Contacts from "./components/Contacts";
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <Projects />
        <Experience />
        <AboutMe />
        <Contacts />
      </main>
      <footer className="site-footer shell">
        <a className="wordmark" href="#home">
          AM<span>.</span>
        </a>
        <span>Built with curiosity. Grounded in engineering.</span>
        <a href="https://github.com/AnshajMalhotra">GitHub ↗</a>
      </footer>
    </>
  );
}
