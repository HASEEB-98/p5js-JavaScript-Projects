var video;
var prevImg;
var diffImg;
var currImg;
var thresholdSlider;
var threshold;
// I wrote this code
let grid;
// end of the code I wrote

function setup() {
    createCanvas(640 * 2, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.hide();

    thresholdSlider = createSlider(0, 255, 50);
    thresholdSlider.position(20, 20);
}

function draw() {
    background(0);
    image(video, 0, 0);

    // I wrote this code

    // Initializing grid variable
    grid = new Grid(640, 480);

    // end of the code I worte

    currImg = createImage(video.width, video.height);
    currImg.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

    // I wrote this code

    // resizing cuurImg to the quater of original image
    currImg.resize(video.width/4, video.height/4)
    // applying blur filter with 3 iteration on the currImg to reduce activation
    currImg.filter(BLUR, 3);

    // end of the code I worte

    diffImg = createImage(video.width, video.height);
    diffImg.loadPixels();
    
    // I worte this code
    // resizing diffImg to the quater of original image.
    diffImg.resize(video.width/4, video.height/4)

    // end of the code I worte

    threshold = thresholdSlider.value();

    if (typeof prevImg !== 'undefined') {
        prevImg.loadPixels();
        currImg.loadPixels();
        for (var x = 0; x < currImg.width; x += 1) {
            for (var y = 0; y < currImg.height; y += 1) {
                var index = (x + (y * currImg.width)) * 4;
                var redSource = currImg.pixels[index + 0];
                var greenSource = currImg.pixels[index + 1];
                var blueSource = currImg.pixels[index + 2];

                var redBack = prevImg.pixels[index + 0];
                var greenBack = prevImg.pixels[index + 1];
                var blueBack = prevImg.pixels[index + 2];

                var d = dist(redSource, greenSource, blueSource, redBack, greenBack, blueBack);

                if (d > threshold) {
                    diffImg.pixels[index + 0] = 0;
                    diffImg.pixels[index + 1] = 0;
                    diffImg.pixels[index + 2] = 0;
                    diffImg.pixels[index + 3] = 255;
                } else {
                    diffImg.pixels[index + 0] = 255;
                    diffImg.pixels[index + 1] = 255;
                    diffImg.pixels[index + 2] = 255;
                    diffImg.pixels[index + 3] = 255;
                }
            }
        }
    }
    diffImg.updatePixels();
    image(diffImg, 640, 0);

    noFill();
    stroke(255);
    text(threshold, 160, 35);

    // // I wrote this code
    
    // updating the prevImg to save the current snapshot to use as a background
    prevImg = createImage(currImg.width, currImg.height);
    prevImg.copy(currImg, 0, 0, currImg.width, currImg.height, 0, 0, currImg.width, currImg.height);

    // calling run function for grid.
    grid.run(diffImg);

    // end of code I wrote
}
