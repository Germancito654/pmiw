/*
Integrantes: Niklas German Rocha y Sebastian Llaque Blanco
Comision: 3
Legajos: 125672/7 y 125611/3

Link del video: https://youtu.be/Agj1WnM-0p8
*/

let estado = "MENU";
let imgHab1, imgHab2, imgPalanca;
let nombres = ["Extintor", "Cuerda", "Uniforme", "Varillas", "Fusibles"];
let sprites0 = [];
let sprites1 = [];
let musica;

let opcionesMenu = ["JUGAR", "INSTRUCCIONES", "CRÉDITOS"];
let pasos = [
  "1. Hacé clic en un objeto para verlo de cerca. Podés TOMARLO o DEJARLO.",
  "2. Usá las flechas < > de los costados para ir de una sala a la otra.",
  "3. En el inventario, clic en un objeto y después en otro para combinarlos.",
  "4. ¿Tal vez la puerta se pueda forzar con una palanca?",
  "5. Si el pánico llega al 100% perdés. Tecla R: reiniciar el juego."
];
let textoCreditos = "EXPEDIENTE: ESCAPE DE LA MORGUE\n\n" +
  "Desarrollado por: Niklas Rocha German\n" +
  "         y Sebastian Llaque Blanco\n\n" +
  "Materia: PMIW\n" +
  "Hecho con: p5.js\n" +
  "Estado: Terminado";
let inicioCreditos = 0;

let salas = [];
let salaActual = 0;
let inventario;
let panico;
let objetoVisto = null;
let fuerza = 0;
let mensaje = "";
let tiempoMensaje = 0;

function preload() {
  imgHab1 = loadImage("data/img/Habitacion1.png");
  imgHab2 = loadImage("data/img/Habitacion2.png");
  imgPalanca = loadImage("data/img/Palanca.png");

  for (let i = 0; i < nombres.length; i++) {
    sprites0.push(loadImage("data/img/" + nombres[i] + "/00.png"));
    sprites1.push(loadImage("data/img/" + nombres[i] + "/01.png"));
  }
  
  musica = loadSound("data/Musica.mp3");
}

function setup() {
  createCanvas(800, 400);
  textFont("Georgia");
  imgPalanca = imgPalanca.get(floor(imgPalanca.width * 0.2), floor(imgPalanca.height * 0.27),
                              floor(imgPalanca.width * 0.58), floor(imgPalanca.height * 0.54));

  reiniciar();
  estado = "MENU";
  
  musica.setVolume(0.1);
}

function reiniciar() {
  salas = [];
  salas.push(new Sala(imgHab1));
  salas.push(new Sala(imgHab2));

  salas[0].zonas.push(new Zona(512, 100, 66, 150, 1, ">"));
  salas[1].zonas.push(new Zona(2, 20, 64, 110, 0, "<"));

  let s = salas[1].objetos;
  s.push(new Objeto("Extintor", sprites0[0], sprites1[0], "Un extintor oxidado. No sirve para abrir nada.", true));
  s.push(new Objeto("Cuerda", sprites0[1], sprites1[1], "Una soga gruesa. Sirve para atar cosas.", true));
  s.push(new Objeto("Uniforme", sprites0[2], sprites1[2], "Un uniforme de enfermera. Los bolsillos están vacíos.", true));
  s.push(new Objeto("Varillas", sprites0[3], sprites1[3], "Dos varillas de metal largas y resistentes.", true));
  s.push(new Objeto("Caja de fusibles", sprites0[4], sprites1[4], "No hay electricidad. Habrá que forzar la puerta a mano.", false));
  
  salaActual = 0;
  inventario = new Inventario();
  panico = new BarraPanico();
  fuerza = 0;
  objetoVisto = null;
  decir("Despertaste encerrado. Buscá algo para forzar la puerta.");
  estado = "JUEGO";
}

function draw() {
  background(0);

  if (estado === "MENU") {
    dibujarMenu();
  } else if (estado === "AYUDA") {
    dibujarAyuda();
  } else if (estado === "CREDITOS") {
    dibujarCreditos();
  } else {
    if (estado === "JUEGO" || estado === "VER" || estado === "FUERZA") {
      panico.actualizar();
      if (panico.valor >= 100) {
        estado = "PERDISTE";
        beep(200, 300);
      }
    }

    if (estado === "FUERZA") {
      fuerza = fuerza - 0.3;
      if (fuerza < 0) {
        fuerza = 0;
      }
      if (fuerza >= 100) {
        estado = "GANASTE";
        beep(523, 150);
        setTimeout(function () { beep(784, 300); }, 200);
      }
    }

    dibujarJuego();

    if (estado === "VER") {
      dibujarVer();
    } else if (estado === "GANASTE" || estado === "PERDISTE") {
      dibujarFin();
    }
  }
}

function dibujarMenu() {
  image(imgHab2, 0, 0, 800, 400);
  fill(0, 175);
  noStroke();
  rect(0, 0, 800, 400);

  if (random(1) < 0.06) {
    fill(0, 110);
    rect(0, 0, 800, 400);
  }

  push();
  translate(230, 70);
  rotate(-0.06);
  stroke(255, 230);
  strokeWeight(2);
  line(0, -60, 0, 0);
  fill(235, 225, 190);
  stroke(80);
  rect(-140, 0, 280, 230, 10);
  fill(20);
  noStroke();
  ellipse(0, 18, 14, 14);
  fill(120, 20, 20);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("ESCAPE", 0, 85);
  textSize(26);
  text("DE LA MORGUE", 0, 130);
  fill(60);
  textSize(13);
  text("Etiqueta Nº 13", 0, 180);
  text("Hora de salida: ???", 0, 200);
  pop();

  for (let i = 0; i < opcionesMenu.length; i++) {
    dibujarCajon(opcionesMenu[i], 470, 60 + i * 100, 290, 75);
  }
}

function dibujarAyuda() {
  image(imgHab1, 0, 0, 800, 400);
  fill(0, 190);
  noStroke();
  rect(0, 0, 800, 400);
  fill(0, 120);
  rect(66, 28, 680, 320, 4);
  fill(235, 225, 190);
  rect(60, 20, 680, 320, 4);

  fill(90, 20, 20);
  textAlign(CENTER, CENTER);
  textSize(22);
  text("INFORME DE EVACUACIÓN", 400, 45);

  fill(40);
  textAlign(LEFT, TOP);
  textSize(13);
  for (let i = 0; i < pasos.length; i++) {
    text(pasos[i], 90, 80 + i * 45, 390, 42);
  }

  fill(90, 20, 20);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("RECETA DE LA PALANCA", 610, 90);
  dibujarImg(sprites1[1], 515, 105, 70, 70);
  dibujarImg(sprites1[3], 635, 105, 70, 70);
  fill(40);
  textSize(34);
  text("+", 610, 140);
  text("=", 610, 200);
  dibujarImg(imgPalanca, 540, 225, 140, 60);
  
  push();
  translate(610, 305);
  rotate(-0.15);
  noFill();
  stroke(200, 30, 30);
  strokeWeight(3);
  rect(-60, -15, 120, 30, 4);
  noStroke();
  fill(200, 30, 30);
  textSize(18);
  text("URGENTE", 0, 0);
  pop();

  dibujarCajon("VOLVER", 325, 352, 150, 40);
}

function dibujarCreditos() {
  image(imgHab2, 0, 0, 800, 400);
  fill(0, 190);
  noStroke();
  rect(0, 0, 800, 400);
  fill(200, 170, 110);
  rect(150, 18, 130, 24, 6);
  fill(225, 200, 140);
  rect(150, 34, 500, 300, 4);
  fill(80, 50, 20);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("CONFIDENCIAL", 215, 30);

  let letras = floor((millis() - inicioCreditos) / 45);
  if (letras > textoCreditos.length) {
    letras = textoCreditos.length;
  }
  textFont("Courier New");
  fill(30);
  textAlign(LEFT, TOP);
  textSize(15);
  text(textoCreditos.substring(0, letras), 180, 65);
  textFont("Georgia");

  if (letras >= textoCreditos.length) {
    push();
    translate(540, 270);
    rotate(-0.2);
    noFill();
    stroke(190, 30, 30);
    strokeWeight(4);
    rect(-80, -22, 160, 44, 6);
    noStroke();
    fill(190, 30, 30);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("CASO CERRADO", 0, 0);
    pop();
  }

  dibujarCajon("VOLVER", 325, 352, 150, 40);
}

function dibujarCajon(texto, x, y, w, h) {
  let desp = 0;
  if (cajonEncima(x, y, w, h)) {
    desp = -18;
  }

  fill(5);
  noStroke();
  rect(x, y, w, h, 4);

  fill(125, 130, 135);
  stroke(40);
  strokeWeight(2);
  rect(x + desp, y, w, h, 4);

  let placaY = y + (h - 24) / 2;
  if (h > 50) {
    noStroke();
    fill(70);
    rect(x + desp + w / 2 - 35, y + 10, 70, 8, 4);
    placaY = y + h - 34;
  }

  fill(225);
  stroke(60);
  strokeWeight(1);
  rect(x + desp + w / 2 - 75, placaY, 150, 24, 3);
  noStroke();
  fill(20);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(texto, x + desp + w / 2, placaY + 12);
}

function cajonEncima(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function dibujarJuego() {
  salas[salaActual].mostrar();

  if (panico.valor > 70) {
    fill(255, 0, 0, (panico.valor - 70) * 2);
    noStroke();
    rect(0, 0, 580, 400);
  }

  if (millis() < tiempoMensaje && estado !== "FUERZA") {
    fill(0, 180);
    noStroke();
    rect(0, 368, 580, 32);
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    text(mensaje, 290, 384);
  }

  if (estado === "FUERZA") {
    fill(0, 190);
    noStroke();
    rect(60, 292, 460, 66, 6);
    fill(255, 230, 0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("¡APRETÁ ESPACIO RÁPIDO!", 290, 310);
    fill(30);
    rect(80, 328, 420, 16);
    fill(90, 220, 90);
    rect(80, 328, 420 * fuerza / 100, 16);
  }

  fill(20);
  noStroke();
  rect(580, 0, 220, 400);
  panico.mostrar(590, 25, 200, 16);
  inventario.mostrar();
  dibujarBoton("REINICIAR", 639, 355, 98, 30);
  dibujarBoton("MENÚ", 741, 355, 98, 30);
}

function dibujarVer() {
  fill(0, 215);
  noStroke();
  rect(0, 0, 800, 400);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(22);
  text(objetoVisto.nombre, 400, 25);
  dibujarImg(objetoVisto.img1, 200, 50, 400, 220);
  textSize(14);
  text(objetoVisto.texto, 400, 295);

  if (objetoVisto.tomable) {
    dibujarBoton("TOMAR", 330, 355, 120, 36);
    dibujarBoton("DEJAR", 470, 355, 120, 36);
  } else {
    dibujarBoton("CERRAR", 400, 355, 120, 36);
  }
}

function dibujarFin() {
  fill(0, 200);
  noStroke();
  rect(0, 0, 800, 400);
  textAlign(CENTER, CENTER);
  textSize(34);

  if (estado === "GANASTE") {
    fill(100, 255, 100);
    text("¡GANASTE! ESCAPASTE DE LA MORGUE", 400, 120);
  } else {
    fill(255, 60, 60);
    text("PERDISTE... TE GANÓ EL PÁNICO", 400, 120);
  }

  dibujarBoton("JUGAR DE NUEVO", 400, 220, 220, 45);
  dibujarBoton("MENÚ", 400, 290, 220, 45);
}

function dibujarBoton(texto, bx, by, bw, bh) {
  if (botonEncima(bx, by, bw, bh)) {
    fill(110, 45, 45);
  } else {
    fill(58, 28, 28);
  }
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(bx, by, bw, bh, 8);
  rectMode(CORNER);
  noStroke();
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(texto, bx, by);
}

function botonEncima(bx, by, bw, bh) {
  return mouseX > bx - bw / 2 && mouseX < bx + bw / 2 && mouseY > by - bh / 2 && mouseY < by + bh / 2;
}

function dibujarImg(img, x, y, w, h) {
  let escala = min(w / img.width, h / img.height);
  let ancho = img.width * escala;
  let alto = img.height * escala;
  image(img, x + (w - ancho) / 2, y + (h - alto) / 2, ancho, alto);
}

function decir(texto) {
  mensaje = texto;
  tiempoMensaje = millis() + 3000;
}

function beep(frecuencia, duracion) {
  if (typeof p5.Oscillator !== "function") {
    return;
  }
  let osc = new p5.Oscillator("square");
  osc.freq(frecuencia);
  osc.amp(0.1);
  osc.start();
  setTimeout(function () { osc.stop(); }, duracion);
}

function mousePressed() {
  if (musica && !musica.isPlaying()) {
        musica.loop();
      }

  if (estado === "MENU") {
    for (let i = 0; i < opcionesMenu.length; i++) {
      if (cajonEncima(470, 60 + i * 100, 290, 75)) {
        if (i === 0) {
          reiniciar();
        } else if (i === 1) {
          estado = "AYUDA";
        } else {
          estado = "CREDITOS";
          inicioCreditos = millis();
        }
      }
    }
  }
  else if (estado === "AYUDA" || estado === "CREDITOS") {
    if (cajonEncima(325, 352, 150, 40)) {
      estado = "MENU";
    }
  }
  else if (estado === "GANASTE" || estado === "PERDISTE") {
    if (botonEncima(400, 220, 220, 45)) {
      reiniciar();
    } else if (botonEncima(400, 290, 220, 45)) {
      estado = "MENU";
    }
  }
  else if (estado === "VER") {
    if (objetoVisto.tomable) {
      if (botonEncima(330, 355, 120, 36)) {
        inventario.agregar(objetoVisto);
        objetoVisto.visible = false;
        beep(660, 100);
        decir("Tomaste: " + objetoVisto.nombre);
        estado = "JUEGO";
      } else if (botonEncima(470, 355, 120, 36)) {
        estado = "JUEGO";
      }
    } else if (botonEncima(400, 355, 120, 36)) {
      estado = "JUEGO";
    }
  }
  else if (estado === "JUEGO" || estado === "FUERZA") {
    if (botonEncima(639, 355, 98, 30)) {
      reiniciar();
      return;
    }
    if (botonEncima(741, 355, 98, 30)) {
      estado = "MENU";
      return;
    }

    if (estado === "JUEGO") {
      if (mouseX >= 580) {
        inventario.click();
      } else {
        clicEnSala();
      }
    }
  }
}

function clicEnSala() {
  let sala = salas[salaActual];

  for (let i = 0; i < sala.objetos.length; i++) {
    let o = sala.objetos[i];
    if (o.mouseEncima()) {
      if (inventario.sel !== -1) {
        decir("Eso no tiene efecto acá.");
        inventario.sel = -1;
      } else {
        objetoVisto = o;
        estado = "VER";
        beep(600, 60);
      }
      return;
    }
  }

  for (let i = 0; i < sala.zonas.length; i++) {
    if (sala.zonas[i].mouseEncima()) {
      salaActual = sala.zonas[i].destino;
      inventario.sel = -1;
      beep(200, 100);
      return;
    }
  }

  if (salaActual === 0 && mouseX > 31 && mouseX < 104 && mouseY > 164 && mouseY < 264) {
    usarPuerta();
    return;
  }

  inventario.sel = -1;
}

function usarPuerta() {
  let item = inventario.itemElegido();
  if (item !== null && item.nombre === "Palanca") {
    estado = "FUERZA";
    fuerza = 10;
    inventario.sel = -1;
  } else if (item !== null) {
    decir("Eso no sirve para abrir la puerta.");
    beep(150, 250);
  } else {
    decir("Está trabada. Necesitás una palanca (elegila en el inventario).");
    beep(150, 250);
  }
}

function keyPressed() {
  if (estado === "FUERZA" && key === " ") {
    fuerza = fuerza + 7;
    beep(random(100, 150), 60);
  }
  if ((estado === "JUEGO" || estado === "VER" || estado === "FUERZA") && (key === "r" || key === "R")) {
    reiniciar();
  }
  if (key === " ") {
    return false;
  }
}
