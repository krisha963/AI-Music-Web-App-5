song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";
function preload(){
    song1 = loadSound("Into the unknown.mp3");
    song2 = loadSound("Harry_Potter");
}
function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on("pose", gotPoses);
}
function draw(){
    image(video, 0, 0, 500, 500);
    fill("red");
    stroke("red");
    song1_status = song1.isPlaying();
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    }
    if(song1_status == false){
        song1.play();
        document.getElementById("song").innerHTML = "Song = " + song1;
    }
    song2_status = song2.isPlaying();
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
    }
    if(song2_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "Song = " + song2;
    }
}
function play(){
    song1.play();
    song2.play();
}
function modelLoaded(){
    console.log("Posenet Is Initialised");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}