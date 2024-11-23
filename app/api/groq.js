import { Groq } from "groq-sdk";

const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: userInput }],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 1024,
      });

      const response = completion.choices[0]?.message?.content;
      setAiResponse(response || 'No response received');
    } catch (error) {
      console.error('Error:', error);
      setAiResponse('Error getting response');
    } finally {
      setIsLoading(false);
    }
  };