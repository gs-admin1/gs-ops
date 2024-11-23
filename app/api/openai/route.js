// app/api/chat/route.js
import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: "sk-UF92afaRR3IMs_QiiHP8isqjf4kSIdeihzdxp_xvqST3BlbkFJkTQvBzMr8r-uZcy_hnqsTK1JODv2GFqPPYEvDSwdMA",
  dangerouslyAllowBrowser: true 
})

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

    const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. [Your specific assistant instructions here]"
          },
          {
            role: "user", 
            content: `Context: "You are a CRM assistant helping a user with their CRM data. The user has asked you to help them with a specific task. You should provide a helpful response to the user's request."
                      User Message: ${message}`
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

  // // First create a thread
      // const thread = await openai.beta.threads.create();

      // // Then create a message in the thread
      // const message = await openai.beta.threads.messages.create(
      //   thread.id,
      //   {
      //   role: "user",
      //   content: `Context: "You are a CRM assistant helping a user with their CRM data. The user has asked you to help them with a specific task. You should provide a helpful response to the user's request."
      //             User Message: ${userInput}`
      //   }
      // );

      // // Then create a run
      // const run = await openai.beta.threads.runs.create(
      //   thread.id,
      //   {
      //   assistant_id: "asst_V8TGvV8uGOG6mMXxkxLqfKec" // Your assistant ID here
      //   }
      // );

      // // Wait for the run to complete
      // const runStatus = await openai.beta.threads.runs.retrieve(
      //   thread.id,
      //   run.id
      // );
