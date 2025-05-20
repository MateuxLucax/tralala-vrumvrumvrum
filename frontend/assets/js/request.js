function requestApiLeftRight(est, gesture) {
    fetch('/api/instructions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "command": mappedGestures[gesture],
            "message": "Instruction sent"
        })
    }).catch(err => console.error(err));
}

function requestApiAcceleration(aceleration) {
    fetch('/api/speed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "message": "Speed sent",
            "speed": aceleration
        })
    }).catch(err => console.error(err));
}