import Anthropic from '@anthropic-ai/sdk';

const key = "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"

const anthropic = new Anthropic({
  apiKey: key, // defaults to process.env["ANTHROPIC_API_KEY"]
  dangerouslyAllowBrowser: true 
});

export async function claudeChat(request: string) {
    try{
    console.log('request: ', request);

    if (request === '') {
        return "Please provide a message";
    }

    const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: request }],
    });

    const aiMessage = response.content[0];
    
    console.log('aiMessage: ', aiMessage);
    return aiMessage;

    } catch (error) {
        console.error("Error calling Anthropic API: ", error);
        return "Error calling Anthropic API";
    }
}  


