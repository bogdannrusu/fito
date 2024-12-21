import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CoffeeOrigins } from "@/components/CoffeeOrigins";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Menu />
        <CoffeeOrigins />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;