import express, { Request, Response } from 'express';
import cors from 'cors';
import { MergerDataService } from './services/merger-data.service';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const mergerService = new MergerDataService();

app.get('/api/mergers', async (req: Request, res: Response) => {
    try {
        const mergers = await mergerService.getMergerDetails();
        console.log('Sending mergers:', mergers);
        res.json(mergers);
    } catch (error) {
        console.error('Error fetching merger details:', error);
        res.status(500).json({ error: 'Failed to fetch merger details' });
    }
});

app.post('/api/mergers', (req, res) => {
    mergerService.addMergerDeal(req.body);
    res.status(201).json({ message: 'Deal added successfully' });
});

app.put('/api/mergers/:id', (req, res) => {
    mergerService.updateMergerDeal(req.params.id, req.body);
    res.json({ message: 'Deal updated successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});