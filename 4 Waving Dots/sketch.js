/*
  PARTICULAR NOISE FUNCTION EXPLANATION:
  I used the noise() function in this code to generate random values for coloring the dots in the grid. 
  The noise() function is really handy for creating smooth and continuous random patterns.   
  The values obtained from noise functoin are relevant to each other and they don't have vast difference, if we provide parameters relatively close to each other.
  
  I made three separate calls to the noise() function to obtain random values for the red, green, and blue components of the dot's color.

  For the red component, I used the sum of the dot's x and y coordinates (xLoc + yLoc) as the input parameter for noise(). This ensured that each dot has a unique red value based on its position in the grid.
  To generate a consistent green value across all the dots, I passed a constant value (noOfDots) as the input parameter for noise(). This way, all the dots share the same green value, creating a uniform appearance in that aspect.
  Finally, for the blue component, I used the sum of the dot's x and y coordinates (x + y) as the input parameter for noise(). This produced a random value specific to each dot's position in the grid, giving them unique blue values.

  MAP FUNCTION EXPLANATION:
  After obtaining the noise values, I mapped them from the range [0, 1] to the range [0, 255] using the map() function as the color value for RGB lies in the range of 0-225. This allowed me to generate color values suitable for the color() function.

  CONCLUSION:
  By utilizing the noise() function in this way, I ensured that each dot in the grid has a distinct and visually appealing color based on its position and the colors of dots shows a pattern rather than having irrelevant colors..
*/

function setup() {
  createCanvas(500, 500);
  background(0);
}

function draw() {
  background(255);

  var noOfDots = 20;  // No. of dots in grid
  var size = width / noOfDots;

  const amplitude = 20; // Amplitude of the wave
  const frequency = frameCount / 10; // frequency of wave (Note: frameCount is used as a frequency which increases the as time progress)


  for (var x = 0; x < noOfDots; x++) {
    for (var y = 0; y < noOfDots; y++) {
      let xLoc = x * size + size / 2; // x cordinate for dot
      let yLoc = y * size + size / 2; // y cordinate for dot
      let dotSize = size / 2; // size of each dot

      // To get random color for each, I have used three noise value 
      const noiseRedColor = noise(xLoc + yLoc); // One for red
      const noiseGreenColor = noise(noOfDots);  // One for green  
      const noiseBlueColor = noise(x + y);      // One for blue

      // Mapping each value between 0-255 to get the value for color() function
      const redColorValue = map(noiseRedColor, 0, 1, 0, 255);
      const greenColorValue = map(noiseGreenColor, 0, 1, 0, 255);
      const blueColorValue = map(noiseBlueColor, 0, 1, 0, 255);

      // generating color using random red, green, and blue value obtained from noise function
      const colorValue = color(redColorValue, greenColorValue, blueColorValue);

      // getting phase angle for wave function using x and y coordinates and frequency (frameCount)
      const angle = ((xLoc + yLoc) + frequency);
      // using phase angle to get yOffset value
      // we have also used mouseX coordinate to change the wave as we mouve mouse accross horizontal axis
      // applied amplitude also
      const yOffset = sin(mouseX ? angle * mouseX / 1000 : angle) * amplitude;

      // calling wave function
      // parameters are:
      // xLoc: x coordinate of dot
      // yLoc: y coordinate of dot
      // dotSize: size of each dot
      // colorValue: color value of each Dot
      // angle: phase angle for each dot
      // yOffset: additional y coordinate to generate wave
      wave(xLoc, yLoc, dotSize, colorValue, angle, yOffset);
    }
  }

  // After drawing point this code will connect them
  for (var x = 0; x < noOfDots; x++) {
    for (var y = 0; y < noOfDots; y++) {
      // getting position of current dot which needs to connect with its neighbour x and y dots
      let xLoc1 = x * size + size / 2;
      let yLoc1 = y * size + size / 2;
      // getting angle and offsetY as we have calculated above
      const angle1 = ((xLoc1 + yLoc1) + frequency);
      const yOffset1 = sin(mouseX ? angle1 * mouseX / 1000 : angle1) * amplitude;

      // connect with neighboring dots horizontally
      // checking for last horizontal point (skip it if it is last)
      if (x < noOfDots - 1) {
        let xLoc2 = (x + 1) * size + size / 2;
        let yLoc2 = y * size + size / 2;
        const angle2 = ((xLoc2 + yLoc2) + frequency);
        const yOffset2 = sin(mouseX ? angle2 * mouseX / 1000 : angle2) * amplitude;
        connectDots(xLoc1, yLoc1 + yOffset1, xLoc2, yLoc2 + yOffset2);
      }

      // connect with neighboring dots vertically
      // checking for last vartivall point (skip it if it is last)
      if (y < noOfDots - 1) {
        let xLoc2 = x * size + size / 2;
        let yLoc2 = (y + 1) * size + size / 2;
        const angle2 = ((xLoc2 + yLoc2) + frequency);
        const yOffset2 = sin(mouseX ? angle2 * mouseX / 1000 : angle2) * amplitude;
        connectDots(xLoc1, yLoc1 + yOffset1, xLoc2, yLoc2 + yOffset2);
      }
    }
  }
}

// Function to draw a color dot with specific size at given coordinates at specifc angle
function wave(xLoc, yLoc, dotSize, colorValue, angle, yOffset) {
  push();
  // translating to given coordinated
  translate(xLoc, yLoc + yOffset);
  // rotating to phase angle
  rotate(angle);
  // filling color value for dot
  fill(colorValue);
  // drawing dot(ellispe)
  ellipse(0, 0, dotSize, dotSize);
  pop();
}

// function to draw line between specific dots
// It will be used to connect different dots
function connectDots(x1, y1, x2, y2) {
  push();
  // the color of line is dark gray which connects two points
  stroke(64);
  line(x1, y1, x2, y2);
  pop();
}
