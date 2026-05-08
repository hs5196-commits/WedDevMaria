const name = localStorage.getItem("username");

if (name) {
  const greetingEl = document.getElementById("greeting");

  if (greetingEl) {
    greetingEl.innerText =
      "Hello " + name + ", welcome to Maria's portfolio.";
  }
}

//-----------------------//
//First entry -> entry.html working//
const fromEntry = localStorage.getItem("fromEntry");

if (fromEntry === "true" && !window.location.pathname.includes("welcome.html")) {
    
}

//-----------------------//
// How to add stars //
// https://devjaewoo.tistory.com/8 //
// https://timothypoon.com/blog/ //
//-----------------------//

var WIDTH = window.innerWidth; //size of the browser window//
var HEIGHT = window.innerHeight;
var MAX_PARTICLES = (WIDTH * HEIGHT) / 20000; // Number of stars based on screen size
var DRAW_INTERVAL = 60; // how often the screen updates - speed of the anmation 1000ms - 1 second
var canvas = document.querySelector('.background'); //Where stars will be
var context = canvas.getContext('2d'); // drawing tool 
var gradient = null; //varibale for glow effect 
var pixies = new Array(); //create an array to store all stars

function setDimensions(e) {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    MAX_PARTICLES = (WIDTH * HEIGHT) / 20000;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    console.log("Resize to " + WIDTH + "x" + HEIGHT);
} //updates the canvas size and number of stars when the window size is resized

setDimensions();
window.addEventListener('resize', setDimensions);

function Circle() {
    this.settings = {ttl:8000, xmax:5, ymax:2, rmin:8, rmax:15, drt:1};

    this.reset = function() {
        this.x = WIDTH*Math.random();                                                   //X location random (0 ~ WIDTH)
        this.y = HEIGHT*Math.random();                                                  //Y location random (0 ~ HEIGHT)
        this.r = ((this.settings.rmax-1)*Math.random()) + 1;                            //half size random (1 ~ rmax)
        this.dx = (Math.random()*this.settings.xmax) * (Math.random() < .5 ? -1 : 1);   //X moving distance random (-xmax ~ xmax)
        this.dy = (Math.random()*this.settings.ymax) * (Math.random() < .5 ? -1 : 1);   //Y moving distance random (-ymax ~ ymax)
        this.hl = (this.settings.ttl/DRAW_INTERVAL)*(this.r/this.settings.rmax);        //aliveness time (반지름 크기에 비례)
        this.rt = 0;                                                                    //aliveness (0 -> hl -> 0)
        this.settings.drt = Math.random()+1;                                             //dying (1 ~ 2)
        this.stop = Math.random()*.2+.4;                                                // spreadness(0.4 ~ 0.6)
    }

    this.fade = function() {
        this.rt += this.settings.drt;   

        if(this.rt >= this.hl) {
            this.rt = this.hl;
            this.settings.drt = this.settings.drt*-1;
        } else if(this.rt < 0) {
            this.reset();              
        }
    } //Updting the stars lifetime to make it fade in/out rests it when it disappears

    this.draw = function() {
        var newo = (this.rt/this.hl); 
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);  
        context.closePath();
        //Draws the star with a glowing effect based on its current opacity.

        var cr = this.r*newo; 
        gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr < this.settings.rmin) ? this.settings.rmin : cr); 
        gradient.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
        gradient.addColorStop(this.stop, 'rgba(77,101,181,'+(newo*.6)+')');
        gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
        context.fillStyle = gradient;
        context.fill();
    }
       //Moves the star across the screen and bounces it when it hits the edges.

    this.move = function() { //// Update the star’s position based on its movement
        this.x += (1 - this.rt/this.hl)*this.dx; // Move horizontally
        this.y += (1 - this.rt/this.hl)*this.dy;// Move vertically
        if(this.x > WIDTH || this.x < 0) this.dx *= -1; // Reverse direction if it hits left/right edge
        if(this.y > HEIGHT || this.y < 0) this.dy *= -1;  // Reverse direction if it hits top/bottom edge
    }
        //draws each star with a glow and updates its movement (animation)
}


function draw() { // Main animation loop
    context.clearRect(0, 0, WIDTH, HEIGHT); // Clear the canvas before redrawing

    for(var i=pixies.length; i<MAX_PARTICLES; i++) {
        pixies.push(new Circle());// Create new stars if needed
        pixies[i].reset(); // Initialize each new star
    }

    for(var i = 0; i < MAX_PARTICLES; i++) {
        pixies[i].fade();// Update opacity (fade in/out)
        pixies[i].move(); // Update position (movement)
        pixies[i].draw();// Draw the star on canvas
    }
}

setInterval(draw, DRAW_INTERVAL); //Repeats the draw function continuously to create motion.

//-----------------------//
//projects page//
$(function () {
  if ($('#Container').length) {
    $('#Container').mixItUp();
  }
});

//-----------------------//
// Projects on index.html//
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');
const grid = document.querySelector('.project-grid.horizontal');

leftBtn.addEventListener('click', () => {
  grid.scrollBy({ left: -350, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  grid.scrollBy({ left: 350, behavior: 'smooth' });
});

//-----------------------//
// Playing Cards //
const card = document.querySelector('.card-3d'); // Select the card element
document.addEventListener('mousemove', (e) => { // Track mouse movement on the screen
  let x = (window.innerWidth / 2 - e.clientX) / 25;  // Calculate horizontal rotation based on mouse position
  let y = (window.innerHeight / 2 - e.clientY) / 25;  // Calculate vertical rotation based on mouse position

  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
}); // Apply 3D rotation to the card

card.addEventListener('mouseleave', () => { // Detect when the mouse leaves the card
  card.style.transform = "rotateY(0deg) rotateX(0deg)"; // Reset the card to original position
});