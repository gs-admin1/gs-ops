import { Groq } from "groq-sdk";

const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true
  });

export async function groqChat(request: string) {
  try {
    console.log('request: ', request);

    if (request === '') {
      return "Please provide a message";
    }

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: request }],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024,
    });
    const aiMessage = completion.choices[0]?.message?.content;

    return aiMessage;
  } catch (error) {
    console.error("Error calling Groq API: ", error);
    return "Error calling Groq API";
  }
}  