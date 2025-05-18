let mappedGestures = [];

function randomize() {
    let gestureRandomized = [...Object.values(gestureStrings)];
    gestureRandomized.sort(() => Math.random() - 0.5);

    mappedGestures[gestureRandomized[0]] = 'left';
    mappedGestures[gestureRandomized[1]] = 'right';
    mappedGestures[gestureRandomized[2]] = 'stop'; 
    mappedGestures[gestureRandomized[3]] = 'forward';

    return gestureRandomized;
}