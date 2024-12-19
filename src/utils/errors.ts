export class APIError extends Error {
  constructor(
    message: string, 
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network connection error') {
    super(message);
    this.name = 'NetworkError';
  }
}

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof TypeError && error.message === 'Failed to fetch';
};