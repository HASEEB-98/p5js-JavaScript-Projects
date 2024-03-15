// Note: The Main Extension Part is Done for Assignment "Instagram Filters". 
// This assignment includes extension work which mentioned in the assignment in "Ideas for Further Development" 

// Commentary for Extension Part in "Ideas for Further Development Section":
// The keyPressed() function is built-in and gets triggered whenever a key is pressed.
// Within keyPressed(), the variable randomIndex is assigned a random integer between 0 and numOfImages - 1 using floor(random(numOfImages)).
// The image() function then displays the image corresponding to the randomly selected index at the top-left corner of the canvas (coordinates 0, 0).
// As a result, when any key is pressed, the displayed picture changes to a randomly chosen one from the array of loaded images.

// Note: In this assignment only empty sketch is given, I wrote the whole code.

// I wrote this code

// Declare an array to store images and a buffer for calculating average image
var imgs = [];
var avgImg;
var numOfImages = 30; // Total number of images
let randomIndex = 0; // Index for selecting a random image

//////////////////////////////////////////////////////////
// Preload function, runs once before setup
function preload() {
    for (let i = 0; i < numOfImages; i++) {
        let filename = `assets/${i}.jpg`; // Construct the filename string
        let img = loadImage(filename); // Load the image
        imgs.push(img); // Store the loaded image in the array
    }
}

//////////////////////////////////////////////////////////
// Setup function, runs once at the beginning
function setup() {
    // Set canvas dimensions based on the width of the first image
    let canvasWidth = imgs[0].width * 2;
    let canvasHeight = imgs[0].height;
    createCanvas(canvasWidth, canvasHeight); // Create the canvas
    avgImg = createGraphics(imgs[0].width, imgs[0].height); // Create a buffer for calculations
    pixelDensity(1); // Set pixel density
}

//////////////////////////////////////////////////////////
// Draw function, continuously executed but with no Loop it will be executed once
function draw() {
    background(125); // Set background color

    randomIndex = floor(random(numOfImages)); // Select a random index
    image(imgs[randomIndex], 0, 0); // Display a random image

    // Loop through all images to load pixel data
    for (let i = 0; i < numOfImages; i++) {
        imgs[i].loadPixels();
    }

    avgImg.loadPixels(); // Load pixel data for the avgImg buffer

    // Loop over all pixels in the first image and calculate average pixel values
    for (let x = 0; x < imgs[0].width; x++) {
        for (let y = 0; y < imgs[0].height; y++) {
            let pixelIndex = (x + y * imgs[0].width) * 4; // Calculate pixel index

            // Converting the avgImg to red color using the pixel value of first image
            avgImg.pixels[pixelIndex] = 255;
            avgImg.pixels[pixelIndex + 1] = 0;
            avgImg.pixels[pixelIndex + 2] = 0;
            avgImg.pixels[pixelIndex + 3] = 255; // Alpha channel

            // Initialize sum variables for R, G, B channels
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;

            // Loop through all images to calculate sum for each channel
            for (let i = 0; i < numOfImages; i++) {
                sumR += imgs[i].pixels[pixelIndex];
                sumG += imgs[i].pixels[pixelIndex + 1];
                sumB += imgs[i].pixels[pixelIndex + 2];
            }

            // Calculate average values
            let avgR = sumR / imgs.length;
            let avgG = sumG / imgs.length;
            let avgB = sumB / imgs.length;

            // Update pixel values in the avgImg buffer
            avgImg.pixels[pixelIndex] = avgR;
            avgImg.pixels[pixelIndex + 1] = avgG;
            avgImg.pixels[pixelIndex + 2] = avgB;
            avgImg.pixels[pixelIndex + 3] = 255; // Alpha channel
        }
    }

    avgImg.updatePixels(); // Update pixel data for avgImg buffer

    // Display the calculated average image
    image(avgImg, imgs[0].width, 0);

    // No need to loop, calculations are done
    noLoop();
}

// Function to handle key press events
function keyPressed() {
    randomIndex = floor(random(numOfImages)); // Select a random index
    image(imgs[randomIndex], 0, 0); // Display a random image
}

// end of code I wrote
