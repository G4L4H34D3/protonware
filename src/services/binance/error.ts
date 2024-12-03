export class BinanceApiError extends Error {
  constructor(
    message: string,
    public readonly code?: number,
    public readonly status?: number,
    public readonly data?: any
  ) {
    super(message);
    this.name = 'BinanceApiError';
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      data: this.data
    };
  }
}

export class BinanceNetworkError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    this.name = 'BinanceNetworkError';
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message
    };
  }
}

export class BinanceWebSocketError extends Error {
  constructor(message: string, public readonly code?: number) {
    super(message);
    this.name = 'BinanceWebSocketError';
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code
    };
  }
}