interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  factor?: number;
  shouldRetry?: (error: Error) => boolean;
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 30000,
  factor: 2,
  shouldRetry: () => true
};

export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  let lastError: Error;
  let attempt = 1;
  let delay = opts.initialDelay;

  while (attempt <= opts.maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === opts.maxAttempts || !opts.shouldRetry(lastError)) {
        throw lastError;
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * opts.factor, opts.maxDelay);
      attempt++;
    }
  }

  throw lastError!;
}

export const isRetryableError = (error: Error): boolean => {
  if (error.message.includes('429')) return true; // Rate limit
  if (error.message.includes('500')) return true; // Server error
  if (error.message.includes('502')) return true; // Bad gateway
  if (error.message.includes('503')) return true; // Service unavailable
  if (error.message.includes('504')) return true; // Gateway timeout
  if (error.message.includes('network')) return true; // Network errors
  if (error.message.toLowerCase().includes('timeout')) return true;
  return false;
};