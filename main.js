song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scorelw = 0;
scorerw = 0;
function setup() {
    Canvas = createCanvas(500, 500);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    poseNet = ml5.poseNet(Video, Modelloaded);
    poseNet.on('pose', Gotresult);

}
function Modelloaded() {
    console.log("poseNet is initialized");
}

function draw() {
    image(Video, 0, 0, 500, 500);
}

function preload() {
    song = loadSound("music.mp3");

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function Gotresult(results) {
    if (results.length > 0) {
        console.log(results);
        scorelw = results[0].pose.keypoints[9].score;
        console.log("Left wrist score =" + scorelw);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        scorerw = results[0].pose.keypoints[10].score;
        console.log("left Wrist x = " + leftWristx + "  left Wrist y =  " + leftWristy);
        console.log("Right Wrist x = " + rightWristx + "  Right Wrist y =  " + rightWristy);

    }
}

function draw() {
    fill("red");
    stroke("black");
    if (scorelw > 0.2) {


        circle(leftWristx, leftWristy, 20);

        v1 = Number(leftWristy);
        v2 = floor(v1);
        v3 = v2 / 500;
        document.getElementById("volume").innerHTML = "Volume =" + v3;
        song.setVolume(v3);
    }
    if (scorerw > 0.2) {
        if (rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed  : 0.5x";
            song.rate(0.5);
        }
        else if (rightWristy > 100 && rightWristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed  : 1x";
            song.rate(1);
        }
        else if (rightWristy > 200 && rightWristy <= 300) {
            document.getElementById("speed").innerHTML = "Speed  : 1.5x";
            song.rate(1.5);
        } else if (rightWristy > 300 && rightWristy <= 400) {
            document.getElementById("speed").innerHTML = "Speed  : 2x";
            song.rate(2);
        } else if (rightWristy > 400 && rightWristy <= 500) {
            document.getElementById("speed").innerHTML = "Speed  : 2.5x";
            song.rate(2.5);
        }
    }
}
