function DataMap() {
    this.trailMap = [];
    this.diffuse_size = 2;
    this.decayFactor = .95;
    this.min_value = .05;

    this.fill = function() {
        for (i = 0; i < width; i++) {
            this.trailMap.push([])
            for (j = 0; j < height; j++) {
                this.trailMap[i][j] = random();
            }
        }
    }

    this.diffuse = function () {
        var copy = [];
        for (i = 0; i < this.trailMap.length; i++) {
            copy.push([])
            for (j = 0; j < this.trailMap[i].length; j++) {
                copy[i][j] = this.trailMap[i][j];
            }
        }

        for (var kernel_center_i = 0; kernel_center_i < copy.length; kernel_center_i++) {
            for (var kernel_center_j = 0; kernel_center_j < copy[kernel_center_i].length; kernel_center_j++) {
                var total = 0;
                for (kernel__i = kernel_center_i - this.diffuse_size + 1; kernel__i < kernel_center_i + this.diffuse_size; kernel__i++) {
                    for (kernel__j = kernel_center_j - this.diffuse_size + 1; kernel__j < kernel_center_j + this.diffuse_size; kernel__j++) {
                        if (kernel__i >= 0 && kernel__i < copy.length && kernel__j >= 0 && kernel__j < copy[0].length) {
                            total += copy[kernel__i][kernel__j] / 9;
                        }
                    }
                }
                if (kernel_center_i >= 0 && kernel_center_i < copy.length && kernel_center_j >= 0 && kernel_center_j < copy[0].length) {
                    this.trailMap[kernel_center_i][kernel_center_j] = total;
                }
            }
        }
    };

    this.decay = function () {
        for (i = 0; i < this.trailMap.length; i++) {
            for (j = 0; j < this.trailMap[i].length; j++) {
                if (this.trailMap[i][j] < this.min_value) {
                    this.trailMap[i][j] = 0;
                }
                else {
                    this.trailMap[i][j] *= this.decayFactor;
                }
            }
        }
    };

    this.draw = function () {
        for (i = 0; i < this.trailMap.length; i++) {
            for (j = 0; j < this.trailMap[i].length; j++) {
                if (this.trailMap[i][j] > 0) {
                    value = this.trailMap[i][j];
                    percent = min(value, 1);

                    stroke(Math.floor(255*percent));
                    rect(i,j,1,1);
                }
            }
        }
    };
}