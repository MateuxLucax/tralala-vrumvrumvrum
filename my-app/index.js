
function getBareHand() {
    // describe bare hand gesture ✋🏻
    const gesture = new fp.GestureDescription('bare_hand');

    for (let finger of [fp.Finger.Index, fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
        gesture.addCurl(finger, finger.NoCurl, 1.0);
        gesture.addDirection(finger, finger.VerticalUp, 1.0);
        gesture.addDirection(finger, finger.DiagonalUpLeft, 1.0);
        gesture.addDirection(finger, finger.DiagonalUpRight, 1.0);
        gesture.addDirection(finger, finger.HorizontalLeft, 1.0);
        gesture.addDirection(finger, finger.HorizontalRight, 1.0);
    }

    return gesture;
}

function getGunGesture() {
    // describe gun gesture 🔫
    const gesture = new fp.GestureDescription('gun');

    gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

    for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
        gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
        gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
    }

    gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.9);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.9);

    return gesture;
}

function getMiddleUpGesture() {
    // describe middle up gesture 🖕🏻
    const gesture = new fp.GestureDescription('middle_up');

    gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);

    for(let finger of [fp.Finger.Index, fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
        gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
        gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
    }

    return gesture;
}

function getThumbsDownGesture() {
    // describe thumbs down gesture 👎🏻
    const gesture = new fp.GestureDescription('thumbs_down');

    gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.9);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);

    for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
        gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
        gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
    }

    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 1.0);

    return gesture;
}

function getThumbsUpGesture() {
    // describe thumbs down gesture 👍🏻
    const gesture = new fp.GestureDescription('thumbs_up');

    gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

    for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
        gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
        gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
    }

    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.6);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 0.6);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 0.6);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.6);

    return gesture;
}

const config = {
    video: { width: 640, height: 480, fps: 30 }
}

const landmarkColors = {
    thumb: 'red',
    index: 'blue',
    middle: 'yellow',
    ring: 'green',
    pinky: 'pink',
    wrist: 'white'
}

const gestureStrings = {
    'thumbs_up': '👍',
    'victory': '✌🏻',
    'thumbs_down': '👎',
    'middle_up': '🖕🏻',
    'gun': '🔫',
    'bare_hand': '✋🏻'
}

async function createDetector() {
    return window.handPoseDetection.createDetector(
        window.handPoseDetection.SupportedModels.MediaPipeHands,
        {
            runtime: "mediapipe",
            modelType: "full",
            maxHands: 2,
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`,
        }
    )
}

async function main() {
    const video = document.querySelector("#pose-video")
    const canvas = document.querySelector("#pose-canvas")
    const ctx = canvas.getContext("2d")

    const resultLayer = {
        right: document.querySelector("#pose-result-right"),
        left: document.querySelector("#pose-result-left")
    }

    const knownGestures = [
        fp.Gestures.VictoryGesture,
        getThumbsUpGesture(),
        getThumbsDownGesture(),
        getMiddleUpGesture(),
        getGunGesture(),
        getBareHand()
    ]

    const GE = new fp.GestureEstimator(knownGestures)

    // load handpose model
    const detector = await createDetector()
    console.log("mediaPose model loaded")

    // main estimation loop
    const estimateHands = async () => {
        // clear canvas overlay
        ctx.clearRect(0, 0, config.video.width, config.video.height)
        resultLayer.right.innerText = ''
        resultLayer.left.innerText = ''

        // get hand landmarks from video
        const hands = await detector.estimateHands(video, {
            flipHorizontal: true
        })

        for (const hand of hands) {
            for (const keypoint of hand.keypoints) {
                const name = keypoint.name.split('_')[0].toString().toLowerCase()
                const color = landmarkColors[name]
                drawPoint(ctx, keypoint.x, keypoint.y, 3, color)
            }

            const est = GE.estimate(hand.keypoints3D, 9)
            const chosenHand = hand.handedness.toLowerCase()
            updateDebugInfo(est.poseData, chosenHand)

            if (est.gestures.length > 0) {
                
                // find gesture with highest match score
                let result = est.gestures.reduce((p, c) => {
                    return (p.score > c.score) ? p : c
                })
                
                // const chosenHand = hand.handedness.toLowerCase()
                updateDebugInfo(est.poseData, chosenHand)
                resultLayer[chosenHand].innerText = gestureStrings[result.name]
                
            }
        }
        // ...and so on
        setTimeout(() => { estimateHands() }, 1000 / config.video.fps)
    }

    estimateHands()
    console.log("Starting predictions")
}

async function initCamera(width, height, fps) {
    const constraints = {
        audio: false,
        video: {
            facingMode: "user",
            width: width,
            height: height,
            frameRate: { max: fps }
        }
    }

    const video = document.querySelector("#pose-video")
    video.width = width
    video.height = height

    // get video stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    video.srcObject = stream

    return new Promise(resolve => {
        video.onloadedmetadata = () => { resolve(video) }
    })
}

function drawPoint(ctx, x, y, r, color) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
}

function updateDebugInfo(data, hand) {
    const summaryTable = `#summary-${hand}`
    for (let fingerIdx in data) {
        document.querySelector(`${summaryTable} span#curl-${fingerIdx}`).innerHTML = data[fingerIdx][1]
        document.querySelector(`${summaryTable} span#dir-${fingerIdx}`).innerHTML = data[fingerIdx][2]
    }
}

window.addEventListener("DOMContentLoaded", () => {
    initCamera(
        config.video.width, config.video.height, config.video.fps
    ).then(video => {
        video.play()
        video.addEventListener("loadeddata", event => {
            console.log("Camera is ready")
            main()
        })
    })

    const canvas = document.querySelector("#pose-canvas")
    canvas.width = config.video.width
    canvas.height = config.video.height
    console.log("Canvas initialized")
});