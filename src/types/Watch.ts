export default class Watch {

    private time: number;
    private intervalId: number;
    private running: boolean;

    constructor() {
        this.time = 0;
        this.intervalId = 0;
        this.running = false;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.time++;
        }, 1000);
        this.running = true;
    }

    stop() {
        clearInterval(this.intervalId);
        this.time = 0;
        this.running = false;
    }

    // pause method
    pause() {
        clearInterval(this.intervalId);
        this.running = false;
    }

    // get the time as string in the format "00:00:00"
    getElapsedTimeString() {
        return this.formatTime(this.time);
    }

    // format the time in the format "00:00:00"
    formatTime(time: number) {
        const seconds = Math.floor(time);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return (
            this.pad(hours) + ":" +
            this.pad(minutes % 60) + ":" +
            this.pad(seconds % 60)
        );
    }

    isRunning() {
        return this.running;

    }


    // pad the time with 0 if it is less than 10
    pad(time: number) {
        return time < 10 ? "0" + time : time;
    }

}

