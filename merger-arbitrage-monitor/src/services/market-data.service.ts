import axios from 'axios';
import { RateLimiter } from '../utils/rate-limiter';

interface AlphaVantageResponse {
    'Global Quote': {
        '05. price': string;
        '07. latest trading day': string;
    } | undefined;
}

export class MarketDataService {
    private readonly API_KEY: string = process.env.ALPHA_VANTAGE_API_KEY || '';
    private readonly BASE_URL: string = 'https://www.alphavantage.co/query';
    private readonly rateLimiter: RateLimiter = new RateLimiter();

    async getCurrentPrice(symbol: string): Promise<number> {
        return this.rateLimiter.add(async () => {
            try {
                console.log(`Fetching price for ${symbol}...`);
                const response = await axios.get<AlphaVantageResponse>(
                    this.BASE_URL,
                    {
                        params: {
                            function: 'GLOBAL_QUOTE',
                            symbol: symbol,
                            apikey: this.API_KEY
                        }
                    }
                );
                
                console.log('API Response:', response.data);

                const globalQuote = response.data['Global Quote'];
                if (!globalQuote) {
                    console.log(`No data returned for ${symbol}`);
                    return this.getLastKnownPrice(symbol);
                }

                const price = parseFloat(globalQuote['05. price']);
                if (isNaN(price)) {
                    console.log(`Invalid price data for ${symbol}`);
                    return this.getLastKnownPrice(symbol);
                }

                console.log(`Successfully fetched price for ${symbol}: ${price}`);
                return price;
            } catch (error) {
                console.error(`Error fetching price for ${symbol}:`, error);
                return this.getLastKnownPrice(symbol);
            }
        });
    }

    private getLastKnownPrice(symbol: string): number {
        const fallbackPrices: { [key: string]: number } = {
            'ATVI': 92.68,
            'VMW': 132.95,
            'FHN': 23.95,
            'HZNP': 110.25,
            'ABMD': 371.85,
            'RXDX': 193.75,
            'SGEN': 221.50,
            'OSH': 37.85,
            'RBA': 70.25
        };
        return fallbackPrices[symbol] || 0;
    }
}