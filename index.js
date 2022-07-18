const log = console.log

const canvas = document.querySelector('.game-canvas');
const c = canvas.getContext('2d');

let lastKey = ''
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

class Character {
    constructor({ position }) {
        this.width = 32
        this.height = 64
        this.position = position
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.speed = 3
        this.attackBox = {
            position: this.position,
            width: 64,
            height: 32,

        }
        this.isAttacking = false

    }
    draw() {
        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.isAttacking) {
            c.fillStyle = 'grey'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)

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
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
}


let hero = new Character({
    position: {
        x: 300,
        y: 300,
    }
});
let enemy = new Character({
    position: {
        x: 600,
        y: 300
    }

});
let level1 = new Overworld;
let projectiles = []




const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    level1.draw()

    if (hero.position.y + hero.velocity.y <= enemy.position.y + enemy.height &&
        hero.position.y + hero.velocity.y + hero.height >= enemy.position.y &&
        hero.position.x + hero.velocity.x + hero.width >= enemy.position.x &&
        hero.position.x + hero.velocity.x <= enemy.position.x + enemy.width
    ) {
        log('hit')
        hero.velocity.x = 0
        hero.velocity.y = 0
    }

    enemy.update()

    hero.update()
    hero.velocity.x = 0
    hero.velocity.y = 0
    projectiles.forEach((projectile, i) => {
        if (projectile.position.y + projectile.velocity.y <= enemy.position.y + enemy.height &&
            projectile.position.y + projectile.velocity.y + projectile.height >= enemy.position.y &&
            projectile.position.x + projectile.velocity.x + projectile.width >= enemy.position.x &&
            projectile.position.x + projectile.velocity.x <= enemy.position.x + enemy.width
        ) {
            log('hit')
            projectile.velocity.x = 0
            projectile.velocity.y = 0
            projectiles.splice(i, 1)

        }
        projectile.update()
    })

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
            hero.attack()
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