from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/instructions', methods=['POST'])
def instructions():
    data = request.get_json()
    # ...process data as needed...
    return jsonify({"message": "Instructions received", "data": data}), 200

@app.route('/velocity', methods=['POST'])
def velocity():
    data = request.get_json()
    # ...process data as needed...
    return jsonify({"message": "Velocity received", "data": data}), 200

if __name__ == '__main__':
    app.run(debug=True)
