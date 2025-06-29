interface Env {
  COHERE_API_KEY: string;
  APP_NAME: string;
  API_URL: string;
  // Add more environment variables as needed
}

// Load environment variables with fallback values
export const env: Env = {
  COHERE_API_KEY: import.meta.env.VITE_COHERE_API_KEY as string || 'o5KOTIlYslUznYWSNA9dqy3wiyWTCGMG5OanHt6u',
  APP_NAME: import.meta.env.VITE_APP_NAME as string || 'Eduverse',
  API_URL: import.meta.env.VITE_API_URL as string || 'https://api.example.com',
  // Add more environment variables as needed
}; 