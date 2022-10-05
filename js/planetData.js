export const trigger = document.querySelector(".planet-click-area");
export const infoDiv = document.querySelector(".planet-info");

const planetaImg = document.querySelector(".planet");
const nombre = document.getElementById("nombre-planeta");
const diametro = document.getElementById("diametro");
const gravedad = document.getElementById("gravedad");
const clima = document.getElementById("clima");
const poblacion = document.getElementById("poblacion");
const cerrarBtn = document.querySelector(".cerrar");

export const planetsArr = [
    {nombre : "Iridonia", src : "./assets/planetas/iridonia.png", data: undefined},
    {nombre : "Quermia", src : "./assets/planetas/quermia.png", data: undefined},
    {nombre : "Haruun Kal", src : "./assets/planetas/haruunKal.png", data: undefined},
    {nombre : "Tatooine", src : "./assets/planetas/tatooine.png", data: undefined},
    {nombre : "Dathomir", src : "./assets/planetas/dathomir.png", data: undefined},
    {nombre : "Ryloth", src : "./assets/planetas/ryloth.png", data: undefined},
    {nombre : "Shili", src : "./assets/planetas/shili.png", data: undefined},
    {nombre : "Naboo", src : "./assets/planetas/naboo.png", data: undefined},
    {nombre : "Coruscant", src : "./assets/planetas/coruscant.png", data: undefined},
    {nombre : "Stewjon", src : "./assets/planetas/stewjon.png", data: undefined},
    {nombre : "Cerea", src : "./assets/planetas/cerea.png", data: undefined},
    {nombre : "Iktotch", src : "./assets/planetas/iktotch.png", data: undefined},
    {nombre : "Mirial", src : "./assets/planetas/mirial.png", data: undefined},
    {nombre : "Serenno", src : "./assets/planetas/serenno.png", data: undefined},
    {nombre : "Dorin", src : "./assets/planetas/dorin.png", data: undefined},
    {nombre : "Glee Anselm", src : "./assets/planetas/gleeAnselm.png", data: undefined},
    {nombre : "Desconocido", src : "./assets/planetas/desconocido.png", data: {diameter:"sin datos", gravity:"sin datos", climate:"sin datos", population:"sin datos"}},
    {nombre : "Estrella de la Muerte", src : "./assets/planetas/deathStar.png", data: {diameter:"160000", gravity:"1", climate:"espacio exterior", population:"indefinida"}}
];

trigger.addEventListener("click", ()=>{
    let data;
    for (let item of planetsArr) {
        if (item.src == planetaImg.getAttribute("src")) {
            data = item.data;
            nombre.innerText = item.nombre == "Estrella de la Muerte"? 
            item.nombre : `Planeta ${item.nombre}`;
            break;
        }
    }
    diametro.innerText = traducirData(data.diameter) + " (kms)";
    gravedad.innerText = traducirData(data.gravity);
    clima.innerText = traducirData(data.climate);
    poblacion.innerText = traducirData(data.population) + " (habs)";

    infoDiv.removeAttribute("style");
});

cerrarBtn.addEventListener("click", ()=>{infoDiv.style.display = "none";});

const traducirData = str => {
    switch (str) {
        case "temperate":
            return "templado";
        case "arid":
            return "árido";
        case "temperate, arid, subartic":
            return "templado, árido, subártico";
        case "tropical, temperate":
            return "tropical, templado";
        case "unknown":
             return "sin datos";
        case "arid, rocky, windy":
            return "árido, rocoso y ventoso";
        case "1 standard":
            return "1";
        default:
            return str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}