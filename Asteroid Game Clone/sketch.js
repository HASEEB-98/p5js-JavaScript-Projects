var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score = 0;  // variable to store number of ships destroyed by user

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();
  displayScore();
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    //spaceship-2-asteroid collisions
    //check collusion between each asteroid and spaceship
    for (i = 0; i < asteroids.locations.length; i++){
      if (isInside(asteroids.locations[i], asteroids.diams[i], spaceship.location, spaceship.size)){
        this.gameOver();  // if spaceship collides with any asteriod, it's game over
      }
    }

    //asteroid-2-earth collisions
    //check collusion between each asteroid and earth
    for (i = 0; i < asteroids.locations.length; i++){
      if (isInside(asteroids.locations[i], asteroids.diams[i], earthLoc, earthSize.y)){
        this.gameOver(); // if any asteriod collides with earth, it's game over
      }
    }

    //spaceship-2-earth
    if (isInside(earthLoc, earthSize.y, spaceship.location, spaceship.size)){
        this.gameOver(); // if spaceship collides with earth, it's game over
    }

    //spaceship-2-atmosphere
    if (isInside(atmosphereLoc, atmosphereSize.y, spaceship.location, spaceship.size)){
      spaceship.setNearEarth(); // if spaceship collides with earth's atmosphere, apply friction and gravity force of earth to spaceship
  }

    //bullet collisions
    // for each asteriods check if any bullets fired from spaceship hits it or not
    for (i = 0; i < asteroids.locations.length; i++){ // loop for iterating over each asteriods
      for (j = 0; j < spaceship.bulletSys.bullets.length; j++){ // nested loop for checking if any bullets hits that asteriod
        if (isInside(asteroids.locations[i], asteroids.diams[i], spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam,)){
          // if particular bullets hits that asteriod
          asteroids.destroy(i); // destroy the asteriod
          score++;  // increase the score by 1
          // For every time score reaches multiple of 10 increase the accelaration of incoming asteriods making game difficult
          if(score % 10 === 0){
            asteroids.speedUp();
          }
          break;  // break the inner loop as we don't need to iterate over bullets because the particular asteriod is destroyed    
        }
      }
    }
  }

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // This functoin returns true if distance between A and B is less than radius of A and B combined else returns false
    return dist(locA.x, locA.y, locB.x, locB.y) < ((sizeA + sizeB) / 2) ? true : false
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  textSize(40);
  // Displaying score after game is end
  textAlign(CENTER);
  text(`Your Score: ${this.score}`, width/2, height/2 + 80)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}

// Function to display the score at the top right corner of canvas
function displayScore(){
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(`Score:  ${this.score}`, width - 60, 20)
}
