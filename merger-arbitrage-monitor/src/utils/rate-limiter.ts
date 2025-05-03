export class RateLimiter {
    private queue: Array<() => Promise<any>> = [];
    private processing = false;
    private lastCallTime = 0;
    private readonly minDelay = 12000;

    async add<T>(fn: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await fn();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
            
            if (!this.processing) {
                this.processQueue();
            }
        });
    }

    private async processQueue() {
        if (this.queue.length === 0) {
            this.processing = false;
            return;
        }

        this.processing = true;
        const now = Date.now();
        const delay = Math.max(0, this.lastCallTime + this.minDelay - now);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        const fn = this.queue.shift();
        if (fn) {
            this.lastCallTime = Date.now();
            await fn();
        }

        await this.processQueue();
    }
}