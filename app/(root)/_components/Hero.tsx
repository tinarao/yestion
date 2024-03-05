"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import HeroDocsDark from "@/public/hero/home-hero-dark.png";
import HeroDocs from "@/public/hero/home-hero.webp";
import { useConvexAuth } from "convex/react";
import Loader from "@/components/Loader";
import { useTheme } from "next-themes";
import Link from "next/link";

const Hero = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { theme, setTheme } = useTheme();

  return (
    <section className="w-full space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Пишите. Планируйте. Делитесь.
        <br />
        <span>А мы вам поможем</span>
      </h1>
      <h3 className="text-md sm:text-xl md:text-2xl font-medium">
        <span className="underline">Yestion</span> - почти как Notion, правда,
        не совсем
      </h3>
      <div className="flex flex-col w-fit mx-auto py-4">
        {isLoading ? (
          <Loader size="xl" />
        ) : (
          <Button asChild>
            <Link href="/documents" className="flex items-center">
              Приступить к работе
              <ArrowRight className="h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
      <div className="w-fit mx-auto">
        {theme === "light" ? (
          <Image
            src={HeroDocs}
            height={300}
            width={600}
            alt="Drawings"
            className="dark:hidden pointer-events-none"
          />
        ) : (
          <Image
            src={HeroDocsDark}
            height={300}
            width={600}
            alt="Drawings"
            className="light:hidden pointer-events-none"
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
