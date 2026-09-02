let Spiritomb = [];
let pantalla = 0;
let tipos = [];
let pokedex;
let pokedexInicio;
let spiritombCry;
let musica;
let framesTotales = 19;
let framePokedex = 13;
let animacion = 0;
let direccion = 1;
let velocidad = 14;

const frameMin = 13;
const frameMax = 17;

function preload() {
  for (let i=0; i<19; i++) {
    Spiritomb[i] = loadImage("data/spiritomb/"+nf(i, 3)+".png");
  }
  for (let i=0; i<2; i++) {
    tipos[i] = loadImage("data/tipos/"+nf(i, 2)+".png");
  }
  pokedex = loadImage("data/PokedexPlantilla.png");
  pokedexInicio = loadSound("data/sonidos/Encender.mp3");
  spiritombCry = loadSound("data/sonidos/SpiritombCry.mp3");
  musica = loadSound("data/sonidos/Musica.mp3");
}

function setup() {
  createCanvas(800, 600);
  musica.setVolume(0.1);
}


function draw() {

  if (pantalla === 0) {
    background(0);
    fill(255);

    textSize(60);
    text("¿Encender?", 200, 260);

    textSize(50);
    text("Sí", 190, 400);
    text("No", 490, 400);
  } else if (pantalla === 1) {
    dibujarPokedex();
  } else if (pantalla === 2) {
    dibujarZoom();
  }
}

function dibujarPokedex() {
  image(pokedex, 0, 0, 800, 600);

  push();
  stroke(5);
  noFill();
  rect(13, 69, 307, 307);
  pop();
  image(Spiritomb[framePokedex], 15, 71, 303, 303);
  image(tipos[1], 459, 204, 142, 42);
  image(tipos[0], 613, 204, 142, 42);

  push();
  textSize(55);
  fill(255);
  text("N.° 0442", 390, 115);
  pop();

  push();
  textSize(45);
  fill(0);
  text("Spiritomb", 400, 162);
  pop();

  push();
  textSize(35);
  fill(0);
  text("1,0 m", 554, 315);
  text("108,0 kg", 554, 365);
  textSize(20);
  text("[Ver Más]", 337, 257);
  pop();

  push();
  fill(0);
  textSize(30);
  text("Spiritomb esta compuesto de 108 espíritus. \nFue unido a una Piedra Espíritu para evitar \nque hiciera más fechorías.", 68, 456);
  pop();


  framePokedex = frameBucle(framePokedex, frameMin, frameMax, velocidad);
}

function dibujarZoom() {
  background(0);
  image(Spiritomb[animacion], 0, 0, width, height);

  if (frameCount % velocidad === 0) {
    animacion += direccion;

    if (animacion === 13 && direccion === 1) {
      spiritombCry.play();
    }

    if (animacion >= 18) {
      animacion = 13;
      direccion = -1;
    }

    if (direccion === -1 && animacion <= 0) {
      pantalla = 1;
      animacion = 0;
      direccion = 1;
    }
  }
}

function frameBucle(frameActual, min, max, vel){
  if (frameCount % vel === 0) {
    frameActual++;
    if (frameActual > max) {
      frameActual = min;
    }
  }
  return frameActual;
}

function botonPresionado(x, y, ancho, alto){
  return (mouseX >= x && mouseX <= x + ancho && mouseY >= y && mouseY <= y + alto);
}

function mousePressed() {
  if (pantalla === 0) {
    if (botonPresionado(177, 355, 70, 53)) {
      pantalla = 1;
      pokedexInicio.play();
      musica.loop();
    }
  } else if (pantalla === 1) {
    if (botonPresionado(330, 201, 95, 97)) {
      pantalla = 2;
    }
  }
}
