import { createGroq } from "@ai-sdk/groq";

import { streamText, Message as AIMessage } from "ai";

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY
});

// this llama model can take image data as input
const model = groq("meta-llama/llama-4-scout-17b-16e-instruct");

export async function POST(req: Request) {
    try {
        // get the messages from the request (user and assistant messages)
        const { messages } = await req.json();

        // Get the last message (the one we're responding to)
        const lastMessage = messages[messages.length - 1];

        // Check if there are any image attachments in the last message
        const hasImageAttachment = lastMessage.experimental_attachments?.some(
            (attachment: any) => attachment.contentType.startsWith("image/")
        );

        // Prepare the messages for the Groq API
        const formattedMessages = messages.map((message: AIMessage) => {
            // For messages with image attachments, format them for the vision model
            if (message.experimental_attachments?.length && message.role === "user") {
            const content = [];
            
            // Add the text content if it exists
            if (message.content) {
                content.push({
                    type: "text",
                    text: message.content
                });
            }
            
            // Add each image attachment
            message.experimental_attachments.forEach((attachment: any) => {
                attachment.contentType.startsWith("image/") ?
                    content.push({
                        type: "image_url",
                        image_url: {
                            url: attachment.url
                        }
                    }) : null;
            });
            
                // return the message with the content if there is any
                return {
                    role: message.role,
                    content
                };
            }
            
            // For regular text messages
            return {
                role: message.role,
                content: message.content
            };
        });
    
        // Generate a streaming response from Groq
        const { textStream } = await streamText({
            model,
            system: "You are a helpful cooking assistant. You provide recipes with a list of ingredients and step by step instructions. And answer questions about food preparation. Your main task will be analyzing images of ingredients and provide suggestions for recipes based on the ingredients in the image. When providing recipe instructions, please format your response in Markdown. Use headings (#), bulleted lists (*), and code blocks for clarity when needed.You can provide multiple recipes using multiple combinations of ingredients. Keep your responses focused on cooking and food-related topics.",
            messages: formattedMessages,
            temperature: 0.7,
            maxTokens: 1024,
        });

        // Return a standard SSE response
        return new Response(textStream as any, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });

    } catch (error) {
        console.error("Error in chat API route:", error);
        return new Response(
          JSON.stringify({ error: "Failed to process request" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
