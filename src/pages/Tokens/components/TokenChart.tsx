import React from 'react';
import {
  Box,
  Flex,
  Text,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { WalletAsset } from '../../../services/wallet/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TokenChartProps {
  asset: WalletAsset;
}

const TokenChart: React.FC<TokenChartProps> = ({ asset }) => {
  const borderColor = useColorModeValue('rgb(49, 130, 206)', 'rgb(99, 179, 237)');
  const bgGradient = useColorModeValue(
    'rgba(49, 130, 206, 0.1)',
    'rgba(99, 179, 237, 0.1)'
  );

  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: `${asset.symbol} Price`,
        data: [
          asset.price * 0.98,
          asset.price * 1.01,
          asset.price * 0.99,
          asset.price * 1.02,
          asset.price * 1.01,
          asset.price
        ],
        borderColor: borderColor,
        backgroundColor: bgGradient,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)'),
        titleColor: useColorModeValue('#1A202C', '#FFFFFF'),
        bodyColor: useColorModeValue('#1A202C', '#FFFFFF'),
        borderColor: useColorModeValue('rgba(226, 232, 240, 1)', 'rgba(45, 55, 72, 1)'),
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: useColorModeValue('rgba(226, 232, 240, 0.5)', 'rgba(45, 55, 72, 0.5)'),
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="xl" fontWeight="bold">{asset.name} Price Chart</Text>
        <Select maxW="200px" size="sm">
          <option value="1d">Last 24 hours</option>
          <option value="1w">Last Week</option>
          <option value="1m">Last Month</option>
        </Select>
      </Flex>
      <Line options={options} data={data} />
    </Box>
  );
};

export default TokenChart;