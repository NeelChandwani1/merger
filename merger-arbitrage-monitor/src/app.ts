import express from 'express';
import { MergerDataService } from './services/merger-data.service';
import { PriceCalculatorService } from './services/price-calculator.service';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const mergerDataService = new MergerDataService();
const priceCalculatorService = new PriceCalculatorService();

app.get('/mergers', async (req, res) => {
    try {
        const mergers = await mergerDataService.getMergerDetails();
        res.json(mergers);
    } catch (error) {
        res.status(500).send('Error fetching merger details');
    }
});

app.post('/calculate-spread', (req, res) => {
    const { currentPrice, buyoutOffer } = req.body;
    const spread = priceCalculatorService.calculateSpread(currentPrice, buyoutOffer);
    res.json({ spread });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});