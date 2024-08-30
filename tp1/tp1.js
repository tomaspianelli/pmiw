// Alumno: Tomás Valentino Pianelli
// Numero de legajo: 119110/7
// Artista: Luis Sacilotto
// Video de YouTube: https://youtu.be/uDbvkGyD1wY

let img;
let rotacion = 0; // Variable para almacenar el ángulo de rotación
let rotar = false; // Variable para controlar si debe rotar o no
let moverConMouse = false; // Variable para controlar si deben moverse con el mouse
let explotar = false; // Variable para controlar si debe explotar la imagen
let cant = 100; // Cantidad de rectángulos en la explosión
let tam; // Tamaño de los rectángulos en la explosión

let posXFlechas = 0; // Posición X para el movimiento con las flechas
let posXAWSD = 0; // Posición X para el movimiento con las teclas AWSD

// Posiciones iniciales
let inicioXFlechas = 400; // Primera X
let inicioXAWSD = 600; // Segunda X

let desplazamiento = 10; // Cantidad de píxeles para mover

let tamanoCuadrado = 20;  // Tamaño del cuadrado más pequeño

let fondoInicial;  // Color de fondo inicial
let colorCuadradoInicial1, colorCuadradoInicial2;

let fondoActual;
let colorCuadradoActual1;
let colorCuadradoActual2;

function preload() {
  img = loadImage("data/obra.jpg");
}

function setup() {
  createCanvas(800, 400);
  tam = width / cant;

  fondoInicial = color(144, 164, 174);
  colorCuadradoInicial1 = color(0);
  colorCuadradoInicial2 = color(255);

  fondoActual = fondoInicial;
  colorCuadradoActual1 = colorCuadradoInicial1;
  colorCuadradoActual2 = colorCuadradoInicial2;
}

function draw() {
  background(fondoActual);
  image(img, 0, 0, 400, 400);

  let espacio = 0;  // Espacio entre cuadrados más pequeño

  // Posiciones para las "X"
  let posX1 = moverConMouse ? mouseX - 100 : inicioXFlechas + posXFlechas;
  let posX2 = moverConMouse ? mouseX + 100 : inicioXAWSD + posXAWSD;

  // Dibuja la "X" de la izquierda controlada por las flechas o el mouse, o explota si está en modo explosión
  if (!explotar) {
    dibujarX(posX1, posX1 + 200, 0, height, tamanoCuadrado, espacio);
  } else {
    for (let i = 0; i < cant; i++) {
      let x = floor(random(inicioXFlechas, inicioXFlechas + 200 - tam));
      let y = floor(random(0, height - tam));
      rect(x, y, tam, tam);
    }
  }

  // Dibuja la "X" de la derecha controlada por AWSD o el mouse, o explota si está en modo explosión
  if (!explotar) {
    dibujarX(posX2, posX2 + 200, 0, height, tamanoCuadrado, espacio);
  } else {
    for (let i = 0; i < cant; i++) {
      let x = floor(random(inicioXAWSD, inicioXAWSD + 200 - tam));
      let y = floor(random(0, height - tam));
      rect(x, y, tam, tam);
    }
  }

  if (rotar) {
    rotacion += 5; // Incrementa el ángulo de rotación continuamente
  }
}

function dibujarX(inicioX, finX, inicioY, finY, tamanoCuadrado, espacio) {
  // Dibuja la primera diagonal (de la esquina de arriba izquierda hasta a la esquina de abajo de la derecha)
  for (let i = 0; i <= finX - inicioX; i += tamanoCuadrado + espacio) {
    let x = inicioX + i;
    let y = map(i, 0, finX - inicioX, inicioY, finY); // Escala proporcionalmente a la altura
    push();
    translate(x + tamanoCuadrado / 2, y + tamanoCuadrado / 2);
    rotate(PI / 4 + radians(rotacion));
    if (mouseOverSquare(x, y, tamanoCuadrado)) {
      fill(random(255), random(255), random(255));
    } else {
      fill((i / (tamanoCuadrado + espacio)) % 2 === 0 ? colorCuadradoActual1 : colorCuadradoActual2);
    }
    rect(-tamanoCuadrado / 2, -tamanoCuadrado / 2, tamanoCuadrado, tamanoCuadrado);
    pop();
  }

  // Dibuja la segunda diagonal (de la esquina de arriba derecha a la esquina de abajo izquierda)
  for (let i = 0; i <= finX - inicioX; i += tamanoCuadrado + espacio) {
    let x = inicioX + i;
    let y = map(i, 0, finX - inicioX, finY, inicioY); // Escala proporcionalmente a la altura inversamente
    push();
    translate(x + tamanoCuadrado / 2, y + tamanoCuadrado / 2);
    rotate(PI / 4 + radians(rotacion));
    if (mouseOverSquare(x, y, tamanoCuadrado)) {
      fill(random(255), random(255), random(255));
    } else {
      fill((i / (tamanoCuadrado + espacio)) % 2 === 0 ? colorCuadradoActual1 : colorCuadradoActual2);
    }
    rect(-tamanoCuadrado / 2, -tamanoCuadrado / 2, tamanoCuadrado, tamanoCuadrado);
    pop();
  }
}

function mouseOverSquare(x, y, tamano) {
  return mouseX >= x && mouseX <= x + tamano && mouseY >= y && mouseY <= y + tamano;
}

function mousePressed() {
  rotar = !rotar;
}

function keyPressed() {
  if (key === 'm') {
    moverConMouse = !moverConMouse;
  } else if (key === 'c') {
    let color1 = color(216, 191, 216);
    let color2 = color(173, 216, 230);
    let color3 = color(0);
    let color4 = color(255);
    let color5 = color(128);
    let color6 = color(255, 255, 0);
    let color7 = color(144, 238, 144);

    let nuevoFondo, nuevoColorCuadrado1, nuevoColorCuadrado2;
    do {
      let rand1 = floor(random(7));
      let rand2 = floor(random(7));
      let rand3 = floor(random(7));

      nuevoFondo = (rand1 == 0) ? color1 :
        (rand1 === 1) ? color2 :
        (rand1 === 2) ? color3 :
        (rand1 === 3) ? color4 :
        (rand1 === 4) ? color5 :
        (rand1 === 5) ? color6 : color7;

      nuevoColorCuadrado1 = (rand2 == 0) ? color1 :
        (rand2 === 1) ? color2 :
        (rand2 === 2) ? color3 :
        (rand2 === 3) ? color4 :
        (rand2 === 4) ? color5 :
        (rand2 === 5) ? color6 : color7;

      nuevoColorCuadrado2 = (rand3 == 0) ? color1 :
        (rand3 === 1) ? color2 :
        (rand3 === 2) ? color3 :
        (rand3 === 3) ? color4 :
        (rand3 === 4) ? color5 :
        (rand3 === 5) ? color6 : color7;
    } while (nuevoFondo == nuevoColorCuadrado1 || nuevoFondo == nuevoColorCuadrado2 || nuevoColorCuadrado1 == nuevoColorCuadrado2);

    fondoActual = nuevoFondo;
    colorCuadradoActual1 = nuevoColorCuadrado1;
    colorCuadradoActual2 = nuevoColorCuadrado2;
  } else if (key === 'r') {
    reiniciarVariables();
  } else if (key === 'b') {
    explotar = true;
  } else if (!moverConMouse) {
    if (keyCode === LEFT_ARROW) {
      posXFlechas -= desplazamiento;
    } else if (keyCode === RIGHT_ARROW) {
      posXFlechas += desplazamiento;
    } else if (key === 'a') {
      posXAWSD -= desplazamiento;
    } else if (key === 'd') {
      posXAWSD += desplazamiento;
    }
  }
}

function reiniciarVariables() {
  rotacion = 0;
  rotar = false;
  moverConMouse = false;
  explotar = false;
  posXFlechas = 0;
  posXAWSD = 0;
  fondoActual = fondoInicial;
  colorCuadradoActual1 = colorCuadradoInicial1;
  colorCuadradoActual2 = colorCuadradoInicial2;
  cant = 100;
  tam = width / cant;
}
