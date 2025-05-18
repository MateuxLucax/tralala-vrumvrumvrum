function requestApiLeftRight(est, gesture) {
    body = {
        "command": mappedGestures[gesture],
        "message": "Instruction sent"
    }
    fetch('http://127.0.0.1:5000/instructions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}

function requestApiAcceleration(aceleration) {
    body = {
        "message": "Speed sent",
        "speed": aceleration
    }
    fetch('http://127.0.0.1:5000/speed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}