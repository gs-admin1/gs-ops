import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: "sk-UF92afaRR3IMs_QiiHP8isqjf4kSIdeihzdxp_xvqST3BlbkFJkTQvBzMr8r-uZcy_hnqsTK1JODv2GFqPPYEvDSwdMA",
  dangerouslyAllowBrowser: true 
})

export async function openAiAssistant(request: String) {
  try {
    console.log('request: ', request);

    if (request === '') {
      return "Please provide a message";
    }

    // First create a thread
      const thread = await openai.beta.threads.create();

      // Then create a message in the thread
      const message = await openai.beta.threads.messages.create(
        thread.id,
        {
        role: "user",
        content: `Context: "You are a CRM assistant helping a user with their CRM data. The user has asked you to help them with a specific task. You should provide a helpful response to the user's request."
                  User Message: ${request}`
        }
      );

      // Then create a run
      const run = await openai.beta.threads.runs.create(
        thread.id,
        {
        assistant_id: "asst_V8TGvV8uGOG6mMXxkxLqfKec" // Your assistant ID here
        }
      );

      // Wait for the run to complete
      const runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );

      const messages = openai.beta.threads.messages.list(thread.id);
      console.log('messages: ', (await messages).data);

      const mesg = await openai.beta.threads.messages.retrieve(
        thread.id,
        message.id
      );
      console.log('message: ', mesg);

    const aiMessages = openai.beta.threads.messages.list(thread.id);
    console.log('messages: ', runStatus);

    return aiMessages;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Error calling OpenAI API";
  }
}