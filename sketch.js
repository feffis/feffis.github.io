let circles = [];
let maxCircles = 50; // Número máximo de círculos
let cloudX = 0; // Posición inicial de la nube-persona

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  // Fondo de cielo

  background(7, 206, 250); // Azul cielo

  // Dibujar la nube-persona que sigue el mouse horizontalmente
  cloudX = lerp(cloudX, mouseX, 0.1, mouseY + 23); // Movimiento suave hacia el mouse
  drawCloud(cloudX, height / 4);

  // Agregar un nuevo círculo al azar
  if (circles.length < maxCircles && frameCount % 10 === 0) {
    circles.push(new FallingShape(random(width), random(20, 50)));
  }

  // Dibujar y actualizar círculos
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].display();

    // Eliminar círculo si sale de la pantalla
    if (circles[i].isOffScreen()) {
      circles.splice(i, 1);
    }
  }
}

// Clase para los círculos/figuras que caen
class FallingShape {
  constructor(x, size) {
    this.x = x;
    this.y = -size; // Empieza fuera de la pantalla
    this.size = size;
    this.speed = random(2, 5); // Velocidad de caída
    this.isCircle = true; // Alternar entre círculo y rectángulo
    this.color = color(random(255), random(255), random(255)); // Color aleatorio
  }

  update() {
    this.y += this.speed; // Mover hacia abajo
    // Cambiar forma y color dinámicamente
    if (frameCount % 60 === 0) {
      this.isCircle = !this.isCircle; // Alternar forma
      this.color = color(random(255), random(255), random(255)); // Nuevo color
    }
  }

  display() {
    fill(this.color);
    if (this.isCircle) {
      ellipse(this.x, this.y, this.size, this.size);
    } else {
      rect(
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
    }
  }

  isOffScreen() {
    return this.y - this.size > height;
  }
}

// Función para dibujar la nube-persona
function drawCloud(x, y) {
  fill(255); // Blanco para la nube
  // Dibujar varias elipses para formar una nube
  ellipse(x, y, 100, 60);
  ellipse(x + 40, y - 20, 80, 50);
  ellipse(x - 40, y - 20, 80, 50);

  // Dibujar "cara" de la nube
  fill(0);
  ellipse(x - 15, y - 5, 10, 10); // Ojo izquierdo
  ellipse(x + 15, y - 5, 10, 10); // Ojo derecho
  arc(x, y + 10, 30, 20, 0, PI); // Boca
}
