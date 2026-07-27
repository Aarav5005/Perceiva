import LoadingScreen from "@/components/LoadingScreen";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import FeatureSteps from "@/components/FeatureSteps";
import DemoVideo from "@/components/DemoVideo";
import PersonaCards from "@/components/PersonaCards";
import PrivacySection from "@/components/PrivacySection";
import EarlyAccessForm from "@/components/EarlyAccessForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
      <LoadingScreen />
      <Nav />
      <Hero />
      <ProblemSection />
      <FeatureSteps />
      <DemoVideo />
      <PersonaCards />
      <PrivacySection />
      <EarlyAccessForm />
      <Footer />
    </main>
  );
}
