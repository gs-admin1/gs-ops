import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: "sk-UF92afaRR3IMs_QiiHP8isqjf4kSIdeihzdxp_xvqST3BlbkFJkTQvBzMr8r-uZcy_hnqsTK1JODv2GFqPPYEvDSwdMA",
  dangerouslyAllowBrowser: true 
})

export async function* openAiAssistant(request: String) {
  try {
    console.log('request: ', request);

    if (request === '') {
      return "Please provide a message";
    }

  //   const stream = await openai.beta.threads.createAndRun({
  //     assistant_id: "asst_V8TGvV8uGOG6mMXxkxLqfKec",
  //     thread: {
  //       messages: [
  //         { role: "user", content: "what is a crm?" },
  //       ],
  //     },
  //     stream: true
  // });

  // for await (const event of stream) {
  //   console.log('events ', event);
  // }

    // First create a thread
    const thread = await openai.beta.threads.create();

      // const thread = await openai.beta.threads.retrieve(
      //   "thread_R2hGv6NXESlxzM5IUsQtB8p7"
      // );
    
      console.log(thread);

      // Then create a message in the thread
      const message = await openai.beta.threads.messages.create(
        thread.id,
        {
        role: "user",
        // 
        content: `${request}`
        }
      );

      // Then create a run
      const run = await openai.beta.threads.runs.create(
        thread.id,
        {
        assistant_id: "asst_V8TGvV8uGOG6mMXxkxLqfKec", stream: true// Your assistant ID here
        }
      );

      for await (const event of run) {
        console.log(event);
        const res = (event as any).data.delta?.content[0].text.value;
        console.log('res: ', res);
        yield res;
      }

      console.log('run: ', run);

      console.log('thread: ', thread.id);
      const messages = openai.beta.threads.messages.list(thread.id);
      const aiMessage = (await messages).data;
      console.log('response: ', aiMessage);

      const mesg = await openai.beta.threads.messages.retrieve(
        thread.id,
        message.id
      );
      console.log('query: ', mesg.content[0])

    //return aiMessage;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    yield "Error calling OpenAI API";
  }
}