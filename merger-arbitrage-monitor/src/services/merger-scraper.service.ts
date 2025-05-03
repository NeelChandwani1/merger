import axios from 'axios';
import * as cheerio from 'cheerio';
import { MergerDeal } from '../models/merger-deal';

interface ScrapedDeal {
    targetCompany: string;
    acquirerCompany: string;
    offerPrice: number;
    announcementDate: string;
    symbol: string;
    sharesOutstanding: number;
    expectedCloseDate: string;
    dealType: 'CASH' | 'STOCK' | 'MIXED';
}

export class MergerScraperService {
    async scrapeMergerDeals(): Promise<MergerDeal[]> {
        try {
            const response = await axios.get('https://example-financial-site.com/mergers');
            const $ = cheerio.load(response.data);
            
            const scrapedDeals: ScrapedDeal[] = [];
            
            $('.merger-deal').each((i, element) => {
                scrapedDeals.push({
                    targetCompany: $(element).find('.target').text(),
                    acquirerCompany: $(element).find('.acquirer').text(),
                    offerPrice: parseFloat($(element).find('.price').text()),
                    announcementDate: $(element).find('.date').text(),
                    symbol: $(element).find('.symbol').text(),
                    sharesOutstanding: parseFloat($(element).find('.shares').text()),
                    expectedCloseDate: $(element).find('.close-date').text(),
                    dealType: $(element).find('.deal-type').text() as 'CASH' | 'STOCK' | 'MIXED'
                });
            });
            
            return scrapedDeals.map((deal): MergerDeal => ({
                id: crypto.randomUUID(),
                targetCompany: deal.targetCompany,
                acquirerCompany: deal.acquirerCompany,
                offerPrice: deal.offerPrice,
                announcementDate: new Date(deal.announcementDate),
                expectedCloseDate: new Date(deal.expectedCloseDate),
                dealValue: deal.offerPrice * deal.sharesOutstanding,
                dealType: deal.dealType,
                status: 'PENDING',
                symbol: deal.symbol
            }));
        } catch (error) {
            console.error('Error scraping merger deals:', error);
            return [];
        }
    }
}