import axios from 'axios';

const key = "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"
const claudeClient = axios.create({
  baseURL: 'https://api.anthropic.com/v1', // Replace with the actual base URL of Claude API
  headers: {
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
  },
});

export const getClaudeResponse = async (userInput) => {
  const response = await claudeClient.post('/chat/completions', {
    model: 'claude-v1', // Replace with the actual model name
    messages: [{ role: 'user', content: userInput }],
    max_tokens: 500,
    temperature: 0.7,
  });
  return response.data;
};

export async function POST(request) {
  try {
    const { message } = await request.json();
    console.log('message: ', message);

    if (!message) {
      return new Response(JSON.stringify({ message: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await claudeClient.post('/chat/completions', {
      model: 'claude-v1', // Replace with the actual model name
      messages: [{ role: 'user', content: message }],
      max_tokens: 500,
      temperature: 0.7,
    });
    const aiMessage = response.data;

    return new Response(JSON.stringify({ response: aiMessage }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}  