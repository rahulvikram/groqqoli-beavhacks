"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, LogIn, ChefHat } from "lucide-react"
import Image from "next/image"

import NavLink from "./navlink"

import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

interface NavbarProps {
    title: string;
    links: {
        label: string;
        href: string;
    }[];
}

export default function Navbar({ title, links }: NavbarProps) {
    const pathname = usePathname();

    // set up theme switching hooks
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    
    // Add authentication state (this would be replaced with your actual auth logic)
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    // Avoid hydration mismatch by only showing the button after mounting
    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-[var(--groq-bg)] navbar-border" id="navbar">
            <div className="flex flex-row items-left space-x-4">
                <a href="/">
                    <h1 className="text-3xl font-extrabold text-[var(--groq-orange)] navbar-title">{title}</h1>
                </a>
                <p className="text-sm text-[var(--groq-fg)] flex items-center">
                    Powered by
                    {mounted && (
                        <Link href="https://www.groq.com">
                            <Image 
                                src={theme === "dark" ? "/groqwhite.svg" : "/groqblack.svg"} 
                                alt="Groq Logo" 
                                width={40} 
                                height={40} 
                                className="ml-1" 
                            />
                        </Link>
                    )}
                </p>
            </div>
            <div className="flex items-center space-x-4">
                {links.map((link) => (
                    <NavLink key={link.href} href={link.href}>
                        {link.label}
                    </NavLink>
                ))}
                
                {/* Sign In button - only show when not signed in */}
                <SignedOut>
                    <SignInButton>
                        <button className="flex items-center space-x-2 text-[var(--groq-fg)] bg-[var(--groq-bg-hover)] hover:text-[var(--groq-orange)] rounded-md navbar-link px-3 py-1.5" style={{ cursor: "pointer" }}>
                            <LogIn size={18} />
                            <span>Sign In</span>
                        </button>
                    </SignInButton>
                    <SignUpButton>
                        <button className="flex items-center space-x-2 text-white bg-[var(--groq-orange)] hover:bg-[var(--groq-orange)]/90 rounded-md navbar-link px-3 py-1.5" style={{ cursor: "pointer" }}>
                            <ChefHat size={18} />
                            <span>Sign Up</span>
                        </button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-white/10 text-[var(--groq-fg)] transition-colors"
                        aria-label="Toggle theme"
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                )}
            </div>
        </div>
    )
}
