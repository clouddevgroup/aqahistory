// API endpoint to evaluate student answers using Anthropic's Claude API
import { Anthropic } from "@anthropic-ai/sdk";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Stored in Vercel environment variables
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, answer, topic, markScheme } = req.body;

    // Validate required fields
    if (!question || !answer || !topic || !markScheme) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Prepare the prompt for Claude
    const prompt = `You are an expert AQA GCSE History examiner. Evaluate this student answer to the following question:

Question: "${question}" (${markScheme} marks)
Topic: ${topic}

Student Answer:
"${answer}"

Based on AQA GCSE History marking criteria for a ${markScheme}-mark question, please:

1. Score this answer out of ${markScheme}.
2. Provide 3-5 specific suggestions for improvement.
3. Create a model example answer that would achieve full marks, following AQA GCSE History requirements.

Format your response as a JSON object with these fields:
- score: (number)
- suggestions: (array of strings)
- exampleAnswer: (string)`;

    // Call Anthropic's Claude API
    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4000,
      system: "You are an expert AQA GCSE History examiner providing detailed feedback on student answers. Always follow the appropriate mark scheme for the type of question. Your responses must be structured as valid JSON that can be parsed.",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Parse the JSON response from Claude
    let responseData;
    try {
      // Extract the JSON from Claude's response
      const responseText = message.content[0].text;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        responseData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Couldn't extract JSON from response");
      }
    } catch (parseError) {
      console.error("Error parsing Claude's response:", parseError);
      // Fallback with basic format if parsing fails
      responseData = {
        score: Math.floor(markScheme * 0.7), // Default to 70%
        suggestions: [
          "Be more specific with your examples.",
          "Structure your answer more clearly.",
          "Make sure to address all parts of the question."
        ],
        exampleAnswer: "Could not generate an example answer. Please try again."
      };
    }

    // Return the evaluation results
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}