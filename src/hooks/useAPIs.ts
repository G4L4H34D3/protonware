import { useState, useEffect } from 'react';
import { API } from '../types/api';

export const useAPIs = () => {
  const [apis, setApis] = useState<API[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAPIs = async () => {
      try {
        // TODO: Replace with actual API call
        const mockAPIs: API[] = [
          {
            id: '1',
            exchange: 'binance',
            apiKey: 'gTlwXMy9Mfgbqdp1nbUtkPnZcmLtGMQ0bPd9fng1Qgoy30FlxGqo1fkOuZF40BMs',
            apiSecret: '********',
            isActive: true,
            lastCheck: Date.now(),
            permissions: ['read', 'trade']
          },
          {
            id: '2',
            exchange: 'foxbit',
            apiKey: 'f4HLCMYezB1PcYTlGVFP4y8iKAQwhWPm9QgGbgwB',
            apiSecret: '********',
            isActive: true,
            lastCheck: Date.now(),
            permissions: ['read', 'trade']
          }
        ];

        setApis(mockAPIs);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load APIs');
        setIsLoading(false);
      }
    };

    loadAPIs();
  }, []);

  return {
    apis,
    isLoading,
    error
  };
};