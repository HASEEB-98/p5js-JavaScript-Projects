class BulletSystem {

  constructor(){
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;
  }

  run(){
      this.move();
      this.draw();
      this.edges();
  }

  fire(x, y){
    this.bullets.push(createVector(x,y));
  }

  //draws all bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

  //updates the location of all bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].y += this.velocity.y;
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){
    for(let i = 0; i < this.bullets.length; i++){
      // if bullet left the screen it means it y coordinates value will be less than 0
      if (this.bullets[i].y < 0){
        this.bullets.splice(i, 1);  // remove bullet from array of bullets
        i--;  // decrement the value of i, so we don't skip the next bullet
      }
    }
  }
}
