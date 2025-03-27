# AQA GCSE History Revision App

An interactive web application for AQA GCSE History revision with AI-powered feedback on practice questions.

## Features

- Comprehensive study materials for America 1920s-1950s
- Practice questions with AI feedback using Anthropic's Claude
- Example answers that model AQA exam requirements
- Dynamic question generation

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Next.js API routes for serverless functions
- AI: Anthropic Claude API for question evaluation and example answers
- Deployment: Vercel

## Development

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file with your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to a GitHub repository.

2. Connect your repository to Vercel.

3. Add your `ANTHROPIC_API_KEY` as an environment variable in the Vercel project settings.

4. Deploy!

## License

MIT