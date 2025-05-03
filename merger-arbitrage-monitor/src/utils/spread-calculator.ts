export function calculateSpread(currentPrice: number, buyoutOffer: number): number {
    return buyoutOffer - currentPrice;
}