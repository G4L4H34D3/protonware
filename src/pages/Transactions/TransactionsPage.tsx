import React, { useState } from 'react';
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import TransactionsList from './components/TransactionsList';
import TransactionsSummary from './components/TransactionsSummary';
import TransactionsFilter from './components/TransactionsFilter';
import { useTransactions } from '../../hooks/useTransactions';

const TransactionsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { transactions, arbitrageTransactions, isLoading, error } = useTransactions();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Container maxW="1200px" py={8}>
      <Box
        bg={bgColor}
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
      >
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>All Transactions</Tab>
            <Tab>Arbitrage Trades</Tab>
            <Tab>Manual Trades</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TransactionsSummary transactions={transactions} />
              <TransactionsFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
              <TransactionsList
                transactions={transactions}
                filter={activeFilter}
                isLoading={isLoading}
                error={error}
              />
            </TabPanel>

            <TabPanel>
              <TransactionsSummary transactions={arbitrageTransactions} />
              <TransactionsFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
              <TransactionsList
                transactions={arbitrageTransactions}
                filter={activeFilter}
                isLoading={isLoading}
                error={error}
              />
            </TabPanel>

            <TabPanel>
              <TransactionsSummary
                transactions={transactions.filter(t => !t.isArbitrage)}
              />
              <TransactionsFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
              <TransactionsList
                transactions={transactions.filter(t => !t.isArbitrage)}
                filter={activeFilter}
                isLoading={isLoading}
                error={error}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default TransactionsPage;