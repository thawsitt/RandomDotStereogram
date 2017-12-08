var globals = {
    offset: 0,
    num_points: 3000,
    x_values: generateRandomLocations(1, canvas.width, 3000),
    y_values: generateRandomLocations(1, canvas.height, 3000),
    shapes: [rect, circle, rect],
    cur_shape: 0,
    rect_size: canvas.width/3,
    smaller_rect_size: canvas.width/3 - 50,
    circle_radius: canvas.width/5,
}

function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        var width = canvas.width;
        var height = canvas.height;
        var radius = 1.5;
        
        for (i = 0; i < globals.num_points; i++) {
            centerX = globals.x_values[i]
            centerY = globals.y_values[i]

            if (globals.shapes[globals.cur_shape](centerX, centerY)) {
                context.beginPath();
                var offset = globals.offset;
                if (globals.cur_shape == 2 && globals.offset != 0 && smallerRect(centerX, centerY)) {
                    offset = globals.offset + 4 * (globals.offset/Math.abs(globals.offset))
                }
                context.arc(centerX + offset, centerY, radius, 0, 2 * Math.PI, false);
                context.fillStyle = 'red';
                context.fill();
            } else {
                context.beginPath();
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                context.fillStyle = 'red';
                context.fill();
            }

            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'cyan';
            context.fill();
        }
            
    }
}

function rect(x, y) {
    var width = canvas.width;
    var height = canvas.height;
    var size = globals.rect_size;
    return centerX < (width/2 + size) && centerX > (width/2 - size)
        && centerY < (height/2 + size) && centerY > (height/2 - size);
}

function smallerRect(x, y) {
    var width = canvas.width;
    var height = canvas.height;
    var size = globals.smaller_rect_size;
    return centerX < (width/2 + size) && centerX > (width/2 - size)
        && centerY < (height/2 + size) && centerY > (height/2 - size);
}

function circle(x, y) {
    radius = globals.circle_radius;
    origin = canvas.width / 2.0;
    return distance(x, y, origin, origin) <= radius;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}


function generateRandomLocations(min, max, num_points) {
    values = []
    for (i = 0; i < num_points; i++) {
        values.push(getRandomInt(min, max));
    }
    return values
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function moveLeft() {
    globals.offset -= 2;
    draw();
}

function moveRight() {
    globals.offset += 2;
    draw();
}

function reset() {
    globals.offset = 0;
    draw();
}

function randomShape() {
    globals.cur_shape = (globals.cur_shape + 1) % globals.shapes.length;
    globals.offset = 0;
    draw();
}

function keyboardMove(e) {
    switch(e.keyCode) {
        case 32: /* space bar */
            reset();
            break;
        case 37: /* left arrow */
            moveLeft();
            break;
        case 39: /* right arrow */
            moveRight();
            break;
    }
}

window.addEventListener("keydown", keyboardMove, false);