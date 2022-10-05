import { Personaje } from "./charClass.js";
import { SableLaser } from "./saberClass.js"
import { getChar, getDB, getProp, swapiURL } from "./fetchRequest.js";
import { planetsArr, trigger, infoDiv } from "./planetData.js";
import { mainSection } from "./mainScreen.js";
import { mostrarArma } from "./lightsaberData.js";
import { imgsArr, navsArr, slider } from "./slider.js";

const charDB = await getDB();
const filtro = document.querySelector(".filtro");
const loader = document.querySelector(".carga");

// Creacion de personajes

export const pnjArr = [];

function crearArmas (ch) {
        let armasArr = [];
        if (ch.lsType == "bicolor") {
            armasArr.push(new SableLaser(ch.lsType[0], ch.lsColor[0], ch.lsImg[0]));
        } else {
            if (ch.lsCount > 1) {
                for (let i = 0; i < ch.lsCount; i++) {
                    armasArr.push(new SableLaser(ch.lsType[i], ch.lsColor[i], ch.lsImg[i]));
                }
            } else {
                armasArr.push(new SableLaser(ch.lsType[0], ch.lsColor[0], ch.lsImg[0]));
            }
        }
        return armasArr;
}

const ch0 = new Personaje(charDB[0].id, charDB[0].nombre, "36 ABY", 
            "Togruta", "Femenino", {nombre : "Shili", 
            imgUrl : "./assets/planetas/shili.png"}, charDB[0].rango, 
            charDB[0].faccion, charDB[0].img, crearArmas(charDB[0]));
pnjArr.push(ch0);
            
export const crearPnj = async id => {
    const data = await getChar(charDB[id].url);
    const dataSpecies = await getProp(data.species);
    const raza = dataSpecies == undefined? "Humano" : dataSpecies.name;
    const dataHomeworld = await getProp(data.homeworld);
    let planetUrl;
    for (let item of planetsArr) {
        if (item.nombre == dataHomeworld.name) {
            planetUrl = item.src;
            item.data = dataHomeworld;
            break;
        } else {planetUrl = "./assets/planetas/desconocido.png"}
    }
    const planeta = {nombre : dataHomeworld.name == "unknown"? "Desconocido" : dataHomeworld.name, 
    imgUrl : planetUrl};
    if (data.name.includes("Vader")) {
        planeta.nombre = "Desconocido";
        planeta.imgUrl = "./assets/planetas/deathStar.png"
    }
    
    return new Personaje(charDB[id].id, charDB[id].nombre, 
    traducirAño(data.birth_year), traducirRaza(raza, data.gender), 
    traducirGenero(data.gender), planeta, charDB[id].rango, charDB[id].faccion, 
    charDB[id].img, crearArmas(charDB[id]));
}

function traducirAño(str) {
    if (str.includes("BBY")) {
        return str.split("BBY").join().slice(0,-1) + " ABY";
    } else if (str.includes("ABY")) {
        return str.split("ABY").join().slice(0,-1) + " DBY";
    } else if (str == "unknown") {
        return "Desconocido";
    }
}

function traducirGenero(str) {
    switch (str.toLowerCase()) {
        case "male":
            return "Masculino";
        case "female":
            return "Femenino";
    }
}

function traducirRaza(str, gen) {    
    switch (str) {
        case "Human":
            if (gen.toLowerCase() == "male") return "Humano";
            else if (gen.toLowerCase() == "female") return "Humana";
        case "Cerean":
            if (gen.toLowerCase() == "male") return "Cereano";
            else if (gen.toLowerCase() == "female") return "Cereana";
        case "Nautolan":
            if (gen.toLowerCase() == "male") return "Nautolano";
            else if (gen.toLowerCase() == "female") return "Nautolana";
        case "Tholothian":
            if (gen.toLowerCase() == "male") return "Tholothiano";
            else if (gen.toLowerCase() == "female") return "Tholothiana";
        case "Quermian":
            if (gen.toLowerCase() == "male") return "Quermiano";
            else if (gen.toLowerCase() == "female") return "Quermiana";
        case "Mirialan":
            if (gen.toLowerCase() == "male") return "Mirialano";
            else if (gen.toLowerCase() == "female") return "Mirialana";
        case "Yoda's species":
            return "Desconocida";
        default:
            return str;
    }
}

// Ficha individual

export const charDivArr = document.querySelectorAll(".char");
const planetaImg = document.querySelector(".planet");
const ficha = document.querySelector(".ficha");
const arma = document.querySelector(".arma");
const volverBtn = document.querySelector(".return-btn");
export const backghround = document.querySelector(".perfil-img");

const añadirPnj = async evt => {
    const dataId = evt.target.dataset.id;
    let isIn;
    for (let item of pnjArr) {
        if (item.id == dataId) {
            isIn = true;
            for (let item of planetsArr) {if (item.nombre == ch0.planeta.nombre) {
                item.data = await getProp(swapiURL + "planets/58/");
                
                loader.classList.add("fadeout");
                setTimeout(()=>{loader.style.display = "none";
                                loader.classList.remove("fadeout");}, 500);
                break;
            }}
            return item;
        } 
        else {if (item.id == pnjArr.length-1) {isIn = false;}}
    }
    if (!isIn) {
        const pnj = await crearPnj(dataId);
        pnjArr.push(pnj);
        return pnj;
    }
}

const imagen = document.getElementById("imagen");
const mostrarData = (pnj)=> {
    let charPlanet = "";
    const nombre = document.getElementById("nombre");
    const faccion = document.getElementById("faccion");
    const rango = document.getElementById("rango");
    const especie = document.getElementById("especie");
    const genero = document.getElementById("genero");
    const año = document.getElementById("año");

    charPlanet = pnj.planeta.imgUrl;
    nombre.innerText = pnj.nombre;
    faccion.innerText = pnj.faccion;
    rango.innerText = pnj.rango[pnj.rango.length-1];
    especie.innerText = pnj.especie;
    genero.innerText = pnj.genero;
    año.innerText = pnj.año;
    if (pnj.rango.length > 1) {
        if (pnj.rango.length == 3) {navsArr[2].removeAttribute("style");}
        slider.removeAttribute("style");
        if (pnj.id == 1) {
            backghround.classList.value = `perfil-img perfil-bg-verde`
        } else {backghround.classList.value = `perfil-img perfil-bg-${charDB[pnj.id].bgColor}`;}
        for (let index in pnj.img) {
            imgsArr[index].setAttribute("src", pnj.img[index]);
        }
        imgsArr[pnj.img.length-1].setAttribute("data-active", "");
        navsArr[pnj.rango.length-1].setAttribute("data-active", "");
    } else {
        backghround.classList.value = `perfil-img perfil-bg-${charDB[pnj.id].bgColor}`;
        imagen.setAttribute("src", pnj.img[pnj.img.length-1]);
    }

    mostrarArma(pnj);
}

const transicion = (char)=> {
    loader.classList.replace("fadein", "fadeout");
    mainSection.classList.replace("fadein", "fadeout");
    filtro.classList.replace("fadein", "fadeout");
    setTimeout(()=>{
        mainSection.classList.replace("fadeout", "display-none");
        filtro.classList.replace("fadeout", "display-none");

        loader.style.display = "none";
        loader.classList.remove("fadeout");
    }, 500);
    planetaImg.classList.replace("display-none", "fadein");
    planetaImg.setAttribute("src", char.planeta.imgUrl);
    volverBtn.classList.replace("display-none", "fadein");
    ficha.classList.remove("translate-left");
    arma.classList.remove("translate-right");
}

charDivArr.forEach(element=>element.addEventListener("click", 
async (evt)=>{
    loader.removeAttribute("style");
    loader.classList.add("fadein");
    const ch = await añadirPnj(evt);
    
    mostrarData(ch);
    transicion(ch);
    trigger.classList.remove("display-none");
}));

volverBtn.addEventListener("click", ()=>{
    infoDiv.style.display = "none";
    trigger.classList.add("display-none");
    planetaImg.classList.replace("fadein", "fadeout");
    volverBtn.classList.replace("fadein", "fadeout");
    setTimeout(()=>{
        planetaImg.setAttribute("src", "");
        planetaImg.classList.replace("fadeout", "display-none");
        volverBtn.classList.replace("fadeout", "display-none");
        imagen.setAttribute("SRC", "");
    }, 500);
    mainSection.classList.replace("display-none", "fadein");
    filtro.classList.replace("display-none", "fadein");
    ficha.classList.add("translate-left");
    arma.classList.add("translate-right");

    navsArr[2].setAttribute("style", "display: none;");
    slider.setAttribute("style", "display: none;");
    for (let id in imgsArr) {
        imgsArr[id].setAttribute("src", "");
        imgsArr[id].removeAttribute("data-active");
        navsArr[id].removeAttribute("data-active");
    }
})