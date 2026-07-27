import dynamic from 'next/dynamic';
import LoadingScreen from "@/components/LoadingScreen";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

const ProblemSection = dynamic(() => import("@/components/ProblemSection"), { ssr: false });
const FeatureSteps = dynamic(() => import("@/components/FeatureSteps"), { ssr: false });
const DemoVideo = dynamic(() => import("@/components/DemoVideo"), { ssr: false });
const PersonaCards = dynamic(() => import("@/components/PersonaCards"), { ssr: false });
const PrivacySection = dynamic(() => import("@/components/PrivacySection"), { ssr: false });
const EarlyAccessForm = dynamic(() => import("@/components/EarlyAccessForm"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"));

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
