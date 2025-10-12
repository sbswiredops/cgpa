import Header from "./components/Header";
import Hero from "./components/Hero";
import UniversityGrid from "./components/UniversityGrid";
import AdSection from "./components/AdSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <UniversityGrid />
        <AdSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
