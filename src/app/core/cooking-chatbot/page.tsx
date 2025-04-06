import Image from "next/image";
import { Github } from "lucide-react";
import Link from "next/link";


export default function CookingChatbot() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:space-x-3">
                <h1 className="text-3xl md:text-6xl font-bold text-[var(--groq-orange)] text-center drop-shadow-[0_0_15px_rgba(255,106,20,0.7)] font-bold">Cooking Chatbot</h1>
                <h3 className="text-center text-lg py-6 max-w-3xl mx-auto"></h3>
            </div>
        </div>
    )
}
