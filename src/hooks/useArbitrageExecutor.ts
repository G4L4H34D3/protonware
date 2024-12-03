import { useState } from 'react';
import { ArbitrageOpportunity } from '../services/exchanges/types';
import { sleep } from '../utils/helpers';
import { useWalletManager } from './useWalletManager';

export const useArbitrageExecutor = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const { updateWalletBalance } = useWalletManager();

  const executeArbitrage = async (opportunity: ArbitrageOpportunity): Promise<boolean> => {
    if (isExecuting) {
      throw new Error('Já existe uma operação de arbitragem em andamento');
    }

    if (!opportunity.amount || !opportunity.sourceWallet) {
      throw new Error('Valor de investimento e carteira são obrigatórios');
    }

    try {
      setIsExecuting(true);

      // 1. Deduzir o valor da carteira de origem
      await updateWalletBalance(
        opportunity.sourceWallet,
        opportunity.symbol.split('/')[0],
        -opportunity.amount
      );

      // Simular tempo de execução da ordem de compra
      await sleep(1000);

      // 2. Simular a compra na exchange de origem
      const boughtAmount = opportunity.amount / opportunity.buyPrice;

      // Simular transferência entre exchanges
      await sleep(1000);

      // 3. Simular a venda na exchange de destino
      const soldAmount = boughtAmount * opportunity.sellPrice;

      // 4. Adicionar o valor resultante na carteira de destino
      await updateWalletBalance(
        opportunity.sellExchange.toLowerCase(),
        opportunity.symbol.split('/')[1],
        soldAmount
      );

      // Calcular e registrar o lucro
      const profit = soldAmount - opportunity.amount;
      console.log(`Lucro da arbitragem: ${profit}`);

      return true;
    } catch (error) {
      // Em caso de erro, reverter as alterações nas carteiras
      if (opportunity.amount && opportunity.sourceWallet) {
        await updateWalletBalance(
          opportunity.sourceWallet,
          opportunity.symbol.split('/')[0],
          opportunity.amount
        );
      }
      
      throw new Error('Falha ao executar arbitragem: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    executeArbitrage,
    isExecuting
  };
};