# ProtonWare

Uma plataforma sofisticada de arbitragem de criptomoedas que monitora diferenças de preços entre exchanges e executa trades automaticamente quando oportunidades lucrativas são detectadas.

## Funcionalidades

- Monitoramento de preços em tempo real entre exchanges
- Execução automática de arbitragem
- Gerenciamento de risco e dimensionamento de posição
- Logs e monitoramento abrangentes
- Parâmetros de trading configuráveis
- Suporte para múltiplos pares de trading

## Pré-requisitos

- Python 3.9+
- Node.js 16+ (para a interface web)
- Chaves de API das exchanges suportadas
- Saldo suficiente em ambas as exchanges

## Instalação

1. Clone o repositório
2. Instale as dependências Python:
   ```bash
   pip install -r requirements.txt
   ```
3. Instale as dependências Node.js:
   ```bash
   npm install
   ```
4. Copie `.env.example` para `.env` e configure suas configurações:
   ```bash
   cp .env.example .env
   ```

## Configuração

1. Configure suas chaves de API das exchanges no arquivo `.env`
2. Configure os parâmetros de trading em `src/config/settings.py`
3. Adicione ou modifique pares de trading na configuração

## Uso

1. Inicie o bot:
   ```bash
   npm run start-bot
   ```

2. Monitore os logs no diretório `logs`

## Arquitetura

- `src/config/`: Configuração e definições
- `src/exchanges/`: Integrações com exchanges
- `src/strategies/`: Estratégias de trading
- `src/utils/`: Funções e helpers utilitários
- `src/main.py`: Ponto de entrada principal da aplicação

## Recursos de Segurança

- Limite mínimo de lucro
- Limites máximos de valor de trade
- Limites diários de trades
- Proteção stop-loss
- Tratamento de erros e mecanismos de retry

## Contribuindo

1. Faça um fork do repositório
2. Crie um branch para sua feature
3. Faça commit das suas alterações
4. Push para o branch
5. Crie um Pull Request

## Licença

MIT License