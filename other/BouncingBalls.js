// Variables
let balls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // size
let Xpos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // positions
let Ypos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let Xvel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // velocity
let Yvel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// colors
let colorRed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let colorGreen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let colorBlue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// canvas size
let canvasHeight = 1000;
let canvasWidth = 1000;

// setup function
function setup() {
    // variable for spawn check
    

    // creating canvas
    createCanvas(canvasWidth, canvasHeight); //? currently spawns after the content. It needs to be somewhere in the content if thats possible.

    // assigning sizes, starting positions and velocities
    for (let i = 0; i < balls.length; i++) {
        balls[i] = Math.random() * 90 + 10; // size
        Xvel[i] = Math.random() * 3 - 1.5; // velocity on X-axis
        Yvel[i] = Math.random() * 3 - 1.5; // velocity on Y-axis
        colorRed[i] = Math.random() * 255; // red component of color
        colorGreen[i] = Math.random() * 255; // green component of color
        colorBlue[i] = Math.random() * 255; // blue component of color

        // making speed 0.5 more
        if (Xvel[i] >= 0) { // positive speed
            Xvel[i] += 0.5;
        } else { // negative speed
            Xvel[i] -= 0.5;
        }
        if (Yvel[i] >= 0) { // positive speed
            Yvel[i] += 0.5;
        } else { // negative speed
            Yvel[i] -= 0.5;
        }

        // setting up for loop
        validSpawn = false;

        // check valid spawn location
        while(validSpawn == false) {
            
            // setting default
            validSpawn = true;

            // setting spawn
            Xpos[i] = Math.random() * (1000 - (balls[i])) + (balls[i] / 2);
            Ypos[i] = Math.random() * (1000 - (balls[i])) + (balls[i] / 2);

            // looping through all previous circles
            if (i != 0) {
                for (let j = 0; j < i; j++) {
                    if (checkCollision(i, j) == true) { // spawn is invalid
                        validSpawn = false;
                    }      
                } 
            }            
        }
    }    

    frameRate(144); // sets a fixed framerate to avoid clipping issues
}

// looping draw function
function draw() {
    // calculating new frame positions
    for (let i = 0; i < Xpos.length; i++) {
        Xpos[i] += Xvel[i];
        Ypos[i] += Yvel[i];

        // checking collisions    
        if (Xpos[i] - (balls[i] / 2) <= 0 || Xpos[i] + (balls[i] / 2) >= canvasWidth) {
            Xvel[i] *= -1; 
        }
        if (Ypos[i] - (balls[i] / 2) <= 0 || Ypos[i] + (balls[i] / 2) >= canvasHeight) {
            Yvel[i] *= -1;
        }
    }

    // check collision with other balls
    for (let l = 0; l < Xpos.length; l++) {
        for (let j = 0; j < Xpos.length; j++) {

            // checking collision
            if (checkCollision(l, j) == true) {

                //bouncing both balls
                bounceBall(l, j);
                bounceBall(j, l);
            }
        }
    }

    // drawing new frame
    background(200, 200, 200);

    for (let k = 0; k < Xpos.length; k++) {
        fill(colorRed[k], colorGreen[k], colorBlue[k]);
        circle(Xpos[k], Ypos[k], balls[k]);        
    }
}

// check if circles are overlapping
function checkCollision(index1, index2) {

    // gather distance
    let dist = Math.sqrt((Math.abs(Xpos[index1] - Xpos[index2]) * Math.abs(Xpos[index1] - Xpos[index2])) + (Math.abs(Ypos[index1] - Ypos[index2]) * Math.abs(Ypos[index1] - Ypos[index2])))
            
    // check if circles colliding
    if (dist <= (balls[index1] / 2 + balls[index2] / 2) && index1 > index2) {
        return true; // collision
    } else {
        return false; // no collision
    }
}

// function that bounces ball of other ball
function bounceBall(index1, index2) 
{
    // getting length of vector
    vectLength = Math.sqrt(Xvel[index1] * Xvel[index1] + Yvel[index1] * Yvel[index1]);
    vectLength2 = Math.sqrt(Xvel[index2] * Xvel[index2] + Yvel[index2] * Yvel[index2]);

    // getting normal vector
    XvectNorm = Xpos[index2] - Xpos[index1];
    YvectNorm = Ypos[index2] - Ypos[index1];

    // getting radian angle of velocity vector and normal
    angleVect = getAngle(Xvel[index1], Yvel[index1]);
    angleNorm = getAngle(XvectNorm, YvectNorm);

    // mirroring the vector in the normal vector
    angleDiff = angleVect - angleNorm;
    angleVect -= 2 * angleDiff;
    if (angleVect > 2*Math.PI) {
        angleVect -= 2*Math.PI;
    } else if (angleVect < 0) {
        angleVect += 2*Math.PI;
    } //? else it's fine

    // calculating strength
    velDiff = Math.abs(vectLength - vectLength2);
    velDiff *= 0.2;
    if (vectLength < vectLength2) { // ball is slower than ball collided with
        velDiff += 1;
    } else {
        velDiff = 1 - velDiff;

        // non-negative protection
        if (velDiff <= 0) {
            velDiff = 1;
        }
    }

    // returning angle to vector
    if (angleDiff > 0.5 * Math.PI) { // don't flip
        Xvel[index1] = Math.cos(angleVect) * vectLength * velDiff;
        Yvel[index1] = Math.sin(angleVect) * vectLength * velDiff;
    } else { // flip
        Xvel[index1] = -Math.cos(angleVect) * vectLength * velDiff;
        Yvel[index1] = -Math.sin(angleVect) * vectLength * velDiff;
    }
    
}

// getting the angle of a vector in radian
function getAngle(Xvar, Yvar) 
{
    if (Xvar >= 0 && Yvar >= 0) { // top right
        return Math.atan(Yvar / Xvar);
    } else if (Xvar < 0 && Yvar >= 0) { // top left corner
        return Math.PI + Math.atan(Yvar / Xvar);
    } else if (Xvar < 0 && Yvar <0) { // bottom left corner
        return Math.PI + Math.atan(Yvar / Xvar);
    } else { // bottom right corner
        return 2*Math.PI + Math.atan(Yvar / Xvar);
    }
}