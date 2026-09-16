import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { AppShowcase } from "@/components/sections/app-showcase";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <AppShowcase />
      <Contact />
    </>
  );
}
