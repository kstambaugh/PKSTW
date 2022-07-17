const log = console.log

const canvas = document.querySelector('.game-canvas');
const c = canvas.getContext('2d');

let lastKey = null
let faceX = ''
let faceY = ''

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
        this.speed = 3

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
    constructor({ position, velocity }) {
        this.width = 15
        this.height = 15
        this.position = position
        this.velocity = velocity

    }
    draw() {
        log('fire')
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
}

class Melee {
    constructor() {
        this.width = 10
        this.height = 30
        this.position = {
            x: hero.position.x,
            y: hero.position.y
        }
    }
    attack() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

let hero = new Player;
let level1 = new Overworld;
let projectiles = []
let sword = new Melee



const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    level1.draw()
    hero.update()
    projectiles.forEach(projectile => {
        projectile.update()
    })

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

    if (keys.slash.pressed) {
        sword.attack()

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
    },
    slash: {
        pressed: false
    }
}



animate()



addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.up.pressed = true;
            lastKey = 'w'
            faceY = -5
            faceX = 0
            break;
        case 'a':
            keys.left.pressed = true;
            lastKey = 'a'
            faceY = 0
            faceX = -5
            break;
        case 's':
            keys.down.pressed = true;
            lastKey = 's'
            faceY = 5
            faceX = 0
            break;
        case 'd':
            keys.right.pressed = true;
            lastKey = 'd'
            faceY = 0
            faceX = 5
            break;
        case 'f':
            keys.slash.pressed = true;
            break;
        case ' ':
            if (lastKey = null) {
                faceY = 0
                faceX = 5
            }
            log('fire')
            projectiles.push(new Projectile({
                position: {
                    x: hero.position.x,
                    y: hero.position.y
                },
                velocity: {
                    x: faceX,
                    y: faceY
                }
            }))
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
        case 'f':
            keys.slash.pressed = false;
            break;
    }
})