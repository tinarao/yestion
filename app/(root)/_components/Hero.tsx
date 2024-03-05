"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import HeroDocs from "@/public/hero/home-hero.webp"

const Hero = () => {
  return (
    <section className="w-full space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Пишите. Планируйте. Делитесь.<br /><span>А мы вам поможем</span>
      </h1>
      <h3 className="text-md sm:text-xl md:text-2xl font-medium">
        <span className="underline">Yestion</span> - почти как Notion, правда,
        не совсем
      </h3>
      <div className="flex flex-col md:flex-row gap-4 lg:gap-8 text-lg w-fit mx-auto">
        <Button>
          Приступить к работе
          <ArrowRight className="h-4 ml-2" />
        </Button>
      </div>
      <div className="w-fit mx-auto">
        <Image src={HeroDocs} height={300} width={600} alt="Drawings" />
      </div>
    </section>
  );
};

export default Hero;
