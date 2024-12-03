export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const formatNumber = (num: number, decimals: number = 8): string => {
  return num.toFixed(decimals);
};

export const calculateSpread = (buyPrice: number, sellPrice: number): number => {
  return ((sellPrice - buyPrice) / buyPrice) * 100;
};