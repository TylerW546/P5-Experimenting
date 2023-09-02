// ANGLE TEMPLATES ----------------------------------------------------------------------------------------------------------------
function default_template(row, col, theta_offset, args) {
    return (default_angle + theta_offset)% (2 * PI);
}

function perlin(row, col, theta_offset, args) {
    // Processing's noise() works best when the step between
    // points is approximately 0.005, so scale down to that
    var scaled_x = col * args.col_scaling;
    var scaled_y = row * args.row_scaling;
    // translate the noise value to an angle (betwen 0 and 2 * PI)
    // 3rd argument increases complexity as it gets smaller? Default to 1
    var angle = map(noise(scaled_x, scaled_y), 0, 1, 0, 2*PI);

    return angle;
}

function thetaPerlin(row, col, theta_offset, args) {
    // Polar Coordinates -------------------------
    var x = (col - num_columns / 2);
    var y = (row - num_rows / 2);
    var theta = (angleFromXY(x, y) - theta_offset + 2*PI) % (2*PI);
    var r = sqrt(Math.pow((row - num_rows / 2), 2) + Math.pow((col - num_columns / 2), 2));

    // translate the noise value to an angle (betwen 0 and 2 * PI)
    // 3rd argument increases complexity as it gets smaller? Default to 1
    var angle = map(noise(theta*args.theta_multiplier, r*args.r_multiplier), 0, 1, 0, 2*PI);

    return angle;
}

function rModifiedPerlin(row, col, theta_offset, args) {
    // Polar Coordinates -------------------------
    var x = (col - num_columns / 2);
    var y = (row - num_rows / 2);
    var theta = (angleFromXY(x, y) - theta_offset + 2*PI) % (2*PI);
    var r = sqrt(Math.pow((row - num_rows / 2), 2) + Math.pow((col - num_columns / 2), 2));

    // Processing's noise() works best when the step between
    // points is approximately 0.005, so scale down to that
    var scaled_x = col * args.col_scaling;
    var scaled_y = row * args.row_scaling;
    // translate the noise value to an angle (betwen 0 and 2 * PI)
    // 3rd argument increases complexity as it gets smaller? Default to 1
    var angle = map(noise(x*r/10000, y*r/10000), 0, 1, 0, 2*PI);

    return angle;
}

function circles(row, col, theta_offset, args) {
    // Polar Coordinates -------------------------
    var x = (col - num_columns / 2);
    var y = (row - num_rows / 2);
    var theta = (angleFromXY(x, y) - theta_offset + 2*PI) % (2*PI);
    var r = sqrt(Math.pow((row - num_rows / 2), 2) + Math.pow((col - num_columns / 2), 2));

    var angle = theta + PI / 2;
    
    return angle;
}

function flowers(row, col, theta_offset, args) {    
    // Polar Coordinates -------------------------
    var x = (col - num_columns / 2);
    var y = (row - num_rows / 2);
    var theta = (angleFromXY(x, y) - theta_offset + 2*PI) % (2*PI);
    var r = sqrt(Math.pow((row - num_rows / 2), 2) + Math.pow((col - num_columns / 2), 2));

    // Flower, where a-2 is the number of petals
    var angle = args.a/2*theta;

    return angle;
}