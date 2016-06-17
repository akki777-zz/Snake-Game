function Snake() {
    this.x = (floor(random(floor((windowWidth - 20) / 20)))) * 20;
    this.y = (floor(random(floor((windowHeight - 20) / 20)))) * 20;
    this.xDir = 1;
    this.yDir = 0;
    this.speed = 20;
    this.score = 0;
    this.eatAt = 0;
    this.snakeLength = 0;
    this.tail = [];
    this.color = ['white', 'gold', 'cornflowerblue', 'lightseagreen', 'silver', 'tomato', 'slateblue', 'sandybrown', 'yellowgreen', 'hotpink'];
    this.display = function() {
        var index = floor((this.score % 500) / 50);
        fill(this.color[index]);
        stroke(this.color[index]);
        //for the tail
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, 20, 20);
        }
        //for the head
        if (this.yDir == 0)
            if (this.xDir == 1)
                rect(this.x, this.y, 20, 20, 0, 10, 10, 0);
            else
                rect(this.x, this.y, 20, 20, 10, 0, 0, 10);
        else if (this.xDir == 0)
            if (this.yDir == 1)
                rect(this.x, this.y, 20, 20, 0, 0, 10, 10);
            else
                rect(this.x, this.y, 20, 20, 10, 10, 0, 0);
    };
    this.update = function() {

        for (var i = 0; i <= this.tail.length - 2; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.snakeLength - 1] = createVector(this.x, this.y);

        this.x += this.xDir * this.speed;
        this.y += this.yDir * this.speed;

        //put constraint
        this.x = constrain(this.x, 0, windowWidth - 20);
        this.y = constrain(this.y, 0, windowHeight - 20);
    };
    this.set_dir = function(x, y) {
        this.xDir = x;
        this.yDir = y;
    };
    this.eat = function() {
        for (var i = 0; i < 6; i++) {
            var d = dist(this.x, this.y, foods[i].x, foods[i].y);
            if (d < 5) {
                this.snakeLength++;
                this.score += 10;
                var fr = getFrameRate();
                fr = floor(fr);
                if (this.score % 50 == 0 && this.score != 0 && fr <= 30) {
                    frameRate(fr + 3);
                    console.log(fr);
                }
                foods[i] = null;
                this.eatAt = i;
                return true;
            }
        }
    };
    this.die = function() {
        if (this.tail.length == 0) {
            if (this.x >= windowWidth - 20 || this.y >= windowHeight - 20 || this.x <= 0 || this.y <= 0)
                return true;
        } else if (this.tail.length != 0) {
            for (var i = 0; i < this.tail.length; i++) {
                var pos = this.tail[i];
                var d = dist(this.x, this.y, pos.x, pos.y);
                if (d < 5) {
                    this.score = 0;
                    this.total = 0;
                    this.tail = [];
                    return true;
                }
            }
        } else {
            return false;
        }
    };
}