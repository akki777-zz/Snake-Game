var foods = [];
var food, snake;

var old_touchX, old_touchY;

function setup() {
	console.log("CREATED BY :  AKSHAY MAHAJAN");
    createCanvas(windowWidth, windowHeight);
    if (detectMob()) {
        console.log("Mobile");
        setFrameRate(7);
    } else {
        setFrameRate(5);
    }
    for (var i = 0; i < 6; i++) {
        pickFoodLocation();
        foods.push(food);
    }
    snake = new Snake();

    if (snake.x > (windowWidth / 2))
        snake.set_dir(-1, 0);
}

function detectMob() {
    if ((windowWidth < 750 && windowHeight < 450) || (windowWidth < 450 && windowHeight < 750))
        return true;
    else
        return false;
}

function draw() {
    background(51);
    stroke('white');
    fill('white');
    textStyle(NORMAL);
    textSize(18);
    text('Score : ' + snake.score, 30, 30);
    //noCursor();
    //create food based on random location

    for (var i = 0; i < 6; i++) {
        ellipseMode(CORNER);
        if (i != 5 && (i + 1) % 2 == 0) {
            fill('greenyellow');
            stroke('greenyellow');
        } else if ((i + 1) % 3 == 0) {
            fill('crimson')
            stroke('crimson');
        } else {
            fill('lightskyblue')
            stroke('lightskyblue');
        }
        ellipse(foods[i].x, foods[i].y, 20, 20);
    }

    snake.update();
    snake.display();
    if (snake.eat()) {
        pickFoodLocation();
        foods[snake.eatAt] = food;
    }
    if (snake.die()) {
        stroke('white');
        fill('white');
        textSize(24);
        text('GAME OVER', windowWidth / 2, windowHeight / 2);
        noLoop();
    }
}

function keyPressed() {
    if ((keyCode === LEFT_ARROW && snake.xDir != 1 && snake.snakeLength != 0) || (keyCode === LEFT_ARROW && snake.snakeLength == 0)) {
        snake.set_dir(-1, 0);
    } else if ((keyCode === RIGHT_ARROW && snake.xDir != -1 && snake.snakeLength != 0) || (keyCode === RIGHT_ARROW && snake.snakeLength == 0)) {
        snake.set_dir(1, 0);
    } else if ((keyCode === UP_ARROW && snake.yDir != 1 && snake.snakeLength != 0) || (keyCode === UP_ARROW && snake.snakeLength == 0)) {
        snake.set_dir(0, -1);
    } else if ((keyCode === DOWN_ARROW && snake.yDir != -1 && snake.snakeLength != 0) || (keyCode === DOWN_ARROW && snake.snakeLength == 0)) {
        snake.set_dir(0, 1);
    }
    return false;
}

function touchStarted() {
    //console.log("started - > " + floor(touchX) + "," + floor(touchY));
    old_touchX = touchX;
    old_touchY = touchY;
    return false;
}

function touchMoved() {
    //to avoid browsers scroll  or drag behaviour
    return false;
}

function touchEnded() {
    // console.log(floor(touchX) + "," + floor(touchY));
    var x_diff = touchX - old_touchX;
    var y_diff = touchY - old_touchY;

    if (snake.xDir == 0) { //snake going up or down
        //console.log(x_diff);
        if (x_diff > 40)
            snake.set_dir(1, 0);
        else if (x_diff < -40)
            snake.set_dir(-1, 0);
    } else if (snake.yDir == 0) { //snake going left or right
        //console.log(y_diff);
        if (y_diff > 40)
            snake.set_dir(0, 1);
        else if (y_diff < -40)
            snake.set_dir(0, -1);
    }
    return false;
}

function pickFoodLocation() {
    //food
    var cols = floor(windowWidth / 20);
    var rows = floor(windowHeight / 20);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(20);
}