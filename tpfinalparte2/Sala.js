class Sala {
  constructor(fondo) {
    this.fondo = fondo;
    this.objetos = [];
    this.zonas = [];
  }

  mostrar() {
    image(this.fondo, 0, 0, 580, 400);
    for (let i = 0; i < this.objetos.length; i++) {
      this.objetos[i].mostrar();
    }
    for (let i = 0; i < this.zonas.length; i++) {
      this.zonas[i].mostrar();
    }
  }
}
