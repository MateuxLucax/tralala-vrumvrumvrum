from flask import Flask, request, jsonify
from flask_cors import CORS
import serial
import time

app = Flask(__name__)
CORS(app)

# Setup serial connection (adjust the port if needed)
SERIAL_PORT = '/dev/ttyUSB0'  # Check with `ls /dev/ttyUSB*` or `dmesg`
BAUD_RATE = 9600

# Try to open serial port
try:
    arduino = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(2)  # Wait for Arduino to reset
    print("Serial connection established.")
except serial.SerialException as e:
    arduino = None
    print(f"Serial connection failed: {e}")

def send_command(command):
    if arduino and arduino.is_open:
        arduino.write((command + '\n').encode('utf-8'))
        return True
    return False

@app.route('/instructions', methods=['POST'])
def instructions():
    data = request.get_json()
    command = data.get('command', '').strip().lower()

    if command not in ['left', 'right', 'forward', 'stop']:
        return jsonify({"error": "Invalid command"}), 400

    if send_command(command):
        return jsonify({"message": "Instruction sent", "command": command}), 200
    else:
        return jsonify({"error": "Failed to send command"}), 500

@app.route('/speed', methods=['POST'])
def speed():
    data = request.get_json()
    speed = data.get('speed')

    if not isinstance(speed, int) or not (0 <= speed <= 255):
        return jsonify({"error": "Speed must be an integer between 0 and 255"}), 400

    if send_command(str(speed)):
        return jsonify({"message": "Speed sent", "speed": speed}), 200
    else:
        return jsonify({"error": "Failed to send speed"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
