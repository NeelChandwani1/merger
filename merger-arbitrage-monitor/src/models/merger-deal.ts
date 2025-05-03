export interface MergerDeal {
    id: string;
    targetCompany: string;
    acquirerCompany: string;
    announcementDate: Date;
    expectedCloseDate: Date;
    dealValue: number;
    offerPrice: number;
    currentPrice?: number;
    dealType: 'CASH' | 'STOCK' | 'MIXED';
    status: 'PENDING' | 'COMPLETED' | 'TERMINATED';
    exchangeRatio?: number; 
    symbol?: string; 
}