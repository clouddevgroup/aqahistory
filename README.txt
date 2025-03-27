# AQA GCSE History Revision App

An interactive web application for AQA GCSE History revision with AI-powered feedback on practice questions.

## IMPORTANT: First Time Setup

**Before running the app for the first time:**

1. Run the build step to generate the static files:
   ```
   npm run build
   ```

2. This is only needed once, or when you make changes to the HTML files.

## Getting Started

### Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file with your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```
   
   You can get an API key from https://console.anthropic.com/

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Application Features

- **Topic Exploration**: Browse key topics in American history from the 1920s-1950s
- **Practice Questions**: Test knowledge with questions structured according to AQA mark schemes
- **AI Feedback**: Get personalized feedback on your answers from Claude
- **Example Answers**: See model answers that demonstrate AQA exam requirements
- **Generate New Questions**: Create new questions on demand for extra practice

### Using the AI Feedback

1. Navigate to the Practice Questions page
2. Select a question to answer, or generate a new one
3. Type your answer in the text area
4. Click "Submit Answer"
5. Review your score, improvement suggestions, and example answer

## Deployment to Vercel

1. Push your code to a GitHub repository.

2. Connect your repository to Vercel:
   - Create an account at vercel.com if you don't have one
   - Create a new project and import your repository
   - Configure the build settings (Next.js defaults should work)

3. Add your `ANTHROPIC_API_KEY` as an environment variable in the Vercel project settings.

4. Deploy!

## Troubleshooting

- If the API calls fail, the application will automatically fall back to local evaluation.
- Check the browser console for any error messages.
- Ensure your Anthropic API key is correctly set up in the environment variables.
- If you're experiencing CORS issues in development, make sure you're accessing the app via localhost:3000.

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Next.js API routes for serverless functions
- AI: Anthropic Claude API for question evaluation and example answers
- Deployment: Vercel