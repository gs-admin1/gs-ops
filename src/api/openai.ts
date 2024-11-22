import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: "sk-UF92afaRR3IMs_QiiHP8isqjf4kSIdeihzdxp_xvqST3BlbkFJkTQvBzMr8r-uZcy_hnqsTK1JODv2GFqPPYEvDSwdMA",
  dangerouslyAllowBrowser: true 
})

export async function openAiChat(request: String) {
  try {
    console.log('request: ', request);

    if (request === '') {
      return "Please provide a message";
    }

    const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Your name is John. You are assisting a user with their CRM data."
          },
          {
            role: "user", 
            content: `Context: "You are a CRM assistant helping a user with their CRM data. The user has asked you to help them with a specific task. You should provide a helpful response to the user's request."
                      User Message: ${request}`
          }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 500,
        //memory_key: "conversation_history" // Include if needed for your context
      });
    const aiMessage = response.choices[0]?.message?.content;

    return aiMessage;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Error calling OpenAI API";
  }
}