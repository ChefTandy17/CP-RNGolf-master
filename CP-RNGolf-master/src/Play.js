class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X = 200                                          //To treat it as a constant, as what the professor says
        this.SHOT_VELOCITY_Y_MIN = 700                                                    
        this.SHOT_VELOCITY_Y_MAX = 1100
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup')   //to display the cup, with physics, in width /2 height /10  
        this.cup.body.setCircle(this.cup.width / 4)                         //to add the physics cup body to the circle size
        this.cup.body.setOffset(this.cup.width / 4)                         //to set the offset to make it almost at the center
        this.cup.body.setImmovable(true)                                        

        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball')    
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.setCollideWorldBounds(true)                                                   //to ensure it stays in the screen
        this.ball.body.setBounce(0.5)                                                           //half bounc-iness
        this.ball.body.setDamping(true).setDrag(0.5)                                            //to create drag to simulate a grass-y feel

        // add walls
        let wallA = this.physics.add.sprite(0, height / 4, 'wall')                              //variable of the wall
        wallA.setX(Phaser.Math.Between(0 + wallA.width / 2, width - wallA.width / 2))           //random wall movement
        wallA.body.setImmovable(true)                                                           //collison

        let wallB = this.physics.add.sprite(0, height / 2, 'wall')                              
        wallB.setX(Phaser.Math.Between(0 + wallB.width / 2, width - wallB.width / 2))
        wallB.body.setImmovable(true)   


        // add one-way

        // add pointer input
        this.input.on('pointerdown', (pointer) => {                                             //this is an arrow function //pointerdown is defined by Phaser
            let shotDirection = pointer.y <= this.ball.y ? 1 : -1                               //variable to see if the y position lower than or higher than the y position of the ball. 1 or -1 if to flip the velocity                                             
            
            this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X,
            this.SHOT_VELOCITY_X))                                                              //built-in Phaser Math

            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN,
            this.SHOT_VELOCITY_Y_MAX) * shotDirection)                                          //built-in Phaser Math

            //this.SHOT_VELOCITY_Y_MAX * shotDirection
        })

        // cup/ball collision
        //this.physics.add.collider(this.ball, this.cup)                                        //the ball collide with the cup (just this alone will NOT make it go in the cup)
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {                         
            ball.destroy()
        })


        // ball/wall collision

        // ball/one-way collision
    }

    update() {

    }
}



/*
CODE CHALLENGE
Try to implement at least 3/4 of the following features during the remainder of class (hint: each takes roughly 15 or fewer lines of code to implement):
[ ] Add ball reset logic on successful shot
[ ] Improve shot logic by making pointer’s relative x-position shoot the ball in correct x-direction
[ ] Make one obstacle move left/right and bounce against screen edges
[ ] Create and display shot counter, score, and successful shot percentage
*/