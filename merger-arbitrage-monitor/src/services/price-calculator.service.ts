export class PriceCalculatorService {
    calculateSpread(currentPrice: number, buyoutOffer: number): number {
        return buyoutOffer - currentPrice;
    }
}