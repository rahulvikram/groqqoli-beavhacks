"use client"

import Image from "next/image";
import { Utensils, Send, ImageIcon, Loader2 } from "lucide-react"

import Link from "next/link";
import { useChat } from "@ai-sdk/react"
import React from "react";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { Key, useState } from "react";

import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'


export default function IngredientVision() {
    // track state to check if user has attached an image
    const [attachment, setAttachment] = useState<File | null>(null)
    
    // useChat hook to handle chat
    // returns: array of chat messages, current value of input field, function to handle input change, function to handle submit, boolean to check if loading
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
      api: "/api/chat",
    })

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
        <div className="flex flex-col items-center justify-center container mx-auto px-4 py-12 max-w-5xl">
            <div className="space-y-4 md:space-y-0 md:space-x-3">
                <h1 className="text-3xl md:text-6xl font-bold text-[var(--groq-orange)] text-center drop-shadow-[0_0_15px_rgba(255,106,20,0.7)] font-bold">Ingredient Vision</h1>
                <h3 className="text-center text-lg py-6 max-w-3xl mx-auto">A smart ingredient vision system that helps you identify ingredients in your fridge and pantry, and suggest recipes based on what you have. Powered by <Link href="https://console.groq.com/docs/vision" target="_blank" className="relative underline text-[var(--groq-orange)]">Groq Vision API</Link>.</h3>
            </div>
            <SignedIn>
            <div className="w-full">
                <Card className="border rounded-lg shadow-sm overflow-hidden w-full">
                    <div className="h-[600px] overflow-y-auto p-4 bg-gray-50">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                        <Utensils className="h-12 w-12 text-[var(--groq-orange)] mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Cooking Assistant</h3>
                        <p className="text-gray-500 mt-2 max-w-sm">
                            Ask me anything about recipes, cooking techniques, ingredient substitutions, or meal planning!
                        </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                        {/* render the returned messages for display */}
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                                <Avatar className={message.role === "user" ? "bg-orange-100" : "bg-orange-500"}>
                                <div className="flex items-center justify-center h-full w-full">
                                  {message.role === "user" ? (
                                    <UserButton />
                                  ) : (
                                    <div className="text-sm">AI</div>
                                  )}
                                </div>
                                </Avatar>
                                <div
                                className={`rounded-lg px-4 py-2 ${
                                    message.role === "user" ? "bg-orange-500 text-white" : "bg-white border border-gray-200"
                                }`}
                                >
                                {message.content}
                                {message.experimental_attachments?.map(
                                    (attachment: { contentType: string; url: any; }, index: Key | null | undefined) =>
                                    attachment.contentType.startsWith("image/") && (
                                        <img
                                        key={index}
                                        src={attachment.url || "/placeholder.svg"}
                                        alt="Attached food image"
                                        className="mt-2 rounded-md max-h-48 w-auto"
                                        />
                                    ),
                                )}
                                </div>
                            </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                            <div className="flex gap-3 max-w-[80%]">
                                <Avatar className="bg-orange-500">
                                <div className="text-sm">AI</div>
                                </Avatar>
                                <div className="rounded-lg px-4 py-2 bg-white border border-gray-200">
                                <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                                </div>
                            </div>
                            </div>
                        )}
                        </div>
                    )}
                    </div>
                    <Separator />
                    <form onSubmit={onSubmit} className="p-4 bg-white">
                    <div className="flex items-end gap-2">
                        <div className="flex-1">
                        <Textarea
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask about recipes, cooking tips, or meal ideas..."
                            className="min-h-[80px] resize-none"
                        />
                        {attachment && (
                            <div className="mt-2 text-sm text-gray-500 flex items-center gap-1" style={{ cursor: "pointer" }}>
                            <ImageIcon className="h-4 w-4"/>
                            {attachment.name}
                            </div>
                        )}
                        </div>
                        <div className="flex flex-col gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => fileInputRef.current?.click()}
                            style={{ cursor: "pointer" }}
                        >
                            <ImageIcon className="h-4 w-4" />
                            <span className="sr-only">Attach image</span>
                        </Button>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        <Button
                            type="submit"
                            className="rounded-full bg-[var(--groq-orange)]"
                            size="icon"
                            disabled={isLoading || (!input && !attachment)}
                            style={{ cursor: isLoading || (!input && !attachment) ? "not-allowed" : "pointer" }}
                        >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send message</span>
                        </Button>
                        </div>
                    </div>
                    </form>
                </Card>
            </div>
            </SignedIn>

            <SignedOut>
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <h3 className="text-lg font-medium text-gray-900">Please sign in to continue</h3>
                </div>
            </SignedOut>
        </div>
    )
}
