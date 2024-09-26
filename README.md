# Asset Tracker

**Asset Tracker** is a financial management app designed to help users monitor their investments across cryptocurrencies, stocks, and other assets. With this app, users can input their transactions and track the performance of their portfolio in real-time. The app provides insights into overall profits or losses, individual asset performance, and more.

## Features

### 1. Transaction Tracking
- Users can log transactions for assets, including purchase price and quantity.
- Supports tracking of multiple asset types like cryptocurrencies, stocks, and funds.
- Automatic calculation of profit and loss for each asset and the overall portfolio.

### 2. Portfolio Overview
- Comprehensive view of the user's portfolio, including total value, initial investment, and profit/loss.
- Breakdown of individual asset performance with real-time market data.

### 3. Detailed Asset Analysis
- Detailed performance metrics for each asset: price changes, average purchase price, percentage gain/loss.
- Ability to monitor each asset's performance over various timeframes.

### 4. Profit & Loss Calculation
- Automatic calculation of profit/loss for each asset based on real-time prices.
- Shows unrealized and realized gains, helping users to track their investments effectively.

### 5. Price Alerts
- Users can set custom price alerts for specific assets.
- Real-time notifications when an asset hits the target price, allowing users to act quickly.

### 6. Multi-Asset Support
- The app supports various types of assets such as:
  - Cryptocurrencies (e.g., Bitcoin, Ethereum)
  - Stocks (e.g., Apple, Tesla)
  - Funds (e.g., ETFs, Mutual Funds)

### 7. Secure Login & Signup
- Secure authentication for creating accounts and logging in.
- User profiles allow for managing personal data, security, and app settings.

### 8. User-Friendly Interface
- Modern, easy-to-navigate UI for both mobile and web platforms.
- Clean layout for accessing key features quickly and efficiently.

---

## Installation

### 1. Clone the Repository

   ```bash
   git clone https://github.com/yourusername/asset-tracker.git
   cd asset-tracker


### 2. Backend Setup

   ```bash
   cd asset-tracker-backend
   npm install
   node server.js

Note -> Create a .env file in the backend directory and add the necessary environment variables such as database connection strings, API keys, and JWT secrets.

3. Frontend (UI) Setup

   ```bash
   cd asset-tracker
   npm install
   npx expo start


## Technologies Used
- Frontend: React Native, Expo, Redux
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Real-time Data: APIs for market prices (e.g., CoinGecko, Alpha Vantage)







