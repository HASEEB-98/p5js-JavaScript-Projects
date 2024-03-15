// Note: The Main Extension Part is Done for Assignment "Instagram Filters". 
// This assignment includes extension work which mentioned in the assignment in "Ideas for Further Development" 

// Commentary for Extension Part in "Ideas for Further Development Section":
// We have added sliders are used to control aspects of the visual scene, such as box heights, curve heights, curve speed,
// rotation speed, and confetti speed. By manipulating these sliders, you can dynamically modify the appearance and behavior
// of the scene, providing an interactive and personalized experience.

// Those Sliders are:
// Box Height Slider: This slider allows you to adjust the height of the boxes in the grid. As you move the slider, the boxes' heights change, altering the overall shape of the scene.
// Curve Height Slider: With this slider, you can control the height of the curves in the scene. Adjusting the slider modifies the curvature of the elements, creating dynamic visual changes.
// Curve Speed Slider: The curve animation's speed can be controlled using this slider. Changing the slider value affects how quickly the curves move, adding a sense of motion and fluidity to the scene.
// Rotation Speed Slider: This slider governs the speed of the scene's rotation. As you adjust the slider, the rotation rate changes, allowing you to experience the scene from various angles.
// Confetti Speed Slider: The confetti particles' speed is determined by this slider. Moving the slider alters how fast the confetti falls, impacting the liveliness of the particle animation.

// Note: In this assignment only empty sketch is given, I wrote the whole code.

// I wrote this code

// Initialize arrays to store confetti positions and rotation angles
let confLocs = [];
let confTheta = [];

// Declare variable to store the custom font
let customFont;

// Preload function to load the custom font before setup
function preload() {
  customFont = loadFont('assets/Roboto-Black.ttf');
}

function setup() {
  // Create a canvas with WebGL rendering
  createCanvas(900, 800, WEBGL);

  // Create sliders for controlling various parameters
  // Box Height Slider
  boxHeightSliders = createSlider(0, 100, 0);
  boxHeightSliders.position(150, height - 120);
  boxHeightSliders.style('width', '150px');

  // Curve Height Slider
  curveHeightSliders = createSlider(0, 100, 0);
  curveHeightSliders.position(150, height - 80);
  curveHeightSliders.style('width', '150px');

  // Curve Speed Slider
  curveSpeedSliders = createSlider(1, 10, 1, 1);
  curveSpeedSliders.position(150, height - 40);
  curveSpeedSliders.style('width', '150px');

  // Confetti Speed Slider
  confettiSpeedSliders = createSlider(1, 5, 1, 1);
  confettiSpeedSliders.position(620, height - 40);
  confettiSpeedSliders.style('width', '150px');

  // Rotation Speed Slider
  rotationSpeedSliders = createSlider(0.5, 2.5, 0.5, 0.5);
  rotationSpeedSliders.position(620, height - 80);
  rotationSpeedSliders.style('width', '150px');

  // Generate random confetti locations and rotation angles
  for (let i = 0; i < 200; i++) {
    let x = random(-500, 500);
    let y = random(-800, 0);
    let z = random(-500, 500);
    confLocs.push(createVector(x, y, z));

    confTheta.push(random(360));
  }
}

// Function to display confetti particles
function confetties() {
  for (let i = 0; i < confLocs.length; i++) {
    
    push();

    translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
    rotateY(confTheta[i]);
    fill(0, 255, 0); 

    // Apply a standard lighting material to the confetti
    normalMaterial();
    noStroke();

    // Create a small plane as a confetti particle
    plane(15, 15);
    
    pop();

    // Update confetti position and rotation
    // confLocs[i].y += 1; // confetti speed updation without slider
    
    confLocs[i].y += confettiSpeedSliders.value();
    if (confLocs[i].y > 0) {
      confLocs[i].y = -800;
    }
    confTheta[i] += 10;
  }
}

function draw() {
  // Set the background color
  background(125);
  angleMode(DEGREES);

  // Store the Initial State Before setting the camera 
  push();

  // Rotation Method 2:
  // xLoc = cos(frameCount) * height;
  // zLoc = sin(frameCount) * height;
  // camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

  // Set camera position and rotation
  xLoc = height;
  zLoc = height;
  camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

  // Rotation Method 1:
  // Rotate the entire scene based on time and rotation speed
  // rotateY(frameCount); // screen rotation without slider
  rotateY(frameCount * rotationSpeedSliders.value());

  let boxSize = 50;

  // Create grid of boxes with varying heights based on curves
  for (let x = -400; x <= 400; x += boxSize) {
    for (let z = -400; z <= 400; z += boxSize) {
      // Calculate distance from the origin
      let distance = dist(x, 0, 0, 0, z, 0);

      // Map curve height based on distance and time
      // let length = map(sin(distance + frameCount), -1, 1, 100, 300); // curve rotation and height without slider
      let length = map(sin(distance + frameCount * curveSpeedSliders.value()), -1, 1, 100, 300 + curveHeightSliders.value());

      push();
      // Translate to box position and set its color
      translate(x, 0, z);
      fill(0, 0, 255);

      // Apply standard lighting material and remove stroke
      normalMaterial();
      noStroke();

      // Create a box with adjusted dimensions
      strokeWeight(2);
      // box(boxSize, length, boxSize); // box hwight without slider
      box(boxSize, length + boxHeightSliders.value(), boxSize);
      pop();
    }
  }

  // Display confetti particles
  confetties();

  // Pop the initial state to add sliders in appropriate positions
  pop();


  // Store State before adding sliders
  push();

  // Display UI labels and Setting for Texts
  fill(0);
  textSize(18);
  textAlign(LEFT, CENTER);
  textFont(customFont);

  // Label the sliders
  text('Box Height:', -width / 2 + 10, height / 2 - 112);
  text('Curve Height:', -width / 2 + 10, height / 2 - 72);
  text('Curve Speed:', -width / 2 + 10, height / 2 - 32);
  text('Rotation Speed:', 10, height / 2 - 72);
  text('Confetti Speed:', 10, height / 2 - 32);
  
  // Restore the original state
  pop();
}

// end of code I wrote

