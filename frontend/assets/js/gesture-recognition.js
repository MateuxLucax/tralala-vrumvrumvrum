

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
    'thumbs_up': '👍🏻',
    'victory': '✌🏻',
    'thumbs_down': '👎🏻',
    'middle_up': '🖕🏻',
    'gun': '🔫',
    'bare_hand': '✋🏻',
    'make_l': '👆🏻'
}

async function main() {
    let lastDirection = 'stop'
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
        getBareHand(),
        getMakeTheL()
    ]

    const GE = new fp.GestureEstimator(knownGestures)

    // load handpose model
    const detector = await createDetector()

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

            if (est.gestures.length > 0) {
                // find gesture with highest match score
                let result = est.gestures.reduce((p, c) => {
                    return (p.score > c.score) ? p : c
                })

                resultLayer[chosenHand].innerText = gestureStrings[result.name]
                const newGesture = result.name
                if (lastDirection !== newGesture) {
                    requestApiLeftRight(est, gestureStrings[result.name])
                    lastDirection = newGesture
                }
            }
        }
        // ...and so on
        setTimeout(() => { estimateHands() }, 500)
    }

    estimateHands()
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
            main()
        })
    })

    const canvas = document.querySelector("#pose-canvas")
    canvas.width = config.video.width
    canvas.height = config.video.height
});