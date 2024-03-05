import Hero from "./_components/Hero";

export default function Home() {
  return (
      <div className="min-h-full flex flex-col pt-32">
        <div className="flex flex-col items-center justify-center md:justify-start text-center gap-8 flex-1 px-6 py-10">
          <Hero />
        </div>
      </div>
  );
}
