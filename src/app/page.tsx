"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Github } from "lucide-react"

import NavLink from "./components/navlink"

export default function Home() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-3">
        <h1 className="text-3xl md:text-6xl font-bold text-center">
          Your Cooking Assistant <span className="text-[var(--groq-orange)] animate-pulse drop-shadow-[0_0_15px_rgba(255,106,20,0.7)] font-bold">Powered by Multimodal AI</span>
        </h1>
      </div>
      <h3 className="text-center text-lg py-6 max-w-3xl mx-auto">
        Groqqoli is an AI cooking assistant that helps you cook delicious meals. Features include <b><Link key="cooking-chatbot" href="/core/cooking-chatbot" className="relative after:absolute after:bg-[var(--groq-orange)] after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300 rounded px-1">Cooking Chatbot</Link></b>, <b><Link key="ingredient-vision" href="/core/ingredient-vision" className="relative after:absolute after:bg-[var(--groq-orange)] after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300 rounded px-1">Ingredient Vision</Link></b>, and <b><Link key="voice-recipes" href="/core/voice-recipes" className="relative after:absolute after:bg-[var(--groq-orange)] after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300 rounded px-1">Recipe Assistant</Link></b>.
      </h3>
      <div className="flex flex-row items-center gap-4 justify-center">
        <button className=" flex flex-row  bg-[var(--groq-orange)] text-white px-4 py-2 rounded-md">
          <Link href="/core/about" className="font-semibold">Start Cooking 👨‍🍳</Link>
        </button>
        <button className=" flex flex-row bg-transparent text-[var(--groq-orange)] px-4 py-2 rounded-md hover:bg-white/80 hover:border-1 hover:border-[var(--groq-orange)] transition-all duration-300">
          <Link href="https://github.com/rahulvikram/groqqoli-beavhacks" target="_blank" className="font-semibold flex flex-row items-center gap-2">
            <Github className="w-4 h-4" /> Learn More
          </Link>
        </button>
      </div>
    </div>
    </>
  );
}
