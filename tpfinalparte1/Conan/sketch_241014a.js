// Alumno: Tomás Valentino Pianelli
// Numero de legaho: 119110/7

let misImagenes = {};
let pantallas = {};
let pantallaActiva = "pantalla1";
let botones = [];
let textosPantallas = {}; // Almacenar los textos para cada pantalla
let textoPantalla = []; // Cargar el archivo texto.txt

let totalPantallas = 28; // Cambiar a 28 pantallas

function preload() {
  // Cargar manualmente cada imagen
  for (let i = 1; i <= totalPantallas; i++) {
    misImagenes["pantalla" + i] = loadImage("data/imagen" + i + ".png");
  }

  // Cargar el archivo de texto
  textoPantalla = loadStrings("data/texto.txt");
}

function setup() {
  createCanvas(640, 480);
  
  // Asignar textos a cada pantalla
  for (let i = 1; i <= totalPantallas; i++) {
    textosPantallas["pantalla" + i] = textoPantalla[i - 1]; // Cada línea corresponde a una pantalla
  }

  // Crear dinámicamente las opciones de pantallas
  for (let i = 1; i <= totalPantallas; i++) {
    if (i === 3) {
      pantallas["pantalla" + i] = ["pantalla4", "pantalla9"];
    } else if (i === 5) {
      pantallas["pantalla" + i] = ["pantalla6", "pantalla8"];
    } else if (i === 8) {
      pantallas["pantalla" + i] = ["pantalla10", "pantalla14"];
    } else if (i === 9) {
      pantallas["pantalla" + i] = ["pantalla10", "pantalla14"];
    } else if (i === 15) {
      pantallas["pantalla" + i] = ["pantalla16", "pantalla18"];
    } else if (i === 23) {
      pantallas["pantalla" + i] = ["pantalla24", "pantalla25"];
    } else if (i === 7 || i === 13 || i === 17 || i === 27 || i === 28) {
      pantallas["pantalla" + i] = ["pantalla1"];
    } else {
      pantallas["pantalla" + i] = ["pantalla" + (i + 1)];
    }
  }

  crearBotones();
}

function draw() {
  background(200);
  image(misImagenes[pantallaActiva], 0, 0, width, height); // Mostrar la imagen de la pantalla activa

  // Mostrar el texto correspondiente a la pantalla
  mostrarTexto(textosPantallas[pantallaActiva]);

  mostrarBotones();
}

function mousePressed() {
  for (let boton of botones) {
    if (boton.dentro(mouseX, mouseY)) {
      pantallaActiva = boton.destino;
      crearBotones(); // Actualizar los botones al cambiar de pantalla
    }
  }
}

function crearBotones() {
 botones = [];
  let opciones = pantallas[pantallaActiva];

  for (let i = 0; i < opciones.length; i++) {
    let boton;
    
    if (opciones.length === 2) {
      boton = new Boton(50, height - 100 + i * 50, 500, 40, "Opción " + (i + 1), opciones[i]); // Botones en la parte inferior
    } else if (opciones.length === 1) {
      boton = new Boton(250, height - 80, 100, 40, "→", opciones[0]); // Botón único centrado en la parte inferior
    }
    
    botones.push(boton);
  }
}

function mostrarBotones() {
  for (let boton of botones) {
    boton.mostrar();
  }
}

// Mostrar texto en la pantalla actual
function mostrarTexto(texto) {
  fill(255);
  rect(50, 10, 540, 60); // Área de texto en la parte superior
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(12); // Tamaño de texto reducido
  text(texto, 50, 10, 540, 60); // Ajustar el área de texto
}

class Boton {
  constructor(x, y, w, h, texto, destino) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.texto = texto;
    this.destino = destino;
  }

  mostrar() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.texto, this.x + this.w / 2, this.y + this.h / 2);
  }

  dentro(px, py) {
    return px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h;
  }
}
