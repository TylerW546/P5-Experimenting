// ANGLE MODIFIER -----------------------------------------------------------------------------------------------------------------
function rounding(angle, row, col, theta_offset, args) {
    return roundAngleTo(angle, args.round_value);
}

function pulling(angle, row, col, theta_offset, args) {
    var x = (col - num_columns / 2);
    var y = (row - num_rows / 2);
    var theta = (angleFromXY(x, y) - theta_offset + 2*PI) % (2*PI);

    var vector_pull = [Math.cos(angle) - args.h_pull_power * Math.cos(theta), Math.sin(angle) - args.v_pull_power * Math.sin(theta)]

    return angleFromXY(vector_pull[0], vector_pull[1]);
}