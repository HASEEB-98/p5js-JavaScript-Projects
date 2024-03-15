// Commentary for Extension Work:

// Following work is done for Assignment 3- Instagram Filter:

// 1: Option to Upload Image:
// User can upload the image of their choice from their system. 
// If the uploaded file is not image, the default image will be shown and message is shown on console "Please upload an image file"

// 2: Option to Dowmload Filtered Image:
// User can download the filtered image.
// Once user applied filtered on their image, they have the option to download the filter image. 
// The name of the downloaded image is the same as the name of imahe user uploaded along with filtered_ at start to distinguish it.

// 3: Option to change the Filter
// Other than Default filter which is the requirement of the Assignment I have introduced 4 more filters
// Those filters are:
// Brightness: THis filter will increase the brightness of image.
// Inverted: This filter will invert the image
// Sharpen: This filter will sharpen the image
// Threshold: This filter will apply threshold on image.
// In above filters, Brightness and Threshold filters are those where we need to apply loop on image in draw function as we need continuos processing.
// Although on Default filter which is earlyBirdFilter we apply loop whenever mouse is pressed.
// In Inverted and Sharpen filter we don't need loop as we compute their value only once.

// 4: How to Change Filter:
// I have provided two option to change the filter apply on the image.
// First one: Dropdown => user can select the filter based on the oprion the chosse from the dropdown
// Second one: Key Pressed => user can press key to change the filter.
// The Key to Filter relation is given below:
// Pressed 'd': Default (earlyBirdFilter)
// Pressed 'b': Brightness
// Pressed 'i': Inverted
// Pressed 's': Sharpen
// Pressed 't': Threshold

// 5: Added label and styling:
// Label added to distinguish between original and filtered image.
// Label added for all the buttons and dropdown introduced
// Style added for dropdown, buttons for upload and dropdown

// 6: Resize the canvas and all the buttons, dropdown and labels
// Whenever user upload new image, the whole canvas will be resized based on the width and height of the uploaded image.


// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg

// Define convolution matrices for filters
let blurMatrix = [
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64]
];

// I wrote this code

let sharpenMatrix = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1]
];

// Declare variables for various UI elements
let uploadedImage;
let filteredImage;
let uploadButton;
let downloadButton;
let imageOptions;
let dropdownLabel;
let imageName;
let thresholdSliderLabel;
let thresholdSlider;
let brightnessSlider;
let brightnessSliderLabel;


// Load the default image in preload function
function preload() {
  imageName = 'husky'
  uploadedImage = loadImage('assets/husky.jpg'); // Default Image
}

// Function to create and style the file upload button
function addUploadButton() {
  uploadButton = createFileInput(handleFile);
  uploadButton.position(0, 0);
  uploadButton.style('font-size', '18px');
  uploadButton.style('padding', '11px');
  uploadButton.style('border', 'none');
  uploadButton.style('background-color', '#f2f2f2');
  uploadButton.style('color', '#333');
  uploadButton.style('border-radius', '5px');
  uploadButton.style('cursor', 'pointer');
}

// Function to create and style the download button
function addDownloadButton() {
  downloadButton = createButton('Download Image');
  downloadButton.position(uploadedImage.width * 2 - 150, 10);
  downloadButton.style('font-size', '18px');
  downloadButton.style('background-color', '#4CAF50');
  downloadButton.style('color', 'white');
  downloadButton.style('border', 'none');
  downloadButton.style('border-radius', '5px');
  downloadButton.style('padding', '5px');
  downloadButton.style('cursor', 'pointer');
  downloadButton.mousePressed(saveImage);
}

// Function to create the filter selection dropdown
function addFilterDropDown() {
  dropdownLabel = createP('Select Filter:');
  dropdownLabel.position(uploadedImage.width + 10, 0);

  imageOptions = createSelect();
  imageOptions.position(uploadedImage.width + 100, 12);
  imageOptions.style('font-size', '18px');
  imageOptions.option('Default (D)', 'D');
  imageOptions.option('Brightness (B)', 'B');
  imageOptions.option('Inverted (I)', 'I');
  imageOptions.option('Threshold (T)', 'T');
  imageOptions.option('Sharpen (S)', 'S');
}

function setup() {
  createCanvas(uploadedImage.width * 2 + 20, uploadedImage.height + 200);

  addUploadButton();
  addFilterDropDown();
  addDownloadButton();

  // Create sliders and labels for threshold and brightness filters (hidden by default)
  thresholdSliderLabel = createP('Threshold:');
  thresholdSliderLabel.position(uploadedImage.width * 2 + 10, 60);
  thresholdSliderLabel.hide();

  thresholdSlider = createSlider(0, 255, 110);
  thresholdSlider.position(uploadedImage.width * 2 + 100, 75);
  thresholdSlider.hide();

  brightnessSliderLabel = createP('Brightness:');
  brightnessSliderLabel.position(uploadedImage.width * 2 + 10, 90);
  brightnessSliderLabel.hide();

  brightnessSlider = createSlider(-255, 255, 0);
  brightnessSlider.position(uploadedImage.width * 2 + 100, 105);
  brightnessSlider.hide();

  imageOptions.changed(handleOptionChange);
  document.addEventListener('keydown', keyPressed);
}

// Function to determine the selected filter and its corresponding function
function getImageFilter(selectedOption) {
  switch (selectedOption) {
    case 'D':
      return earlyBirdFilter; // Default filter
    case 'I':
      return invertFilter;
    case 'T':
      return thresholdFilter;
    case 'S':
      return sharpenFilter;
    case 'B':
      return brightnessFilter;
    default:
      return function (img) { return img; }; // Default (no change)
  }
}

// Function to handle changes in the selected filter
function handleOptionChange() {
  // Hide sliders by default
  if (thresholdSlider) {
    thresholdSliderLabel.hide();
    thresholdSlider.hide();
  }
  if (brightnessSlider) {
    brightnessSliderLabel.hide();
    brightnessSlider.hide()
  }

  // Show sliders based on selected filter
  if (imageOptions.value() === 'T') {
    thresholdSliderLabel.show()
    thresholdSlider.show();
  }
  if (imageOptions.value() === 'B') {
    brightnessSliderLabel.show();
    brightnessSlider.show()
  }
  redraw();
}

function draw() {
  background(255);

  // Display original and filtered images side by side
  image(uploadedImage, 0, 50);
  filteredImage = getImageFilter(imageOptions.value())(uploadedImage);
  image(filteredImage, uploadedImage.width + 20, 50);

  // Display labels for original and filtered images
  fill(0);
  textSize(18);
  textAlign(CENTER);
  text('Original Image', uploadedImage.width / 2, uploadedImage.height + 80);
  text('Filtered Image', uploadedImage.width * 1.5 + 20, uploadedImage.height + 80);

  // Pause looping if the selected filter is 'd'
  if (['D', 'I', 'S'].includes(imageOptions.value())) { noLoop(); }
}

// Function to handle keyboard shortcuts for selecting filters
function keyPressed(event) {
  if (event.type === 'keydown') {
    switch (event.key) {
      case 'd':
        if (imageOptions.value() !== 'D') {
          imageOptions.value('D');
        }
        break;
      case 'i':
        if (imageOptions.value() !== 'I') {
          imageOptions.value('I');
        }
        break;
      case 't':
        if (imageOptions.value() !== 'T') {
          imageOptions.value('T');
        }
        break;
      case 'c':
        if (imageOptions.value() !== 'C') {
          imageOptions.value('C');
        }
        break;
      case 's':
        if (imageOptions.value() !== 'S') {
          imageOptions.value('S');
        }
        break;
      case 'b':
        if (imageOptions.value() !== 'B') {
          imageOptions.value('B');
        }
        break;
      default:
        break;
    }
    handleOptionChange();
  }
}

// Function to resume looping when the mouse is pressed
function mousePressed() {
  if (imageOptions.value() === 'D') {
    loop();
  }
}

// Function to handle file upload
function handleFile(file) {
  if (file.type === 'image') {
    uploadedImage = loadImage(file.data, imageLoaded);
    imageName = file.name;
  } else {
    console.log('Please upload an image file.');
  }
}

// Function to save the filtered image
function saveImage() {
  save(filteredImage, `filtered_${imageName}_image.jpg`);
}

// Function to handle image loading and resize canvas
function imageLoaded() {
  resizeCanvas(uploadedImage.width * 2 + 20, uploadedImage.height + 200); // Resize canvas to match the uploaded image

  // Update the positions of UI elements
  uploadButton.position(0, 0);
  downloadButton.position(uploadedImage.width * 2 - 150, 10);
  dropdownLabel.position(uploadedImage.width + 10, 0);
  imageOptions.position(uploadedImage.width + 100, 12);

  redraw();
}

// end of code I wrote

// Function for the Early Bird filter
function earlyBirdFilter(img) {
  let resultImg = createImage(img.width, img.height);
  resultImg = sepiaFilter(img);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}

// Function for the Sepia filter
function sepiaFilter(img) {
  imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for (let x = 0; x < imgOut.width; x++) {
    for (let y = 0; y < imgOut.height; y++) {

      let index = (x + y * imgOut.width) * 4;

      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      // I wrote this code

      imgOut.pixels[index + 0] = r * 0.393 + g * .769 + b * .189;
      imgOut.pixels[index + 1] = r * 0.349 + g * .686 + b * .168;;
      imgOut.pixels[index + 2] = r * 0.272 + g * .534 + b * .131;

      // end of code I wrote

      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

// Function for the Dark Corners filter
function darkCorners(img) {
  let imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  let centerX = img.width / 2;
  let centerY = img.height / 2;

  for (let x = 0; x < imgOut.width; x++) {
    for (let y = 0; y < imgOut.height; y++) {

      let index = (x + y * imgOut.width) * 4;

      // I wrote this code

      let dx = centerX - x;
      let dy = centerY - y;
      let distance = sqrt(dx * dx + dy * dy);

      let dynLum;
      if (distance < 300) {
        dynLum = 1;
      } else if (distance >= 300 && distance < 450) {
        dynLum = map(distance, 300, 450, 1, 0.4);
      } else {
        dynLum = map(distance, 450, sqrt(centerX * centerX + centerY * centerY), 0.4, 0);
      }
      dynLum = constrain(dynLum, 0, 1);

      imgOut.pixels[index + 0] = img.pixels[index + 0] * dynLum;
      imgOut.pixels[index + 1] = img.pixels[index + 1] * dynLum;
      imgOut.pixels[index + 2] = img.pixels[index + 2] * dynLum;

      // end of code I wrote

      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

// Function for the Radial Blur filter
function radialBlurFilter(img) {
  let imgOut = createImage(img.width, img.height);
  let blurMatrixSize = blurMatrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  for (let x = 0; x < imgOut.width; x++) {
    for (let y = 0; y < imgOut.height; y++) {

      let index = (x + y * imgOut.width) * 4;

      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let c = blurConvolution(x, y, blurMatrix, blurMatrixSize, img);

      // I wrote this code

      // Calculate distance between pixel and mouse position
      let distance = dist(mouseX, mouseY, x, y);

      // Remap the distance to a range from 0 to 1
      let dynBlur = map(distance, 100, 300, 0, 1);
      dynBlur = constrain(dynBlur, 0, 1);

      imgOut.pixels[index + 0] = c[0] * dynBlur + r * (1 - dynBlur);
      imgOut.pixels[index + 1] = c[1] * dynBlur + g * (1 - dynBlur);
      imgOut.pixels[index + 2] = c[2] * dynBlur + b * (1 - dynBlur);

      // end of code I wrote

      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

// Function for the Convolution Blur
function blurConvolution(x, y, blurMatrix, blurMatrixSize, img) {
  let totalRed = 0.0;
  let totalGreen = 0.0;
  let totalBlue = 0.0;
  let offset = floor(blurMatrixSize / 2);

  // convolution blurMatrix loop
  for (let i = 0; i < blurMatrixSize; i++) {
    for (let j = 0; j < blurMatrixSize; j++) {

      // Get pixel loc within convolution blurMatrix
      let xloc = x + i - offset;
      let yloc = y + j - offset;
      let index = (xloc + img.width * yloc) * 4;

      // ensure we don't address a pixel that doesn't exist
      index = constrain(index, 0, img.pixels.length - 1);

      // multiply all values with the mask and sum up
      totalRed += img.pixels[index + 0] * blurMatrix[i][j];
      totalGreen += img.pixels[index + 1] * blurMatrix[i][j];
      totalBlue += img.pixels[index + 2] * blurMatrix[i][j];
    }
  }
  // return the new color
  return [totalRed, totalGreen, totalBlue];
}

// I wrote this code

// Function for the Border filter
function borderFilter(img) {
  // Create a buffer with the same dimensions as the input image
  let buffer = createGraphics(img.width, img.height);

  // Draw the input image onto the buffer
  buffer.image(img, 0, 0);

  // Set drawing attributes for the rounded rectangle
  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(40);

  // Draw a rounded rectangle (border) around the image
  let cornerRadius = 40; // Adjust this value to change the corner radius
  buffer.rect(0, 0, buffer.width, buffer.height, cornerRadius);

  // Draw a non-rounded rectangle to remove the triangles
  buffer.strokeWeight(1);
  buffer.rect(20, 20, buffer.width - 40, buffer.height - 40);

  // Return the buffer containing the bordered image
  return buffer;
}

// end of code I wrote

// Function for the Threshold filter
function thresholdFilter(img) {
  let imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
    for (y = 0; y < imgOut.height; y++) {

      let index = (x + y * imgOut.width) * 4;

      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let bright = (r + g + b) / 3; // simple
      // let bright = 0.3 * r + 0.59 * g + 0.11 * b; // LUMA ratios

      let threshold = thresholdSlider.value();
      if (bright > threshold) {
        imgOut.pixels[index + 0] = 255;
        imgOut.pixels[index + 1] = 255;
        imgOut.pixels[index + 2] = 255;
        imgOut.pixels[index + 3] = 255;
      } else {
        imgOut.pixels[index + 0] = 0;
        imgOut.pixels[index + 1] = 0;
        imgOut.pixels[index + 2] = 0;
        imgOut.pixels[index + 3] = 255;
      }
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

// Function for the Invert filter
function invertFilter(img) {
  imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for (let x = 0; x < imgOut.width; x++) {
    for (let y = 0; y < imgOut.height; y++) {

      let index = (x + y * imgOut.width) * 4;

      let r = 255 - img.pixels[index + 0];
      let g = 255 - img.pixels[index + 1];
      let b = 255 - img.pixels[index + 2];

      imgOut.pixels[index + 0] = r;
      imgOut.pixels[index + 1] = g;
      imgOut.pixels[index + 2] = b;
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

// Function for the Sharpen filter
function sharpenFilter(img) {
  let imgOut = createImage(img.width, img.height);
  let matrixSize = sharpenMatrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  for (let x = 0; x < imgOut.width; x++) {
    for (let y = 0; y < imgOut.height; y++) {

      let index = (x + y * imgOut.width) * 4;
      let c = sharpenConvolution(x, y, sharpenMatrix, matrixSize, img);

      imgOut.pixels[index + 0] = c[0];
      imgOut.pixels[index + 1] = c[1];
      imgOut.pixels[index + 2] = c[2];
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

// Function for the Sharpen Convolution
function sharpenConvolution(x, y, matrix, matrixSize, img) {
  let totalRed = 0.0;
  let totalGreen = 0.0;
  let totalBlue = 0.0;
  let offset = floor(matrixSize / 2);

  // convolution matrix loop
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      // Get pixel loc within convolution matrix
      let xloc = x + i - offset;
      let yloc = y + j - offset;
      let index = (xloc + img.width * yloc) * 4;
      // ensure we don't address a pixel that doesn't exist
      index = constrain(index, 0, img.pixels.length - 1);

      // multiply all values with the mask and sum up
      totalRed += img.pixels[index + 0] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue += img.pixels[index + 2] * matrix[i][j];
    }
  }
  // return the new color
  return [totalRed, totalGreen, totalBlue];
}

// I wrote this code

// Function for the Brightness filter
function brightnessFilter(img) {
  let imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  // get brightness value from slider
  let brightnessValue = brightnessSlider.value()

  for (let x = 0; x < imgOut.width; x++) {
    for (let y = 0; y < imgOut.height; y++) {
      let index = (x + y * imgOut.width) * 4;

      // add brightness value to RGB of image
      let r = img.pixels[index + 0] + brightnessValue;
      let g = img.pixels[index + 1] + brightnessValue;
      let b = img.pixels[index + 2] + brightnessValue;

      imgOut.pixels[index + 0] = constrain(r, 0, 255);
      imgOut.pixels[index + 1] = constrain(g, 0, 255);
      imgOut.pixels[index + 2] = constrain(b, 0, 255);
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

// end of code I wrote

