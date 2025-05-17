
function getBareHand() {
    // describe bare hand gesture ✋🏻
    const gesture = new fp.GestureDescription('bare_hand');

    gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

    gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
    gesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);

    gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 1.0);

    gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Ring, fp.FingerDirection.DiagonalUpLeft, 1.0);

    gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpLeft, 1.0);

    return gesture;
}

function getMakeTheL() {
    // describe thumbs down gesture 👆🏻
    const gestures = new fp.GestureDescription('make_l');

    gestures.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
    gestures.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
    gestures.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.9);
    gestures.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.9);

    gestures.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    gestures.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 1.0);
    gestures.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalLeft, 1.0);

    return gestures;
}

function getGunGesture() {
    // describe thumbs down gesture 🔫
    const gesture = new fp.GestureDescription('gun');

    gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

    for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
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
    // describe thumbs down gesture 🖕🏻
    const gesture = new fp.GestureDescription('middle_up');

    gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpLeft, 1.0);
    gesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 1.0);

    for (let finger of [fp.Finger.Index, fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
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

    for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
        gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
        gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
    }

    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1);

    return gesture;
}

function getThumbsUpGesture() {
    // describe thumbs down gesture 👍🏻
    const gesture = new fp.GestureDescription('thumbs_up');

    gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
    gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

    for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
        gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
        gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
    }

    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1);

    return gesture;
}
