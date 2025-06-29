# Eduverse

An interactive educational platform with AI-powered learning tools, games, and a chatbot assistant.

## Environment Variables

This project uses environment variables to manage configuration settings. These are stored in a `.env` file in the root directory.

### Setting Up Environment Variables

1. Create a `.env` file in the root directory of the project
2. Add the following variables:

```
# Cohere AI API Key
VITE_COHERE_API_KEY=your_cohere_api_key_here

# Other environment variables
VITE_APP_NAME=Eduverse
VITE_API_URL=https://api.example.com
```

### Available Environment Variables

| Variable              | Description                    | Default                   |
| --------------------- | ------------------------------ | ------------------------- |
| `VITE_COHERE_API_KEY` | API key for Cohere AI services | (none)                    |
| `VITE_APP_NAME`       | Application name               | "Eduverse"                |
| `VITE_API_URL`        | Base URL for API calls         | "https://api.example.com" |

### Using Environment Variables in Code

Environment variables are accessed through the `env` object from `src/lib/env.ts`:

```typescript
import { env } from "../lib/env";

// Use environment variables
console.log(env.APP_NAME);
console.log(env.COHERE_API_KEY);
```

## Features

- **AI Chatbot**: Get personalized help and explanations powered by Cohere AI
- **Interactive Games**: Learn programming concepts through fun games
- **Courses**: Access structured learning materials
- **Quizzes**: Test your knowledge with interactive quizzes

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables as described above
4. Start the development server: `npm run dev`

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Cohere AI API
