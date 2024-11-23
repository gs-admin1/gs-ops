// app/api/chat/route.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: "sk-UF92afaRR3IMs_QiiHP8isqjf4kSIdeihzdxp_xvqST3BlbkFJkTQvBzMr8r-uZcy_hnqsTK1JODv2GFqPPYEvDSwdMA",
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ message: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo", 
    //   messages: [{ role: "user", content: message }],
    // });

    const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. [Your specific assistant instructions here]"
          },
          {
            role: "user", 
            content: `Context: "You are a CRM assistant helping a user with their CRM data. The user has asked you to help them with a specific task. You should provide a helpful response to the user's request."
                      User Message: ${userInput}`
          }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 500,
        //memory_key: "conversation_history" // Include if needed for your context
      });

    const aiMessage = response.choices[0]?.message?.content;

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
