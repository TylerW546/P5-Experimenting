// HSL color storage
class Color {
    constructor(H, S, L) {
        this.hue = Math.floor(H)%360;
        this.saturation = Math.floor(S)%360;
        this.lightness = Math.floor(L)%360;
    }

    get values() {
        return [this.hue, this.saturation, this.lightness]
    }

    toString() {
        return '[' + this.hue.toString() + ',' + this.saturation.toString() + ',' + this.lightness.toString() + ']'
    }
}

class RandomColor extends Color {
    constructor() {
        super()
        
        this.hue = Math.floor(random() * 360);
        this.saturation = Math.floor(random() * 360);
        this.lightness = Math.floor(random() * 260 + 50);
    }
}

// A list of the same color with varying lightness
class MonochromaticSet {
    constructor(lDiff, lMin, lMax, startingColor = new Color(random() * 360, random() * 100 + 260, 100)) {
        this.colors = [];

        this.startingColor = startingColor;
        this.lDiff = lDiff;
        this.lMin = lMin;
        this.lMax = lMax;

        let hue = startingColor.hue;
        let sat = startingColor.saturation;
        let startL = (startingColor.lightness - lMin) % lDiff + lMin;
        for (let L = startL; L < lMax; L += lDiff) {
            this.colors.push(new Color(hue, sat, L));
        }
    }

    // Makes another MonochromaticSet with a slightly different hue
    createSecondary(lDiff = this.lDiff, lMin = this.lMin, lMax = this.lMax, hOff = 30) {
        return new MonochromaticSet(lDiff, lMin, lMax, new Color((this.startingColor.hue + hOff) % 360, this.startingColor.saturation, this.startingColor.lightness));
    }
}

// Generates color palette
function setChosenColors(sets = 2, min_off_set = 1, max_off_set = 3, colors_per_set = 3, min_off_color = 3, max_off_color = 5) {
    var colors = [];

    colors.push(new MonochromaticSet(12, 0, 360))
    for (let i = 0; i < 11; i++) {
        colors.push(colors[colors.length - 1].createSecondary())
    }

    var color_offs = [];
    for (let set = 0; set < sets; set++) {
        color_offs.push(Math.floor(lerp(min_off_color, max_off_color + 1, random())));
    }


    var set_index = Math.floor(lerp(0,colors.length, random()));
    for (let set = 0; set < sets; set++) {
        var color_index = Math.floor(lerp(0,colors[set_index].colors.length, random()));
        for (let color = 0; color < colors_per_set; color++) {
            chosen_colors.push(colors[set_index].colors[color_index]);
            color_index += color_offs[set];
            color_index %= colors[set_index].colors.length;
        }
        set_index += Math.floor(lerp(min_off_set, max_off_set + 1, random()));
        set_index %= colors.length;
    }
}