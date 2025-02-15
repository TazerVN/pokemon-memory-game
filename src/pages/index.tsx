import { Geist, Geist_Mono } from "next/font/google";
import GeneratePokemon from "./getData";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [secret, setSecret] = useState(false);
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="flex flex-col flex-auto h-20 justify-center items-center">
        <h1
          onClick={() => {
            setSecret(true);
            setTimeout(() => setSecret(false), 2000);
          }}
          className="font-extrabold text-2xl md:text-5xl hover:scale-125 transition-all cursor-pointer"
        >
          Pokemon Memory Game
        </h1>
        <div className="flex">
          {secret ? (
            <h4 className="flex text-base">Never thought you would click this. Well im glad you did!</h4>
          ) : (
            <></>
          )}
        </div>
      </div>

      <main className="flex flex-col">
        <div className="flex flex-col">{GeneratePokemon(12)}</div>
      </main>
    </div>
  );
}
