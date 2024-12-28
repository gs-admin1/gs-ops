// import { StreamHandler } from '../utils/streamHandler';

// export async function streamResponse(req: Request): Promise<Response> {
//   const streamHandler = new StreamHandler();
//   // Example async generator that yields data
//   async function* generateData() {
//     for (let i = 0; i < 10; i++) {
//       yield streamHandler.createChunk({
//         chunk: i,
//         timestamp: Date.now(),
//       });
//       await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
//     }
//   }

//   // Create readable stream
//   const stream = streamHandler.createReadableStream(generateData());

//   return new Response(stream, {
//     headers: {
//       'Content-Type': 'text/event-stream',
//       'Cache-Control': 'no-cache',
//       'Connection': 'keep-alive',
//     },
//   });
// }