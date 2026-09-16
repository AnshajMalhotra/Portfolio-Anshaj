import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Projects, { AdditionalProjects } from "./components/Projects";
import Experience from "./components/Experience";
import AboutMe from "./components/AboutMe";
import Contacts from "./components/Contacts";
import ConnectivityBackdrop from "./components/ConnectivityBackdrop";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <ConnectivityBackdrop />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <Projects />
        <Experience />
        <AdditionalProjects />
        <AboutMe />
        <Contacts />
      </main>
      <footer className="site-footer shell">
        <a className="brand" href="#home">
          AM<span>✳</span>
        </a>
        <span>© {new Date().getFullYear()} Anshaj Malhotra</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}
