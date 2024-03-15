// Define variables for the Sun, Earth, Moon1 and Moon2
let sun;
let earth;
let moon1;
let moon2;

// Set up the canvas and initialize variables using CelestialObj Class (OOP) 
function setup() {
    createCanvas(900, 900);
    // Creating Orange Sun of size 200 at centre of canvas with rotating speed of 0.005
    sun = new CelestialObj(width / 2, height / 2, 100, 0, 0, 0.005, color(255,150,0));

    // Creating Blue Earth of size 80 at 300px distance from sun with rotating speed of 0.02
    earth = new CelestialObj(0, 0, 40, 300, 0, 0.02, color(0, 0, 255));
    
    // Creating White Moon1 of size 30 at 100px distance from earth with rotating speed of 0.05
    moon1 = new CelestialObj(0, 0, 15, 130, 0, 0.05, color(255, 255, 255));

    // Creating Gray Moon2 of size 40 at 80px distance from earth with rotating speed of 0.04
    moon2 = new CelestialObj(0, 0, 20, 80, 0, 0.04, color(200, 200, 200));
}

// Draw the Sun, Earth, and moon1
function draw() {
    background(0);

    // Sun
    push();
    // Transform the coordinate system to the Sun's position
    translate(sun.locX, sun.locY);
    // Rotate moon1 to it's current angle
    rotate(sun.angle);
    sun.draw();
    pop();

    // Earth
    push();
    // Transform the coordinate system to the Earth's position
    translate(sun.locX + earth.distance * cos(earth.angle), sun.locY + earth.distance* sin(earth.angle));
    // Update the position of the Earth w.r.t Sun and draw it
    earth.locX = sun.locX + earth.distance * cos(earth.angle);
    earth.locY = sun.locY + earth.distance * sin(earth.angle);
    // Rotate earth to it's current angle
    rotate(earth.angle);
    earth.draw();
    pop();

    // Moon1
    push();
    // Transform the coordinate system to the moon1's position
    translate(earth.locX + moon1.distance * cos(moon1.angle), earth.locY + moon1.distance* sin(moon1.angle));
    // Update the position of the moon1 w.r.t Earth and draw it  
    moon1.locX = earth.locX + moon1.distance * cos(moon1.angle);
    moon1.locY = earth.locY + moon1.distance * sin(moon1.angle);
    // Rotate moon1 to it's current angle
    rotate(moon1.angle);
    moon1.draw();
    pop();

    // Moon2
    push();
    // Transform the coordinate system to the moon2's position
    translate(earth.locX + moon2.distance * cos(moon2.angle), earth.locY + moon2.distance* sin(moon2.angle));
    // Update the position of the moon2 w.r.t Earth and draw it  
    moon2.locX = earth.locX + moon2.distance * cos(moon2.angle);
    moon2.locY = earth.locY + moon2.distance * sin(moon2.angle);
    // Rotate moon2 to it's current angle
    rotate(moon2.angle);
    moon2.draw();
    pop();

    // Change the angle of Celestial Object with respect to their speed
    sun.angle += sun.speed;
    earth.angle += earth.speed;
    moon1.angle -= moon1.speed;
    moon2.angle += moon2.speed;
}

// Celestial Object Class 
class CelestialObj {
    constructor(locX = 0, locY = 0, radius = 0, distance = 0, angle = 0, speed = 0, color=(0, 0, 0)) {
        // variable to store coordinates of location
        this.locX = locX;
        this.locY = locY;
        
        // variables to store properties of Celestial Object
        this.radius = radius; // size/2
        this.distance = distance;
        this.angle = angle;
        this.speed = speed;
        this.color = color;
    }

    // function to draw the Celestial object
    draw() {
        strokeWeight(5);
        fill(this.color);
        stroke(0);
        ellipse(0, 0, this.radius*2, this.radius*2);
        line(0, 0, this.radius, 0);
    }
}



