export class StreamHandler {
    private readonly encoder = new TextEncoder();
    private readonly decoder = new TextDecoder();
  
    /**
     * Creates a ReadableStream that can be used to stream data
     * @param iterator - AsyncIterator that yields chunks of data
     * @returns ReadableStream
     */
    createReadableStream(iterator: AsyncIterator<any>): ReadableStream {
      return new ReadableStream({
        async pull(controller) {
          try {
            const { value, done } = await iterator.next();
            if (done) {
              controller.close();
            } else {
              controller.enqueue(value);
            }
          } catch (error) {
            controller.error(error);
          }
        },
      });
    }
  
    /**
     * Converts a string or object to a Uint8Array chunk
     * @param data - Data to be converted
     * @returns Uint8Array
     */
    createChunk(data: string | object): Uint8Array {
      const chunk = typeof data === 'string' ? data : JSON.stringify(data);
      return this.encoder.encode(chunk + '\n');
    }
  
    /**
     * Streams data from an API endpoint
     * @param url - API endpoint URL
     * @param options - Fetch options
     * @returns AsyncGenerator that yields chunks of data
     */
    async *streamFromApi(
      url: string,
      options?: RequestInit
    ): AsyncGenerator<Uint8Array, void, unknown> {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
          Accept: 'text/event-stream',
        },
      });
  
      if (!response.body) {
        throw new Error('Response body is null');
      }
  
      const reader = response.body.getReader();
  
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          yield value;
        }
      } finally {
        reader.releaseLock();
      }
    }
  
    /**
     * Process incoming stream data
     * @param data - Incoming stream data
     * @param onChunk - Callback function for each chunk
     */
    async processStreamData(
      data: ReadableStream<Uint8Array>,
      onChunk: (chunk: string) => void
    ): Promise<void> {
      const reader = data.getReader();
      let buffer = '';
  
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
  
          buffer += this.decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          // Process all complete lines
          buffer = lines.pop() || ''; // Keep the last incomplete line in buffer
          
          for (const line of lines) {
            if (line.trim()) {
              onChunk(line);
            }
          }
        }
        
        // Process any remaining data
        if (buffer.trim()) {
          onChunk(buffer);
        }
      } finally {
        reader.releaseLock();
      }
    }
  }