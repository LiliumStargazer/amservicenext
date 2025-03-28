let entities = [];
    let backgroundContext;
    let terrainContext;
    let width;
    let height;
    let points = [];
    let power = 0;

    // Funzione di animazione
    const animate = () => {
        backgroundContext.fillStyle = '#000000';
        backgroundContext.fillRect(0, 0, width, height);
        backgroundContext.fillStyle = '#DCABF1';
        backgroundContext.strokeStyle = '#DCABF1';

        let entLen = entities.length;
        while (entLen--) {
            entities[entLen].update();
        }

        requestAnimationFrame(animate);
    };

    const initAnimation = (terrainCanvas, bgCanvas) => {
        terrainContext = terrainCanvas.getContext('2d');
        backgroundContext = bgCanvas.getContext('2d');

        width = window.innerWidth;
        height = document.body.offsetHeight;
        if (height < 400) {
            height = 400;
        }

        terrainCanvas.width = bgCanvas.width = width;
        terrainCanvas.height = bgCanvas.height = height;

        points = [];
        power = 2 ** Math.ceil(Math.log(width) / Math.log(2));

        points[0] = height - Math.random() * height / 2;
        points[power] = height - Math.random() * height / 2;

        let i = 1;
        let displacement = 0;

        while (i < power) {
            let j = power / i / 2;
            while (j < power) {
                points[j] = (points[j - power / i / 2] + points[j + power / i / 2]) / 2 + Math.floor(Math.random() * -displacement + displacement);
                j += power / i;
            }
            displacement *= 0.6;
            i *= 2;
        }

        // Disegna il terreno
        terrainContext.beginPath();
        i = 0;
        while (i <= width) {
            if (i === 0) {
                terrainContext.moveTo(0, points[0]);
            } else if (points[i] !== undefined) {
                terrainContext.lineTo(i, points[i]);
            }
            i++;
        }

        terrainContext.lineTo(width, terrainCanvas.height);
        terrainContext.lineTo(0, terrainCanvas.height);
        terrainContext.lineTo(0, points[0]);

        // Stelle
        function Star(options) {
            this.size = Math.random() * 2;
            this.speed = Math.random() * 1;
            this.x = options.x;
            this.y = options.y;
        }

        Star.prototype.reset = function () {
            this.size = Math.random() * 2;
            this.speed = Math.random() * 1;
            this.x = width;
            this.y = Math.random() * height;
        };

        Star.prototype.update = function () {
            this.x -= this.speed;
            if (this.x < 0) {
                this.reset();
            } else {
                backgroundContext.fillRect(this.x, this.y, this.size, this.size);
            }
        };

        function ShootingStar() {
            this.reset();
        }

        ShootingStar.prototype.reset = function () {
            this.x = Math.random() * width;
            this.y = 0;
            this.len = (Math.random() * 80) + 10;
            this.speed = (Math.random() * 5) + 6;
            this.size = (Math.random() * 1) + 0.1;
            this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
            this.active = false;
        };

        ShootingStar.prototype.update = function () {
            if (this.active) {
                this.x -= this.speed;
                this.y += this.speed;
                if (this.x < 0 || this.y >= height) {
                    this.reset();
                } else {
                    backgroundContext.lineWidth = this.size;
                    backgroundContext.beginPath();
                    backgroundContext.moveTo(this.x, this.y);
                    backgroundContext.lineTo(this.x + this.len, this.y - this.len);
                    backgroundContext.stroke();
                }
            } else {
                if (this.waitTime < new Date().getTime()) {
                    this.active = true;
                }
            }
        };

        entities = [];
        for (let i = 0; i < height / 10; i++) {
            entities.push(new Star({ x: Math.random() * width, y: Math.random() * height }));
        }

        // Add more shooting stars
        for (let i = 0; i < 5; i++) { // Increase the number of shooting stars
            entities.push(new ShootingStar());
        }

        animate();
    };

    export default initAnimation;