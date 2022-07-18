const log = console.log

const canvas = document.querySelector('.game-canvas');
const c = canvas.getContext('2d');

let lastKey = ''

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
    constructor({ position, color }) {
        this.hitpoints = 10
        this.isAlive = true
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
            width: 70,
            height: 32,
            damage: 2,
            knockback: 60
        }
        this.color = color
        this.isAttacking = false
        this.faceDirection = {
            facing: 'east',
            x: 5,
            y: 0
        }
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        //this determines where to put the attackbox based off which direction the hero is facing
        if (this.isAttacking) {
            c.fillStyle = 'grey'
            switch (hero.faceDirection.facing) {
                case 'east' || ' ':
                    c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
                    break;
                case 'west':
                    let attackLeft = this.attackBox.position.x - this.width - 6;
                    c.fillRect(attackLeft, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
                    break;
                case 'north':
                    let attackUp = this.attackBox.position.y - this.attackBox.height * 1.5;
                    c.fillRect(this.attackBox.position.x, attackUp, this.attackBox.height, this.attackBox.width,)
                    break;
                case 'south':
                    let attackDown = this.attackBox.position.y + this.attackBox.height * 1.5;
                    c.fillRect(this.attackBox.position.x, attackDown, this.attackBox.height, this.attackBox.width,)
                    break;
            }
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
    firebolt() {
        projectiles.push(new Projectile({
            position: {
                x: hero.position.x,
                y: hero.position.y
            },
            velocity: {
                x: this.faceDirection.x,
                y: this.faceDirection.y
            }
        }))
    }
}

class Projectile {
    constructor({ position, velocity }) {
        this.width = 15
        this.height = 15
        this.position = position
        this.velocity = velocity
        this.damage = 1
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
    },
    color: 'green'
});
let enemy1 = new Character({
    position: {
        x: 600,
        y: 300
    },
    color: 'red'
});
let enemy2 = new Character({
    position: {
        x: 800,
        y: 400
    },
    color: 'purple'
})
let level1 = new Overworld;
let projectiles = []
let enemies = []
enemies.push(enemy1, enemy2)

const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    level1.draw()

    enemies.forEach((npc, i) => {
        npc.update()
        if (npc.hitpoints <= 0) {
            npc.isAlive = false
            shotCount = 0
            enemies.splice(i, 1)
        }
        //hero doesn't walk through npcs
        if (hero.position.y + hero.velocity.y / 2 <= npc.position.y + npc.height &&
            hero.position.y + hero.velocity.y / 2 + hero.height >= npc.position.y &&
            hero.position.x + hero.velocity.x / 2 + hero.width >= npc.position.x &&
            hero.position.x + hero.velocity.x / 2 <= npc.position.x + npc.width
        ) {
            //if hero and npc do collide, pushes them way from eachother in opposite direction of heros movement
            switch (hero.faceDirection.facing) {
                case 'east':
                    hero.position.x = hero.position.x - hero.attackBox.knockback;
                    npc.position.x = npc.position.x + hero.attackBox.knockback;
                    break;
                case 'west':
                    hero.position.x = hero.position.x + hero.attackBox.knockback;
                    npc.position.x = npc.position.x - hero.attackBox.knockback;
                    break;
                case 'north':
                    hero.position.y = hero.position.y + hero.attackBox.knockback;
                    npc.position.y = npc.position.y - hero.attackBox.knockback;
                    break;
                case 'south':
                    hero.position.y = hero.position.y - hero.attackBox.knockback;
                    npc.position.y = npc.position.y + hero.attackBox.knockback;
                    break;
            }
        }

        //sword swing hitbox
        switch (hero.faceDirection.facing) {
            case 'east' || ' ':
                hero.attackBox.position.x, hero.attackBox.position.y, hero.attackBox.width, hero.attackBox.height

                break;
            case 'west':
                attackingLeft = hero.attackBox.position.x - hero.width - 6;
                break;
            case 'north':
                attackingUp = hero.attackBox.position.y - hero.attackBox.height * 1.5;
                break;
            case 'south':
                attackDown = hero.attackBox.position.y + hero.attackBox.height * 1.5;
                break;
        }
        if (hero.attackBox.position.y <= npc.position.y + npc.height &&
            hero.attackBox.position.y + hero.attackBox.height >= npc.position.y &&
            hero.attackBox.position.x + hero.attackBox.width >= npc.position.x &&
            hero.attackBox.position.x <= npc.position.x + npc.width && hero.isAttacking
        ) {
            log('hit')
            npc.hitpoints = npc.hitpoints - hero.attackBox.damage
            npc.position.x = npc.position.x + hero.attackBox.knockback
            hero.isAttacking = false
        }
        //projectiles stop at and damage npcs
        projectiles.forEach((projectile, i) => {
            if (projectile.position.y + projectile.velocity.y <= npc.position.y + npc.height &&
                projectile.position.y + projectile.velocity.y + projectile.height >= npc.position.y &&
                projectile.position.x + projectile.velocity.x + projectile.width >= npc.position.x &&
                projectile.position.x + projectile.velocity.x <= npc.position.x + npc.width
            ) {
                if (npc.isAlive) {
                    npc.hitpoints = npc.hitpoints - projectile.damage
                    projectiles.splice(i, 1)
                }
            }
        })

    })
    hero.update()

    hero.velocity.x = 0
    hero.velocity.y = 0

    projectiles.forEach((projectile, i) => {
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
    log(hero.faceDirection.facing)
    switch (key) {
        case 'w':
            keys.up.pressed = true;
            lastKey = 'w'
            hero.faceDirection = {
                facing: 'north',
                y: -5,
                x: 0
            }
            break;
        case 'a':
            keys.left.pressed = true;
            lastKey = 'a'
            hero.faceDirection = {
                facing: 'west',
                y: 0,
                x: -5
            }
            break;
        case 's':
            keys.down.pressed = true;
            lastKey = 's'
            hero.faceDirection = {
                facing: 'south',
                y: 5,
                x: 0
            }
            break;
        case 'd':
            keys.right.pressed = true;
            lastKey = 'd'
            hero.faceDirection = {
                facing: 'east',
                y: 0,
                x: 5
            }
            break;
        case ' ':
            hero.attack()
            break;
        case 'f':
            hero.firebolt()
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
    }
})