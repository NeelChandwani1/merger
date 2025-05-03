# Merger Arbitrage Monitor

## Overview
The Merger Arbitrage Monitor is a tool designed to track announced mergers and acquisitions. It calculates the spread between the current stock price and the buyout offer, providing users with insights into potential investment opportunities.

## Features
- Fetch and manage merger data
- Calculate the spread between current stock prices and buyout offers
- Unit tests to ensure reliability and correctness

## Project Structure
```
merger-arbitrage-monitor
├── src
│   ├── app.ts
│   ├── services
│   │   ├── merger-data.service.ts
│   │   └── price-calculator.service.ts
│   ├── models
│   │   └── merger-deal.ts
│   └── utils
│       └── spread-calculator.ts
├── tests
│   └── unit
│       ├── merger-data.test.ts
│       └── spread-calculator.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd merger-arbitrage-monitor
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Run the application:
   ```
   npm start
   ```

## Usage
- The application will start and listen for incoming requests.
- Use the provided endpoints to fetch merger data and calculate spreads.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.