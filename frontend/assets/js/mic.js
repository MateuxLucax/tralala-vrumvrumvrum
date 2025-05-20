// This script measures the decibel level from the user's microphone in real time.
// It uses the Web Audio API and displays the decibel level in the console.
// Note: This works in browsers that support getUserMedia and AudioContext.
class DecibelMeter {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.stream = null;
        this.noiseFloor = -100; // to be determined during calibration
        this.updateInterval = null;
        this.running = false;
        // configuration parameters
        this.fftSize = 1024;
        this.calibrationTime = 5_000; // milliseconds
        this.measurementInterval = 100; // ms between calibration samples
        this.dynamicRange = 10; // dB span above noise floor mapped to 0-255
    }

    // Requests permission and initializes audio context & analyser
    async requestMicrophone() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('getUserMedia is not supported in this browser.');
            throw new Error('getUserMedia is not supported');
        }
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = this.fftSize;
            this.analyser.smoothingTimeConstant = 0.8;
            this.microphone = this.audioContext.createMediaStreamSource(this.stream);
            this.microphone.connect(this.analyser);
            this.running = true;
        } catch (err) {
            alert('Error accessing microphone: ' + err.message);
            throw err;
        }
    }

    // Sleeps for ms milliseconds (helper)
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Uses the microphone to calibrate the ambient (noise floor) decibel level
    async calibrate() {
        if (!this.running) {
            await this.requestMicrophone();
        }
        const samples = [];
        const iterations = Math.floor(this.calibrationTime / this.measurementInterval);
        for (let i = 0; i < iterations; i++) {
            await this.sleep(this.measurementInterval);
            const currentDb = this.calculateDecibels();
            samples.push(currentDb);
        }
        // Average the measured decibel levels to determine the noise floor.
        this.noiseFloor = samples.reduce((a, b) => a + b, 0) / samples.length;
    }

    // Computes decibels from the current analyser data using RMS.
    calculateDecibels() {
        if (!this.analyser) return -100;
        const bufferLength = this.analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            // Normalize sample value to [-1, 1]
            const sample = (dataArray[i] - 128) / 128;
            sum += sample * sample;
        }
        const rms = Math.sqrt(sum / bufferLength);
        let decibels = 20 * Math.log10(rms);
        if (!isFinite(decibels)) decibels = -100;
        return decibels;
    }

    // Returns a scaled value (0–255) based on current decibels relative to the noise floor.
    // Any level at the noise floor or below gives 0. Levels above map linearly up to `this.dynamicRange`.
    getScaledDecibels() {
        const currentDb = this.calculateDecibels();
        let dBAboveNoise = currentDb - this.noiseFloor;
        if (dBAboveNoise < 0) dBAboveNoise = 0;
        let scaled = Math.round((dBAboveNoise / this.dynamicRange) * 255);
        if (scaled > 255) scaled = 255;
        return scaled;
    }

    // Starts a loop that calls the provided callback with the current scaled decibel value.
    // The callback gets called every `interval` ms (default 200ms).
    startMeasurement(callback, interval = 200) {
        if (this.updateInterval) clearInterval(this.updateInterval);

        this.updateInterval = setInterval(() => {
            const scaledValue = this.getScaledDecibels();
            if (callback && typeof callback === 'function') {
                callback(scaledValue);
            }
        }, interval);
    }

    // Stops measurement and cleans up the audio context and stream.
    stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.running = false;3
    }
}

// Example usage:
// const meter = new DecibelMeter();
// await meter.requestMicrophone();
// await meter.calibrate();
// meter.startMeasurement(value => {
//     console.log('Scaled value:', value);
// });
