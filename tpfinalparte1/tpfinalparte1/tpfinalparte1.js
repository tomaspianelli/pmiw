// TP#Final Parte 1 - Comisión 5, Leo Garay
// Tomas Pianelli 119110/7 - Agustin Nieto 119101/6
// El Ruiseñor de Emperador
// Video: https://www.youtube.com/watch?v=Ol72iO1Eu54

let pantalla = 0;
let textos = [];
let imagenes = [];
let textosNotas = []; 
let parrafos = []; 
let titulos = [];
let botonSI = "SI";
let botonNO = "NO";
let botonEMP = "COMENZAR";
let botonRESET = "REINICIAR";
let botonCONT = "CONTINUAR";
let botonSOUND = "SONIDO";
let sonido;
let cant = 21; 
let transiciones = [];
let textoSI = "";
let textoNO = "";

function preload() { 
  textosNotas = loadStrings("data/textos.txt");

  for (let i = 0; i < 21; i++) {
    imagenes[i] = loadImage("data/imagenes/imagen_" + nf(i+1, 2) + ".png");
  }

  parrafos = loadFont("data/fuentes/BebasNeue-Regular.ttf");
  titulos = loadFont("data/fuentes/LilitaOne-Regular.ttf");

  soundFormats('mp3');
  sonido = loadSound('data/musicaemperador');
}

function setup() {
  createCanvas(640, 480);

  for (let i = 0; i < textosNotas.length; i++) {
    let linea = textosNotas[i];
    let lineaArray = split(linea, "#");
    textos[lineaArray[0]] = lineaArray[1];
    
    sonido.loop();
  }
}

function draw() {
  background(200);

  image(imagenes[pantalla], 0, 0, 640, 480);

  // Texto
  fill(255);
  textSize(30);
  textAlign(CENTER);
  textFont(parrafos);
  text(textos[pantalla], 30, 50, 580, 250);

  if (pantalla === 0) {
    dibujobotonEMP();
    fill(255);
    textSize(40);
    textFont(titulos);
    text("El Ruiseñor de Emperador", width/2, 60);
    textSize(30);
    textFont(parrafos);
    text("Tomas Pianelli 119110/7\nAgustin Nieto 119101/6", width/2, 120);

 for (let i = 0; i < cant; i++) {
  transiciones[i] = i + 1;
}
transiciones[14] = 20;
transiciones[16] = 20;
transiciones[17] = 20;
  
  } else if (pantalla === 20) {
    dibujobotonRESET();

  } else if (pantalla === 4 || pantalla === 8 || pantalla === 12) {
    dibujoboton();

  } else {
    dibujobotonCONT();
  }
}

function dibujoboton() {
  textFont(parrafos);
  textSize(16);
  textAlign(LEFT);

  if (pantalla === 4) {
    textoSI = "Seguir escuchando al ruiseñor real";
    textoNO = "Fascinarse con el ruiseñor mecánico";
  } else if (pantalla === 8) {
    textoSI = "Llamar al ruiseñor real";
    textoNO = "Aceptar su muerte en paz,\nrecordando lo aprendido";
  } else if (pantalla === 12) {
    textoSI = "Aferrarse al ruiseñor mecánico.";
    textoNO = "Aceptar su muerte en paz,\nrecordando lo aprendido";
  }

  fill(255);
  rect(90, height - 100, 200, 70, 10); 
  fill(0);
  text(textoSI, 105, height - 68, 180); 

  fill(255);
  rect(350, height - 100, 200, 70, 10);
  fill(0);
  text(textoNO, 365, height - 68, 180); 
}

function dibujobotonCONT() {
  textSize(20);
  textAlign(CENTER);
  fill(255);
  rect(width/2 - 50, height - 80, 100, 50);
  fill(0);
  text(botonCONT, width/2, height - 45);
}

function dibujobotonRESET() {
  textSize(20);
  textAlign(CENTER);
  fill(255);
  rect(width/2 - 50, height - 80, 100, 50);
  fill(0);
  text(botonRESET, width/2, height - 45);
}

function dibujobotonEMP() {
  textSize(20);
  textAlign(CENTER);
  fill(255);
  rect(width/2 - 50, height - 80, 100, 50);
  fill(0);
  text(botonEMP, width/2, height - 45);
}

function avanzarPantalla() {
  pantalla = transiciones[pantalla];
}

function mousePressed() {

  if (pantalla === 0 && colisionBoton(width/2 - 50, height - 80, 100, 50)) {
    sonido.play();
    pantalla = 1;
    return;
  }

  if (pantalla === 4 || pantalla === 8 || pantalla === 12) {
    if (colisionBoton(90, height - 100, 200, 70)) {
      if (pantalla === 4) pantalla = 5;
      if (pantalla === 8) pantalla = 13;
      if (pantalla === 12) pantalla = 15;
    } else if (colisionBoton(350, height - 100, 200, 70)) {
      if (pantalla === 4) pantalla = 9;
      if (pantalla === 8) pantalla = 17;
      if (pantalla === 12) pantalla = 17;
    }
    return;
  }

  if (pantalla === 20 && colisionBoton(width/2 - 50, height - 80, 100, 50)) {
    pantalla = 0;
    sonido.stop();
    return;
  }

  if (colisionBoton(width/2 - 50, height - 80, 100, 50)) {
    avanzarPantalla();
  }
}

function colisionBoton(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}
