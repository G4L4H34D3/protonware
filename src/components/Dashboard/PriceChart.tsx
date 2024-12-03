import { Box, useColorModeValue, Text, Flex, Select } from '@chakra-ui/react';
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
  ChartOptions
} from 'chart.js';

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

const PriceChart = () => {
  const borderColor = useColorModeValue('rgb(49, 130, 206)', 'rgb(99, 179, 237)');
  const bgGradient = useColorModeValue(
    'rgba(49, 130, 206, 0.1)',
    'rgba(99, 179, 237, 0.1)'
  );

  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'BTC/USDT Price',
        data: [45000, 45500, 44800, 46000, 45800, 46200],
        borderColor: borderColor,
        backgroundColor: bgGradient,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
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
      mode: 'index',
    },
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      borderRadius="xl"
      shadow="lg"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-2px)' }}
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="bold">Movimento do Preço</Text>
        <Select maxW="200px" size="sm">
          <option value="1d">Últimas 24 horas</option>
          <option value="1w">Última Semana</option>
          <option value="1m">Último Mês</option>
        </Select>
      </Flex>
      <Line options={options} data={data} />
    </Box>
  );
};

export default PriceChart;