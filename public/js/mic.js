// This script measures the decibel level from the user's microphone in real time.
// It uses the Web Audio API and displays the decibel level in the console.
// Note: This works in browsers that support getUserMedia and AudioContext.
const voiceMaxDb = 110;
let decibelMeter = {
    audioContext: null,
    analyser: null,
    microphone: null,
    scriptProcessor: null,
    stream: null,
    running: false,
    calibrating: false,
    calibratedOffset: parseFloat(localStorage.getItem('calibratedOffset')) || 0,



    async start() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('getUserMedia is not supported in this browser.');
            return;
        }
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.microphone = this.audioContext.createMediaStreamSource(this.stream);
            this.scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);

            this.analyser.smoothingTimeConstant = 0.8;
            this.analyser.fftSize = 1024;

            this.microphone.connect(this.analyser);
            // Remove the default onaudioprocess usage:
            // this.analyser.connect(this.scriptProcessor);
            // this.scriptProcessor.connect(this.audioContext.destination);
            // this.scriptProcessor.onaudioprocess = ...

            // Use setInterval to update every 500 ms
            let calibrationSum = 0;
            let calibrationCount = 0;
            let limitDb = voiceMaxDb - this.calibratedOffset;

            // Use setInterval to update every 500 ms
            this.updateInterval = setInterval(() => {
                const bufferLength = this.analyser.fftSize;
                const dataArray = new Uint8Array(bufferLength);
                this.analyser.getByteTimeDomainData(dataArray);

                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    const normalized = (dataArray[i] - 128) / 128;
                    sum += normalized * normalized;
                }
                const rms = Math.sqrt(sum / bufferLength);

                // Convert RMS to decibels (dB)
                let decibels = 20 * Math.log10(rms);
                if (decibels === -Infinity) {
                    decibels = -100;
                }

                // During the first 5 seconds, accumulate for calibration
                if (this.calibrating) {
                    calibrationSum += decibels;
                    calibrationCount++;
                    return;
                }

                // Apply the calibrated offset after the first 5 seconds
                const adjustedDecibels = (decibels + this.calibratedOffset).toFixed(1);
                let velocity = 0;
                if (adjustedDecibels > limitDb) {
                    velocity = 100;
                } else if(adjustedDecibels < 0) {
                    velocity = 0;
                } else {
                    velocity = Math.round((adjustedDecibels / limitDb) * 255);
                }
                // console.log('Decibels:', adjustedDecibels, 'dB');
                // console.log('Calibrated Offset:', this.calibratedOffset);
                document.getElementById('status').textContent = adjustedDecibels + ' dB';
                document.getElementById('velocity').textContent = velocity;

                requestApiAcceleration(velocity)
            }, 200);

            this.running = true;
            if (!this.calibrating) return;

            setTimeout(() => {
                if (calibrationCount > 0) {
                    const averageDb = calibrationSum / calibrationCount;
                    calibratedOffset = -averageDb; // Shift reading so the average becomes zero
                }
                // calibratedOffset += 5;
                console.log('Calibration complete. Offset:', calibratedOffset);
                localStorage.setItem('calibratedOffset', calibratedOffset);
                this.stop();
                this.calibrating = false;
                document.getElementById('calibrationStatus').textContent = 'Calibração Terminada';
                setTimeout(() => {
                    window.location.replace ("../control");
                }, 2000);
            }, 5000);

            
        } catch (err) {
            alert('Error accessing microphone: ' + err.message);
        }
    },

    calibrate() {
        const answer = confirm('Quer subsituir a calibração?');
        if (!answer) {
            document.getElementById('calibrationStatus').textContent = 'Calibração cancelada.';
            window.location.replace ("../control");
            return;
        }
        document.getElementById('calibrationStatus').textContent = 'Calibração Iniciada...';
        this.calibrating = true;
        this.start();
    }, 

    stop() {
        // Clear the interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }

        // Disconnect the scriptProcessor if needed
        if (this.scriptProcessor) {
            this.scriptProcessor.disconnect();
            this.scriptProcessor.onaudioprocess = null;
            this.scriptProcessor = null;
        }
        if (this.analyser) {
            this.analyser.disconnect();
            this.analyser = null;
        }
        if (this.microphone) {
            this.microphone.disconnect();
            this.microphone = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.running = false;
        console.log('Decibel meter stopped.');
    }
};
