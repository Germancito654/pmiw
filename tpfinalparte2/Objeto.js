class Objeto {
  constructor(nombre, img0, img1, texto, tomable) {
    this.nombre = nombre;
    this.img0 = img0;
    this.img1 = img1;
    this.texto = texto;
    this.tomable = tomable;
    this.visible = true;
  }

  mostrar() {
    if (this.visible) {
      if (this.mouseEncima() && estado === "JUEGO") {
        tint(255, 255, 150);
      }
      image(this.img0, 0, 0, 580, 400);
      noTint();
    }
  }

  mouseEncima() {
    if (!this.visible || mouseX >= 580) {
      return false;
    }
    let escX = this.img0.width / 580;
    let escY = this.img0.height / 400;
    for (let dx = -4; dx <= 4; dx += 4) {
      for (let dy = -4; dy <= 4; dy += 4) {
        let px = floor((mouseX + dx) * escX);
        let py = floor((mouseY + dy) * escY);
        if (px >= 0 && px < this.img0.width && py >= 0 && py < this.img0.height) {
          let c = this.img0.get(px, py);
          if (c[3] > 20) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
