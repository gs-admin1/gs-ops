import { Groq } from "groq-sdk";

const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true
  });

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

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024,
    });
    const aiMessage = completion.choices[0]?.message?.content;

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