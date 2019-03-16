function Rocket(dna) {
    this.pos = createVector(width / 2, height - 5);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }


    this.fitness = 0;
}

Rocket.prototype.draw = function() {
    fill(255, 151);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
}

Rocket.prototype.claculateFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);

    if (this.crashed) {
        this.fitness /= 10;
    }
}

Rocket.prototype.applyForce = function(force) {
    this.acc.add(force);
}

Rocket.prototype.update = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 50 && !firstCame)
        this.fitness *= map(d, 0, 50, 10, 1);

    if (d < 20) {
        completed = true;
        this.pos = target.copy();
        if (!firstCame) {
            firstCame = true;
            this.fitness *= 3;
        }
    }
    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
        this.crashed = true;
    }

    for (var i = 0; i < points.length; i++) {
        if (this.pos.x > points[i].x && this.pos.x < points[i].x + 10 && this.pos.y > points[i].y && this.pos.y < points[i].y + 10) {
            this.crashed = true;
        }
    }

    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

}