var globals = {
    offset: 0,
    num_points: 3000,
    x_values: generateRandomLocations(1, canvas.width, 3000),
    y_values: generateRandomLocations(1, canvas.height, 3000)
}

function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        var width = canvas.width;
        var height = canvas.height;
        var radius = 1.5;
        
        var rect_size = 150

        for (i = 0; i < globals.num_points; i++) {
            centerX = globals.x_values[i]
            centerY = globals.y_values[i]

            if (withinBounds(centerX, centerY, width, height, rect_size)) {
                context.beginPath();
                context.arc(centerX + globals.offset, centerY, radius, 0, 2 * Math.PI, false);
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

function withinBounds(x, y, width, height, size) {
    return centerX < (width/2 + size) && centerX > (width/2 - size)
        && centerY < (height/2 + size) && centerY > (height/2 - size);
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