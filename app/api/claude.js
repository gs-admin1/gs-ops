import axios from 'axios';

const claudeClient = axios.create({
  baseURL: 'https://api.anthropic.com/v1', // Replace with the actual base URL of Claude API
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLAUDE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const key = "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"
export const getClaudeResponse = async (userInput) => {
  const response = await claudeClient.post('/chat/completions', {
    model: 'claude-v1', // Replace with the actual model name
    messages: [{ role: 'user', content: userInput }],
    max_tokens: 500,
    temperature: 0.7,
  });
  return response.data;
};