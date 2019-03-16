function DNA(genes) {
    if (genes) {
        this.genes = genes;
    } else {
        this.genes = [];
        for (var i = 0; i < lifeSpan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxForce);
        }
    }

}

DNA.prototype.crossover = function(partner) {
    /*var mid = floor(random(0, lifeSpan));
    
    for (var i = 0; i < lifeSpan; i++) {
        if (i < mid) {
            newGenes.push(this.genes[i]);
        } else {
            newGenes.push(partner.genes[i]);
        }
    }*/
    var newGenes = [];
    for (var i = 0; i < lifeSpan; i += 2) {
        newGenes.push(this.genes[i]);
        newGenes.push(partner.genes[i + 1]);
    }
    return new DNA(newGenes)
}

DNA.prototype.mutation = function() {
    for (var i = 0; i < lifeSpan; i++) {
        if (random(1) < 0.01) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxForce);
        }
    }
}

DNA.prototype.supermutation = function() {
    for (var i = 0; i < lifeSpan; i++) {
        if (random(1) < 0.1) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxForce);
        }
    }
}