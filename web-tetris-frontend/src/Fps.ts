class Fps {

    private container: HTMLElement;
    private frames: number[] = [];
    private lastFrameTimeStamp: number = performance.now();

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public render() {
        // Convert the delta time since the last frame render into a measure
        // of frames per second.
        const now = performance.now();
        const delta = now - this.lastFrameTimeStamp;
        this.lastFrameTimeStamp = now;
        const fps = (1 / delta) * 1000;

        // Save only the latest 100 timings.
        this.frames.push(fps);
        if (this.frames.length > 100) {
        this.frames.shift();
        }

        // Find the max, min and mean of our 100 latest timings.
        let min = Infinity;
        let max = -Infinity;
        let sum = 0;
        for (const frame of this.frames) {
            sum += frame;
            min = Math.min(frame, min);
            max = Math.max(frame, max);
        }
        const mean = sum / this.frames.length;

        // Render the statistics.
        this.container.textContent = `
                Frames per Second:
                    latest = ${Math.round(fps)}
                    avg of last 100 = ${Math.round(mean)}
                    min of last 100 = ${Math.round(min)}
                    max of last 100 = ${Math.round(max)}
            `.trim();
    }
}

export default Fps;
