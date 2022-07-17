const log = console.log

const canvas = document.querySelector('.game-canvas');
const c = canvas.getContext('2d');

class Overworld {
    constructor() {
        this.height = canvas.height
        this.width = canvas.width
    }
    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.width / 6, this.height / 6, this.width / 1.5, this.height / 1.5)
    }
}

class Player {
    constructor() {
        this.size = {
            width: 32,
            height: 64
        }
        this.position = {
            x: 300,
            y: 300
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.speed = 3.5

    }
    draw() {
        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
}

class Projectile {
    constructor() {
        this.size = {
            width: 15,
            height: 15,
        }
        this.position = {
            x: hero.position.x + 40,
            y: hero.position.y + 16
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.speed = 4
        this.distance = 300
    }
    draw() {
        log('fire')
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    }
    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
}

let hero = new Player;
let level1 = new Overworld;
let fireball = new Projectile;
let casting = false



const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    level1.draw()
    hero.update()

    hero.velocity.x = 0
    hero.velocity.y = 0

    if (keys.right.pressed && lastKey === 'd') {
        hero.velocity.x = hero.speed;
    } else if (keys.left.pressed && lastKey === 'a') {
        hero.velocity.x = -hero.speed;
    } else if (keys.up.pressed && lastKey === 'w') {
        hero.velocity.y = -hero.speed;
    } else if (keys.down.pressed && lastKey === 's') {
        hero.velocity.y = hero.speed;
    } else {
        hero.velocity.x = 0, hero.velocity.y = 0
    }
}

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    }
}
let lastKey = ''

animate()



addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.up.pressed = true;
            lastKey = 'w'
            break;
        case 'a':
            keys.left.pressed = true;
            lastKey = 'a'
            break;
        case 's':
            keys.down.pressed = true;
            lastKey = 's'
            break;
        case 'd':
            keys.right.pressed = true;
            lastKey = 'd'
            break;
        case ' ':
            casting = true
            log(casting)
            break;
    }
})
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.up.pressed = false;
            break;
        case 'a':
            keys.left.pressed = false;
            break;
        case 's':
            keys.down.pressed = false;
            break;
        case 'd':
            keys.right.pressed = false;
            break;
        case ' ':
            casting = false
            log(casting)
            break;

    }
})