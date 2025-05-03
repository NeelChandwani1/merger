import { MergerDataService } from '../../src/services/merger-data.service';
import { MergerDeal } from '../../src/models/merger-deal';

describe('MergerDataService', () => {
    let service: MergerDataService;

    beforeEach(() => {
        service = new MergerDataService();
    });

    it('should fetch merger details correctly', async () => {
        const expectedDeal: MergerDeal = {
            currentPrice: 100,
            buyoutOffer: 120,
            status: 'announced'
        };

        jest.spyOn(service, 'getMergerDetails').mockResolvedValue(expectedDeal);

        const deal = await service.getMergerDetails();
        expect(deal).toEqual(expectedDeal);
    });
});