function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
        var radius = 1.5;

        var num_points = 3000
        var x_values = generateRandomLocations(1, width, num_points)
        var y_values = generateRandomLocations(1, height, num_points)
        var rect_size = 150

        for (i = 0; i < num_points; i++) {
            centerX = x_values[i]
            centerY = y_values[i]

            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'red';
            context.fill();

            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'cyan';
            context.fill();
        }

        if (withinBounds(centerX, centerY, width, height, rect_size)) {
                context.beginPath();
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                context.fillStyle = 'red';
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