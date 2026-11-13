class Zona {
  constructor(x, y, w, h, destino, flecha) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.destino = destino;
    this.flecha = flecha;
  }

  mostrar() {
    noStroke();
    if (this.mouseEncima()) {
      fill(255, 255, 255, 90);
    } else {
      fill(255, 255, 255, 35);
    }
    rect(this.x, this.y, this.w, this.h, 6);
    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    text(this.flecha, this.x + this.w / 2, this.y + this.h / 2);
  }

  mouseEncima() {
    return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
  }
}
