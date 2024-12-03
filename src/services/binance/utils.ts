import CryptoJS from 'crypto-js';

export const generateSignature = (queryString: string, apiSecret: string): string => {
  return CryptoJS.HmacSHA256(queryString, apiSecret).toString();
};

export const formatBalance = (balance: string): number => {
  return parseFloat(balance);
};

export const serializeError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};