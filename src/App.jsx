import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CustomCursor from "./components/CustomCursor";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contacts from "./components/Contacts";
import SidebarNav from "./components/SidebarNav";

export default function App() {
  return (
    <>
      <SidebarNav />
      <Header />
      <HeroSection />
      <AboutMe />
      <Projects />
      <Experience />
      <CustomCursor />
      <Contacts />
      
    </>
   
  )
}