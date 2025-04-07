"use client"

import Image from "next/image";
import { Utensils, Send, ImageIcon, Loader2 } from "lucide-react"

import Link from "next/link";
import { useChat } from "@ai-sdk/react"
import React, { useEffect, useState } from "react";


import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { Key } from "react";

import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
import { headers } from "next/headers";


export default function IngredientVision() {
    // track state to check if user has attached an image
    const [attachment, setAttachment] = useState<File | null>(null)
    
    // useChat hook to handle chat
    // returns: array of chat messages, current value of input field, function to handle input change, function to handle submit, boolean to check if loading
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
      api: "/api/chat",
      streamProtocol: 'text',
      onResponse: (response: any) => {
        console.log("Response received:", response);
        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));
      },
      onError: (error: any) => {
        console.error("Chat error:", error);
      },
      onStream: (partialChunk: string) => {
        console.log("Streaming chunk:", partialChunk);
      },
      onFinish: () => {
        console.log("Streaming complete.");
      },
    })

    const [assistantResponse, setAssistantResponse] = useState("");

    useEffect(() => {
      console.log("Current messages:", messages);
    }, [messages]);

    // handle file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          setAttachment(e.target.files[0])
        }
      }
    
    // handle submit of form
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSubmit(e)
        setAttachment(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }
    
    // file input ref using hook
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col items-center justify-center container mx-auto px-4 py-12 max-w-7xl">
            <div className="space-y-4 md:space-y-0 md:space-x-3">
                <h1 className="text-3xl md:text-6xl font-bold text-[var(--groq-orange)] text-center drop-shadow-[0_0_15px_rgba(255,106,20,0.7)] font-bold">Voice Recipes</h1>
                <h3 className="text-center text-lg py-6 max-w-3xl mx-auto">A smart voice assistant that helps you identify ingredients in your fridge and pantry, and suggest recipes based on what you have. Powered by <Link href="https://console.groq.com/docs/vision" target="_blank" className="relative underline text-[var(--groq-orange)]">Groq Vision API</Link>.</h3>
            </div>
            <SignedIn>

            </SignedIn>

            <SignedOut>
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <h3 className="text-lg font-medium text-gray-900">Please sign in to continue</h3>
                </div>
            </SignedOut>

            {/* Show assistant response as it streams: */}
            <div className="p-4">
                {assistantResponse}
            </div>

            {/* Show a "Save" button only AFTER the current stream is complete. */}
            {!isLoading && assistantResponse && (
                <button onClick={() => saveRecipe(assistantResponse)}>
                    Save Recipe
                </button>
            )}
        </div>
    )
}
