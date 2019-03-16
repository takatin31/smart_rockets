var population;
var lifeSpan = 400;
var count = 0;
var target;
var maxForce = 0.2;
var points = [];
var firstCame = false;
var maxP;

function setup() {
    createCanvas(600, 600);
    target = createVector(width / 2, 50);
    population = new Population();
    completed = false;
    maxP = createP();
}

function draw() {
    background(51);
    population.run();
    fill(255);
    ellipse(target.x, target.y, 20, 20);
    count++;
    if (count == lifeSpan) {
        population.evaluate();
        population.selection();
        count = 0;
    }

    for (var i = 0; i < points.length; i++) {
        ellipse(points[i].x, points[i].y, 10, 10);
    }
}



function mouseDragged() {
    if (mouseX < width && mouseY < height) {
        var point = createVector(mouseX, mouseY);
        points.push(point);
    }
}