import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col h-full justify-center items-center">
      <h1 className="text-8xl">4😭4</h1>
      <div className="py-4">
        <h3 className="text-5xl">Вы ошиблись дверью!</h3>
      </div>
      <Link href="/" className="font-semibold text-blue-400 underline">
        Вернуться домой
      </Link>
    </main>
  );
}
