function Population() {
    this.rockets = [];
    this.popSize = 50;
    this.matingpool = [];

    for (var i = 0; i < this.popSize; i++) {
        this.rockets[i] = new Rocket();
    }

}

Population.prototype.evaluate = function() {
    var maxFit = 0;
    var minFit = 100000;
    var rocket;
    for (var i = 0; i < this.popSize; i++) {
        this.rockets[i].claculateFitness();
        if (this.rockets[i].fitness > maxFit) {
            maxFit = this.rockets[i].fitness;
        }
        if (this.rockets[i].fitness < minFit) {
            minFit = this.rockets[i].fitness;
            rocket = this.rockets[i];

        }
    }
    /*if (maxFit / minFit > 2 && firstCame)
        rocket.dna.supermutation();*/



    maxP.html(maxFit + "   " + minFit);

    for (var i = 0; i < this.popSize; i++) {
        this.rockets[i].fitness /= maxFit;
    }

    this.matingpool = [];

    for (var i = 0; i < this.popSize; i++) {
        var n = this.rockets[i].fitness * 100;
        for (var j = 0; j < n; j++) {
            this.matingpool.push(this.rockets[i]);
        }
    }
}

Population.prototype.selection = function() {
    var newPopulation = [];
    for (var i = 0; i < this.popSize; i++) {
        var parentA = random(this.matingpool).dna;
        var parentB = random(this.matingpool).dna;
        var child = parentA.crossover(parentB);
        child.mutation();
        newPopulation[i] = new Rocket(child);
    }
    this.rockets = newPopulation;
}

Population.prototype.run = function() {
    for (var i = 0; i < this.popSize; i++) {
        this.rockets[i].update();
        this.rockets[i].draw();
    }
}