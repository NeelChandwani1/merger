import { MergerDeal } from '../models/merger-deal';
import { MarketDataService } from './market-data.service';
import { MergerScraperService } from './merger-scraper.service';

export class MergerDataService {
    private mergerDeals: MergerDeal[] = [];
    private marketDataService: MarketDataService;
    private mergerScraperService: MergerScraperService;

    constructor() {
        this.marketDataService = new MarketDataService();
        this.mergerScraperService = new MergerScraperService();
        this.initializeSampleData();
    }

    private initializeSampleData(): void {
        this.mergerDeals = [
            {
                id: '1',
                targetCompany: 'Activision Blizzard',
                acquirerCompany: 'Microsoft',
                announcementDate: new Date('2022-01-18'),
                expectedCloseDate: new Date('2025-10-18'),
                dealValue: 69000000000,
                offerPrice: 95.00,
                currentPrice: 92.68,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'ATVI'
            },
            {
                id: '2',
                targetCompany: 'VMware',
                acquirerCompany: 'Broadcom',
                announcementDate: new Date('2022-05-26'),
                expectedCloseDate: new Date('2025-12-31'),
                dealValue: 61000000000,
                offerPrice: 142.50,
                currentPrice: 132.95,
                dealType: 'MIXED',
                status: 'PENDING',
                symbol: 'VMW'
            },
            {
                id: '3',
                targetCompany: 'First Horizon',
                acquirerCompany: 'TD Bank',
                announcementDate: new Date('2022-02-28'),
                expectedCloseDate: new Date('2025-11-27'),
                dealValue: 13400000000,
                offerPrice: 25.00,
                currentPrice: 23.95,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'FHN'
            },
            {
                id: '4',
                targetCompany: 'Horizon Therapeutics',
                acquirerCompany: 'Amgen',
                announcementDate: new Date('2022-12-12'),
                expectedCloseDate: new Date('2025-12-15'),
                dealValue: 27800000000,
                offerPrice: 116.50,
                currentPrice: 110.25,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'HZNP'
            },
            {
                id: '5',
                targetCompany: 'Abiomed',
                acquirerCompany: 'Johnson & Johnson',
                announcementDate: new Date('2024-11-01'),
                expectedCloseDate: new Date('2025-12-31'),
                dealValue: 16600000000,
                offerPrice: 380.00,
                currentPrice: 371.85,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'ABMD'
            },
            {
                id: '6',
                targetCompany: 'Prometheus Biosciences',
                acquirerCompany: 'Merck',
                announcementDate: new Date('2024-04-16'),
                expectedCloseDate: new Date('2025-09-30'),
                dealValue: 10800000000,
                offerPrice: 200.00,
                currentPrice: 193.75,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'RXDX'
            },
            {
                id: '7',
                targetCompany: 'Seagen',
                acquirerCompany: 'Pfizer',
                announcementDate: new Date('2024-03-13'),
                expectedCloseDate: new Date('2025-12-31'),
                dealValue: 43000000000,
                offerPrice: 229.00,
                currentPrice: 221.50,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'SGEN'
            },
            {
                id: '8',
                targetCompany: 'Oak Street Health',
                acquirerCompany: 'CVS Health',
                announcementDate: new Date('2024-02-08'),
                expectedCloseDate: new Date('2025-11-30'),
                dealValue: 10600000000,
                offerPrice: 39.00,
                currentPrice: 37.85,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'OSH'
            },
            {
                id: '9',
                targetCompany: 'Ritchie Bros. Auctioneers',
                acquirerCompany: 'IAA Inc',
                announcementDate: new Date('2024-01-23'),
                expectedCloseDate: new Date('2025-12-01'),
                dealValue: 7300000000,
                offerPrice: 73.50,
                currentPrice: 70.25,
                dealType: 'MIXED',
                status: 'PENDING',
                symbol: 'RBA'
            },
            {
                id: '10',
                targetCompany: 'Duck Creek Technologies',
                acquirerCompany: 'Vista Equity',
                announcementDate: new Date('2024-01-09'),
                expectedCloseDate: new Date('2025-10-15'),
                dealValue: 2600000000,
                offerPrice: 19.00,
                currentPrice: 18.45,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'DCT'
            },
            {
                id: '11',
                targetCompany: 'Illumina',
                acquirerCompany: 'Roche Holdings',
                announcementDate: new Date('2025-02-15'),
                expectedCloseDate: new Date('2026-03-31'),
                dealValue: 47000000000,
                offerPrice: 325.00,
                currentPrice: 298.75,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'ILMN'
            },
            {
                id: '12',
                targetCompany: 'Splunk',
                acquirerCompany: 'Cisco Systems',
                announcementDate: new Date('2024-09-21'),
                expectedCloseDate: new Date('2025-12-31'),
                dealValue: 28000000000,
                offerPrice: 157.00,
                currentPrice: 148.90,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'SPLK'
            },
            {
                id: '13',
                targetCompany: 'Alteryx',
                acquirerCompany: 'Clearlake Capital',
                announcementDate: new Date('2024-12-18'),
                expectedCloseDate: new Date('2025-11-30'),
                dealValue: 4400000000,
                offerPrice: 48.25,
                currentPrice: 46.80,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'AYX'
            },
            {
                id: '14',
                targetCompany: 'Chindata Group',
                acquirerCompany: 'Bain Capital',
                announcementDate: new Date('2024-10-15'),
                expectedCloseDate: new Date('2025-09-30'),
                dealValue: 3160000000,
                offerPrice: 8.75,
                currentPrice: 8.45,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'CD'
            },
            {
                id: '15',
                targetCompany: 'Mirati Therapeutics',
                acquirerCompany: 'Bristol Myers Squibb',
                announcementDate: new Date('2024-10-08'),
                expectedCloseDate: new Date('2025-12-15'),
                dealValue: 5800000000,
                offerPrice: 58.00,
                currentPrice: 56.25,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'MRTX'
            },
            {
                id: '16',
                targetCompany: 'Spirit Airlines',
                acquirerCompany: 'JetBlue Airways',
                announcementDate: new Date('2024-07-28'),
                expectedCloseDate: new Date('2025-11-30'),
                dealValue: 3800000000,
                offerPrice: 33.50,
                currentPrice: 30.75,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'SAVE'
            },
            {
                id: '17',
                targetCompany: 'Radius Global',
                acquirerCompany: 'Goldman Sachs',
                announcementDate: new Date('2025-01-15'),
                expectedCloseDate: new Date('2025-12-31'),
                dealValue: 2700000000,
                offerPrice: 16.25,
                currentPrice: 15.80,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'RDUS'
            },
            {
                id: '18',
                targetCompany: 'Coherent Corp',
                acquirerCompany: 'Samsung Electronics',
                announcementDate: new Date('2025-03-01'),
                expectedCloseDate: new Date('2026-01-31'),
                dealValue: 11500000000,
                offerPrice: 75.00,
                currentPrice: 71.25,
                dealType: 'CASH',
                status: 'PENDING',
                symbol: 'COHR'
            }
        ];
    }

    async getMergerDetails(): Promise<MergerDeal[]> {
        try {
            await this.updateCurrentPrices();
        } catch (error) {
            console.log('Could not update prices, using cached data');
        }
        return this.mergerDeals;
    }

    private async updateCurrentPrices(): Promise<void> {
        for (const deal of this.mergerDeals) {
            try {
                if (deal.symbol) {
                    const price = await this.marketDataService.getCurrentPrice(deal.symbol);
                    deal.currentPrice = price || deal.currentPrice;
                }
            } catch (error) {
                console.error(`Failed to update price for ${deal.symbol}`, error);
            }
        }
    }

    public addMergerDeal(deal: MergerDeal): void {
        this.mergerDeals.push(deal);
    }

    public updateMergerDeal(dealId: string, updatedDeal: MergerDeal): void {
        const index = this.mergerDeals.findIndex(deal => deal.id === dealId);
        if (index !== -1) {
            this.mergerDeals[index] = updatedDeal;
        }
    }

    async updateMergerDeals(): Promise<void> {
        try {
            const scrapedDeals = await this.mergerScraperService.scrapeMergerDeals();
            
            for (const deal of this.mergerDeals) {
                deal.currentPrice = await this.marketDataService.getCurrentPrice(deal.targetCompany);
            }

            this.mergerDeals = [...this.mergerDeals, ...scrapedDeals];
        } catch (error) {
            console.error('Error updating merger deals:', error);
        }
    }
}