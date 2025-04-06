import { GroqClient } from '@groq/groq-sdk';

// Initialize the Groq client
export const groqClient = new GroqClient({
  apiKey: process.env.GROQ_API_KEY,
});

// Helper function for text completion
export async function generateCompletion(prompt: string, model = 'llama3-70b-8192') {
  try {
    const completion = await groqClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: model,
      temperature: 0.7,
      max_tokens: 1024,
    });
    
    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating completion:', error);
    throw error;
  }
}

// Helper for multimodal inputs (for vision features)
export async function analyzeImage(imageUrl: string, prompt: string, model = 'llama3-70b-8192-vision') {
  try {
    const completion = await groqClient.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageUrl } }
          ]
        }
      ],
      model: model,
      temperature: 0.7,
      max_tokens: 1024,
    });
    
    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
} 