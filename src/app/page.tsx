import Image from "next/image";
import HomePage from "../pages/HomePage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[#404EED]">
      <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
        <HomePage />
      </div>
    </main>
  );
}
