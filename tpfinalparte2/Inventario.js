class Inventario {
  constructor() {
    this.items = [];
    this.sel = -1;
  }

  agregar(objeto) {
    this.items.push({ nombre: objeto.nombre, img: objeto.img1 });
  }

  itemElegido() {
    if (this.sel === -1) {
      return null;
    }
    return this.items[this.sel];
  }

  mostrar() {
    fill(200);
    noStroke();
    textSize(11);
    textAlign(LEFT, BOTTOM);
    text("INVENTARIO", 590, 57);

    for (let i = 0; i < 6; i++) {
      let x = 590 + (i % 2) * 100;
      let y = 60 + floor(i / 2) * 70;

      fill(35);
      if (i === this.sel) {
        stroke(255, 230, 0);
        strokeWeight(2);
      } else {
        stroke(90);
        strokeWeight(1);
      }
      rect(x, y, 95, 65, 4);

      if (i < this.items.length) {
        dibujarImg(this.items[i].img, x + 5, y + 3, 85, 44);
        noStroke();
        fill(255);
        textSize(10);
        textAlign(CENTER, CENTER);
        text(this.items[i].nombre, x + 47, y + 57);
      }
    }
    noStroke();
  }

  click() {
    let col = floor((mouseX - 590) / 100);
    let fila = floor((mouseY - 60) / 70);
    if (col < 0 || col > 1 || fila < 0 || fila > 2) {
      return;
    }
    let i = fila * 2 + col;

    if (i >= this.items.length) {
      this.sel = -1;
    } else if (this.sel === -1) {
      this.sel = i;
    } else if (this.sel === i) {
      this.sel = -1;
    } else {
      this.combinar(this.sel, i);
      this.sel = -1;
    }
  }

  combinar(a, b) {
    let n1 = this.items[a].nombre;
    let n2 = this.items[b].nombre;

    if ((n1 === "Cuerda" && n2 === "Varillas") || (n1 === "Varillas" && n2 === "Cuerda")) {
      this.items.splice(max(a, b), 1);
      this.items.splice(min(a, b), 1);
      this.items.push({ nombre: "Palanca", img: imgPalanca });
      decir("¡Hiciste una palanca!");
      beep(523, 100);
      setTimeout(function () { beep(784, 150); }, 120);
    } else {
      decir("Eso no se puede combinar. ¡El pánico sube!");
      panico.sumar(5);
      beep(150, 250);
    }
  }
}
