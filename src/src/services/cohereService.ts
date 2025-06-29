
interface CohereResponse {
  text: string;
}

const COHERE_API_KEY = 'o5KOTIlYslUznYWSNA9dqy3wiyWTCGMG5OanHt6u';
const API_URL = 'https://api.cohere.ai/v1/generate';

export async function getCohereResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command',
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7,
        stop_sequences: [],
        return_likelihoods: 'NONE',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cohere API error:', errorData);
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.generations[0].text.trim();
  } catch (error) {
    console.error('Error calling Cohere API:', error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
}
