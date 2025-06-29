import { env } from './env';

// Types for Cohere API
export interface CohereMessage {
  role: 'USER' | 'ASSISTANT';
  message: string;
}

export interface CohereResponse {
  text: string;
  generation_id: string;
  token_count: {
    prompt_tokens: number;
    response_tokens: number;
    total_tokens: number;
  };
}

// Function to call Cohere Chat API
export async function chatWithCohere(messages: CohereMessage[]): Promise<string> {
  try {
    console.log('Calling Cohere API with:', {
      url: env.API_URL,
      apiKey: env.COHERE_API_KEY ? `${env.COHERE_API_KEY.substring(0, 5)}...` : 'missing',
      messageCount: messages.length
    });
    
    const response = await fetch(env.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        message: messages[messages.length - 1].message,
        chat_history: messages.slice(0, -1).map(msg => ({
          role: msg.role,
          message: msg.message
        })),
        model: 'command',
        temperature: 0.7,
        preamble: "You are an AI learning assistant that helps students understand complex topics in computer science, mathematics, and other subjects. You provide clear, concise explanations and can break down difficult concepts into simpler terms.",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as CohereResponse;
    console.log('Cohere API response:', {
      generationId: data.generation_id,
      tokenCount: data.token_count
    });
    return data.text;
  } catch (error) {
    console.error('Error calling Cohere API:', error);
    throw error;
  }
}

// Test function to check if the API is working
export async function testCohereAPI(): Promise<boolean> {
  try {
    const testMessage: CohereMessage[] = [
      { role: 'USER', message: 'Hello, can you help me with a simple test?' }
    ];
    await chatWithCohere(testMessage);
    return true;
  } catch (error) {
    console.error('Cohere API test failed:', error);
    return false;
  }
} 