class BarraPanico {
  constructor() {
    this.valor = 0;
  }

  actualizar() {
    this.valor = this.valor + 100 / (25 * 60);
  }

  sumar(cantidad) {
    this.valor = this.valor + cantidad;
    if (this.valor > 100) {
      this.valor = 100;
    }
  }

  mostrar(x, y, w, h) {
    fill(200);
    noStroke();
    textSize(11);
    textAlign(LEFT, BOTTOM);
    text("PÁNICO", x, y - 3);

    fill(30);
    stroke(120);
    strokeWeight(1);
    rect(x, y, w, h, 3);

    noStroke();
    fill(lerpColor(color(60, 200, 90), color(225, 35, 35), this.valor / 100));
    rect(x, y, w * this.valor / 100, h, 3);
  }
}
