# AQA History Revision Website Guidelines

## Commands
- Install: `npm install` to install dependencies
- Run: `npm run dev` to start the Next.js development server
- Build: `npm run build` to create production build
- Start: `npm start` to run the production build
- Lint: `npm run lint` to lint all files
- Test: No specific test commands defined in package.json

## Environment Setup
- Create a `.env.local` file with your Anthropic API key:
  ```
  ANTHROPIC_API_KEY=your_api_key_here
  ```

## Code Style
- **Imports**: Standard library → Third-party packages → Local components/modules
- **HTML**: Semantic markup, accessibility attributes, responsive design
- **CSS**: Use variables (--primary-color), mobile-first, BEM methodology
- **JavaScript**: ES6+, camelCase variables, arrow functions, async/await for API calls
- **Next.js**: API routes in pages/api/, page components in pages/
- **Naming**: Descriptive HTML classes, semantic elements, meaningful variables
- **Comments**: JSDoc format for functions, document complex logic
- **Error handling**: Use try/catch for API calls, provide fallbacks (see practice.js)
- **Media**: Optimize images, implement lazy loading via IntersectionObserver
- **Structure**: Modular components, separation of concerns, maintain file organization

## API Integration
- AI evaluation in `/pages/api/evaluate.js` using `@anthropic-ai/sdk`
- Claude API requests require question, answer, topic, and mark scheme
- Structure responses as valid JSON with score, suggestions, and example answers

Follow existing patterns in similar files when adding new features.