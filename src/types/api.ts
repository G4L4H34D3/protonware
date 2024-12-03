export interface API {
  id: string;
  exchange: string;
  apiKey: string;
  apiSecret: string;
  isActive: boolean;
  lastCheck: number;
  permissions: string[];
}