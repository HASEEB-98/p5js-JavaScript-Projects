class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(125);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
  }

  move(){
    this.velocity.limit(this.maxVelocity);  // applying limit to velocity
    this.velocity.add(this.acceleration); // adding accelartion to velocity
    this.location.add(this.velocity); // adding velocity to location so we can view spaceship moving
    this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        // move spaceship to left by applying negative force of (-0.1, 0) to x-axis when LEFT arrow pressed
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
        // move spaceship to right by applying positive force of (0.1, 0) to x-axis when RIGHT arrow pressed
        this.applyForce(createVector(0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){
        // move spaceship to up by applying negative force of (0, -0.1) to y-axis when UP arrow pressed
        this.applyForce(createVector(0, -0.1));
      }
      if (keyIsDown(DOWN_ARROW)){
        // move spaceship to up by applying positive force (0, 0.1) to y-axis when DOWN arrow pressed
        this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){ 
    // Introducing Gravity in Earth Atmosphere
    let gravity = createVector(0, 0.05);
    this.applyForce(gravity); // apply gravity force to spaceship
    
    // Introducing Friction in Earth Atmosphere
    let friction = this.velocity.copy();
    friction.mult(-1);
    friction.normalize(-1);
    friction.mult(0.03);
    this.applyForce(friction);  // apply friction force to spaceship
  }
}
