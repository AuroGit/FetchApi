export class SableLaser {
    constructor(tipo, color, img) {
        this.tipo = tipo;
        this.color = color;
        this.img = img;
    }

    get getTipo() {return this.tipo;}
    set setTipo(tipo) {this.tipo = tipo;}

    get getColor() {return this.color;}
    set setColor(color) {this.color = color;}

    get getImg() {return this.img;}
    set setImg(img) {this.img = img;}
}