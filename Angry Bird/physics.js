////////////////////////////////////////////////////////////////
function setupGround() {
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround() {
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}

////////////////////////////////////////////////////////////////
function setupPropeller() {
  // setting static propeller with size of (200, 15) at location of (150, 400) with inital angle value of global variable angle
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true, angle: angle
  });
  World.add(engine.world, [propeller]); // adding propeller in World
}

////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
  push();
  fill(255);  // drawing propeller of white color
  Body.setAngle(propeller, angle);  // setting angle for propeller
  Body.setAngularVelocity(propeller, angleSpeed); // setting anglular speed for propeller
  angle = angle + angleSpeed; // incrementing angle with angular speed
  drawVertices(propeller.vertices); // drawing propeller
  pop();
}

////////////////////////////////////////////////////////////////
function setupBird() {
  var bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0,
    restitution: 0.95
  });
  Matter.Body.setMass(bird, bird.mass * 10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}

////////////////////////////////////////////////////////////////
function drawBirds() {
  push();
  fill(128);  // drawing ball of gray color when b is pressed
  for (let i = 0; i < birds.length; i++) {  // Loop over the birds array
    drawVertices(birds[i].vertices);  // drawing each bird
    // checking if birds left the screen
    if (isOffScreen(birds[i])) { 
      // remove the bird which left the screen from World as well from birds array
      removeFromWorld(birds[i]);  
      birds.splice(i, 1);
      i--;  // decrement the value of i so we don't skip the next bird
    }
  }
  pop();
}

////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {
  let numOfBoxInRow = 6;  // number of boxes in row
  let numOfBoxInCol = 3;  // number of boxes in column
  // x and y location of box from right-bottom 
  let xLoc = width - 160; 
  let yLoc = height + 20;
  
  // outer loop for collumn
  for (let i = 0; i < numOfBoxInCol; i++) {
    // inner loop for rows
    for (let j = 0; j < numOfBoxInRow; j++) {
      // set non-static box at (xLoc, yLoc) position with size of 80-x80
      let box = Bodies.rectangle(xLoc, yLoc, 80, 80, { isStatic: false });
      World.add(engine.world, [box]); // add box to engine
      boxes.push(box); // add box to boxes array
      colors.push(color(0, Math.ceil(Math.random() * 256), 0))  // add random shade of green color for given particular box
      yLoc -= 80; // decrement the yLoc by 80, so we can add another box on top of given box in same column
    }
    xLoc -= 80; // decrement the xLoc by 80, so we can move to other column and 
    yLoc = height + 20; // set yLoc position to default value so we can start over setting boxes for next column
  }
}

////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
  push();
  for (let i = 0; i < boxes.length; i++) {  // Loop over the boxes array
    fill(colors[i]);  // drawing boxes of random shades of green color which we pushed in colors array for each boxes
    drawVertices(boxes[i].vertices);  // drawing boxes
    // checking if box left the screen, to end the game
    if (isOffScreen(boxes[i])) {
      // remove the box which left the screen from World as well from boxes array      
      removeFromWorld(boxes[i]);
      boxes.splice(i, 1);
      // remove the color of that particular box from colors array
      colors.splice(i, 1);
      i--;  // // decrement the value of i so we don't skip the next box
    }

    // if there is no box left on the screen, it means user have won the game
    if (boxes.length === 0) {
      gameOver("Win");
    }
  }
  pop();
}

////////////////////////////////////////////////////////////////
function setupSlingshot() {
  //your code here
  let shotXLoc = 200  // initializing sling shot x Loc
  let shotYLox = 150  // initializing sling shot y Loc
  // creating sling shot of size 20 having friction 0 and restitution 0.95
  slingshotBird = Bodies.circle(shotXLoc, shotYLox, 20, {
    friction: 0,
    restitution: 0.95
  });
  // setting mass of sling shot 10 times to its current mass
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);
  // creating sling shot constraint having stiffness of 0.01 and damping of 0.0001 at location point A (200, 150) to point B (190, 140)
  slingshotConstraint = Constraint.create({
    pointA: { x: shotXLoc, y: shotYLox },
    bodyB: slingshotBird,
    pointB: { x: -10, y: -10 },
    stiffness: 0.01,
    damping: 0.0001,
  })
  World.add(engine.world, [slingshotBird, slingshotConstraint]); // adding sling shot and sling shot constraint to world
}

////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
  push();
  fill(255, 170, 51) // filling color of yellow orange for sling shot
  drawVertices(slingshotBird.vertices); // drawing sling shot
  drawConstraint(slingshotConstraint);  // drawing sling shot constraint
  pop();
}

/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

//**********************************************************************
//  FUNCTIONS - to display time and game over message as well check if 60 seconds passed
//**********************************************************************

////////////////////////////////////////////////////////////
function drawTimer() {
  const elapsed = millis() - startTime; // Calculate the elapsed time in milliseconds
  const remaining = max(0, duration * 1000 - elapsed); // Calculate the remaining time in milliseconds

  const seconds = Math.ceil(remaining / 1000); // Convert remaining time to seconds
  textSize(24);
  fill(255);
  text("Time Left: " + seconds + " seconds", 0, 30);
}

////////////////////////////////////////////////////////////
function checkTimer() {
  const elapsed = Math.ceil((millis() - startTime) / 1000); // Calculate the elapsed time in milliseconds

  if (elapsed >= duration) {  // if time passed it is game over
    gameOver("Lose");
  }
}

////////////////////////////////////////////////////////////
// display results whether you lose or win
function gameOver(result) {
  background(0);
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2)
  textSize(40);
  textAlign(CENTER);
  text(`You ${result}`, width / 2, height / 2 + 80)
  Matter.Runner.stop()  // stop the game
}

