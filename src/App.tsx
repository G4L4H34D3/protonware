import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import LoginPage from './pages/Auth/LoginPage';
import TokensPage from './pages/Tokens/TokensPage';
import ExchangeBalancesPage from './pages/ExchangeBalances/ExchangeBalancesPage';
import WalletsPage from './pages/Wallets/WalletsPage';
import TransactionsPage from './pages/Transactions/TransactionsPage';
import APIsPage from './pages/APIs/APIsPage';
import ArbitragePage from './pages/Arbitrage/ArbitragePage';
import OrderBookPage from './pages/OrderBook/OrderBookPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/tokens"
            element={
              <PrivateRoute>
                <Layout>
                  <TokensPage />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/balances"
            element={
              <PrivateRoute>
                <Layout>
                  <ExchangeBalancesPage />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/wallets"
            element={
              <PrivateRoute>
                <Layout>
                  <WalletsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/apis"
            element={
              <PrivateRoute>
                <Layout>
                  <APIsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Layout>
                  <TransactionsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/arbitrage"
            element={
              <PrivateRoute>
                <Layout>
                  <ArbitragePage />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/order-book"
            element={
              <PrivateRoute>
                <Layout>
                  <OrderBookPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;