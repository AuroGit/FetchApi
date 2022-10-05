export class Personaje {
    constructor(id, nombre, año, especie, genero, 
    planeta, rango, faccion, img, armas) {
        this.id = id;
        this.nombre = nombre;
        this.año = año;
        this.especie = especie;
        this.genero = genero;
        this.planeta = planeta;
        this.rango = rango;
        this.faccion = faccion;
        // this.lsCount = lsCount;
        this.img = img;
        this.armas = armas;        
    }

    get getId() {return this.id;}
    set setId(id) {this.id = id;}

    get getNombre() {return this.nombre;}
    set setNombre(nombre) {this.nombre = nombre;}

    get getAño() {return this.año;}
    set setAño(año) {this.año = año;}

    get getEspecie() {return this.especie;}
    set setEspecie(especie) {this.especie = especie;}

    get getGenero() {return this.genero;}
    set setGenero(genero) {this.genero = genero;}

    get getPlaneta() {return this.planeta;}
    set setPlaneta(planeta) {this.planeta = planeta;}

    get getRango() {return this.rango;}
    set setRango(rango) {this.rango = rango;}

    get getFaccion() {return this.faccion;}
    set setFaccion(faccion) {this.faccion = faccion;}

    // get getLsCount() {return this.lsCount;}
    // set setLsCount(lsCount) {this.lsCount = lsCount;}

    get getImg() {return this.img;}
    set setImg(img) {this.img = img;}

    get getArmas() {return this.armas;}
    set setArmas(armas) {this.armas = armas;}
}