export abstract class Loop {
    public abstract loop(deltaSeconds: number): void;
    
    public start(): void {
        const lastTimestamp = performance.now();
        const loopFunction  = (timestamp: number) => {
            this.loop((timestamp - lastTimestamp) / 1000);
            window.requestAnimationFrame(loopFunction);
        }
        window.requestAnimationFrame(loopFunction);
    }
}