import {
  SimpleGrid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FiTrendingUp, FiActivity, FiCheckCircle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const TradingStats = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const gradientBg = useColorModeValue(
    'linear(to-r, blue.50, teal.50)',
    'linear(to-r, blue.900, teal.900)'
  );
  const { t } = useTranslation();

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      <StatCard
        label={t('stats.dailyProfit')}
        value="R$ 6.172,80"
        helpText="+23,36%"
        icon={FiTrendingUp}
        bgColor={bgColor}
        gradient={gradientBg}
        isUp={true}
      />
      <StatCard
        label={t('stats.totalTrades')}
        value="42"
        helpText={t('stats.last24h')}
        icon={FiActivity}
        bgColor={bgColor}
        gradient={gradientBg}
      />
      <StatCard
        label={t('stats.successRate')}
        value="94,5%"
        helpText={`38/42 ${t('stats.trades')}`}
        icon={FiCheckCircle}
        bgColor={bgColor}
        gradient={gradientBg}
        isUp={true}
      />
    </SimpleGrid>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  helpText: string;
  icon: React.ComponentType;
  bgColor: string;
  gradient: string;
  isUp?: boolean;
}

const StatCard = ({ label, value, helpText, icon, bgColor, gradient, isUp }: StatCardProps) => (
  <Box
    p={6}
    bg={bgColor}
    borderRadius="xl"
    shadow="lg"
    transition="transform 0.2s"
    _hover={{ transform: 'translateY(-2px)' }}
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgGradient={gradient}
      opacity={0.1}
    />
    <Flex justify="space-between" align="start">
      <Stat>
        <StatLabel fontSize="sm" fontWeight="medium">{label}</StatLabel>
        <StatNumber fontSize="2xl" fontWeight="bold">{value}</StatNumber>
        <StatHelpText>
          {isUp !== undefined && <StatArrow type={isUp ? 'increase' : 'decrease'} />}
          {helpText}
        </StatHelpText>
      </Stat>
      <Icon as={icon} w={6} h={6} color="blue.400" />
    </Flex>
  </Box>
);

export default TradingStats;