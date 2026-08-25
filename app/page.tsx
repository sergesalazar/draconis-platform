import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TalentTeaser from "@/components/sections/TalentTeaser";
import UpdatesSection from "@/components/sections/UpdatesSection";
import AboutTeaser from "@/components/sections/AboutTeaser";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TalentTeaser />
        <UpdatesSection />
        <AboutTeaser />
      </main>
      <Footer />
    </>
  );
}
