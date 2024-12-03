import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { Transaction } from '../../../types/transaction';
import { formatCurrency } from '../../../utils/formatters';

interface TransactionsListProps {
  transactions: Transaction[];
  filter: string;
  isLoading: boolean;
  error: string | null;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  filter,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Flex justify="center" py={8}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  if (filteredTransactions.length === 0) {
    return (
      <Flex justify="center" py={8}>
        <Text color="gray.500">No transactions found</Text>
      </Flex>
    );
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Type</Th>
          <Th>Asset</Th>
          <Th>Amount</Th>
          <Th>Price</Th>
          <Th>Total</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredTransactions.map((transaction) => (
          <Tr key={transaction.id}>
            <Td>{new Date(transaction.timestamp).toLocaleString()}</Td>
            <Td>
              <Flex align="center" gap={2}>
                <Icon
                  as={transaction.type === 'buy' ? FiArrowDownLeft : FiArrowUpRight}
                  color={transaction.type === 'buy' ? 'green.500' : 'red.500'}
                />
                <Text
                  color={transaction.type === 'buy' ? 'green.500' : 'red.500'}
                  textTransform="capitalize"
                >
                  {transaction.type}
                </Text>
              </Flex>
            </Td>
            <Td>{transaction.symbol}</Td>
            <Td>{transaction.amount.toFixed(8)}</Td>
            <Td>{formatCurrency(transaction.price)}</Td>
            <Td>{formatCurrency(transaction.amount * transaction.price)}</Td>
            <Td>
              <Badge
                colorScheme={
                  transaction.status === 'completed'
                    ? 'green'
                    : transaction.status === 'pending'
                    ? 'yellow'
                    : 'red'
                }
              >
                {transaction.status}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TransactionsList;