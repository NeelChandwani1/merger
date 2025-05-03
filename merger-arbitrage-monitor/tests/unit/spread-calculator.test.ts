import { calculateSpread } from '../../src/utils/spread-calculator';

describe('calculateSpread', () => {
    it('should return the correct spread for a given current price and buyout offer', () => {
        const currentPrice = 100;
        const buyoutOffer = 120;
        const expectedSpread = 20;

        const result = calculateSpread(currentPrice, buyoutOffer);
        expect(result).toBe(expectedSpread);
    });

    it('should return zero when current price equals buyout offer', () => {
        const currentPrice = 100;
        const buyoutOffer = 100;
        const expectedSpread = 0;

        const result = calculateSpread(currentPrice, buyoutOffer);
        expect(result).toBe(expectedSpread);
    });

    it('should return a negative spread when current price is greater than buyout offer', () => {
        const currentPrice = 130;
        const buyoutOffer = 120;
        const expectedSpread = -10;

        const result = calculateSpread(currentPrice, buyoutOffer);
        expect(result).toBe(expectedSpread);
    });
});