import { mainSection } from "./mainScreen.js";
import { charDivArr } from "./charData.js"
import { getDB } from "./fetchRequest.js";

const charDB = await getDB();

const charFilter = filtro => {
    for (let i = 0; i < charDivArr.length; i++) {
        switch (filtro) {
            case "maestro jedi":case "caballero":case "padawan":case "lord sith":
                for (let valor of charDB[i].rango) {
                    if (valor.toLowerCase().includes(filtro)) {
                        if (charDivArr[i].classList.contains("display-none")) {
                            charDivArr[i].classList.remove("display-none");
                        }
                        if (charDB[i].id == 1 || charDB[i].id == 3 || charDB[i].id == 4) {
                            for (let ranId in charDB[i].rango) {
                                if (charDB[i].rango[ranId].toLowerCase().includes(filtro)) {
                                    charDivArr[i].firstChild.setAttribute("src", charDB[i].img[ranId]);
                                } //else {console.log("por lo que sea no esta coincidiendo nada")}
                            }
                        }
                        break;
                    } else {charDivArr[i].classList.add("display-none");}
                }    
                break;

            case "jedi":case "sith":
                if (charDB[i].faccion.toLowerCase().includes(filtro)) {
                    if (charDivArr[i].classList.contains("display-none")) {
                        charDivArr[i].classList.remove("display-none");
                    }
                    continue;
                }
                else {charDivArr[i].classList.add("display-none");}
                break;

            case "azul":case "verde":case "violeta":case "blanco":case "dorado":case "rosa":case "rojo":
                for (let valor of charDB[i].lsColor) {
                    if (valor.toLowerCase().includes(filtro)) {
                        if (charDivArr[i].classList.contains("display-none")) {
                            charDivArr[i].classList.remove("display-none");
                        }
                        if (charDivArr[i].classList.contains("char-bg-blanco")) {charDivArr[i].classList.replace("char-bg-blanco", `char-bg-${filtro}`);}
                        else if (charDivArr[i].classList.contains("char-bg-azul")) {charDivArr[i].classList.replace("char-bg-azul", `char-bg-${filtro}`);}
                        else if (charDivArr[i].classList.contains("char-bg-verde")) {charDivArr[i].classList.replace("char-bg-verde", `char-bg-${filtro}`);}
                        else if (charDivArr[i].classList.contains("char-bg-dorado")) {charDivArr[i].classList.replace("char-bg-dorado", `char-bg-${filtro}`);}
                        else if (charDivArr[i].classList.contains("char-bg-rosa")) {charDivArr[i].classList.replace("char-bg-rosa", `char-bg-${filtro}`);}
                        
                        break;
                    } else {charDivArr[i].classList.add("display-none");}
                }  
                break;

            default:
                if (charDivArr[i].classList.contains("display-none")) {
                    charDivArr[i].classList.remove("display-none");
                }
                charDivArr[i].firstChild.setAttribute("src", charDB[i].img[charDB[i].img.length-1]);
                if (charDB[i].id == 11 || charDB[i].id == 14 || charDB[i].id == 16) {
                    if (charDivArr[i].classList.contains("char-bg-blanco")) {charDivArr[i].classList.replace("char-bg-blanco", `char-bg-${charDB[i].lsColor[0]}`);}
                    else if (charDivArr[i].classList.contains("char-bg-azul")) {charDivArr[i].classList.replace("char-bg-azul", `char-bg-${charDB[i].lsColor[0]}`);}
                    else if (charDivArr[i].classList.contains("char-bg-verde")) {charDivArr[i].classList.replace("char-bg-verde", `char-bg-${charDB[i].lsColor[0]}`);}
                    else if (charDivArr[i].classList.contains("char-bg-dorado")) {charDivArr[i].classList.replace("char-bg-dorado", `char-bg-${charDB[i].lsColor[0]}`);}
                    else if (charDivArr[i].classList.contains("char-bg-rosa")) {charDivArr[i].classList.replace("char-bg-rosa", `char-bg-${charDB[i].lsColor[0]}`);}
                } else {
                    if (charDivArr[i].classList.contains("char-bg-blanco")) {charDivArr[i].classList.replace("char-bg-blanco", `char-bg-${charDB[i].lsColor[charDB[i].lsColor.length-1]}`);}
                    else if (charDivArr[i].classList.contains("char-bg-azul")) {charDivArr[i].classList.replace("char-bg-azul", `char-bg-${charDB[i].lsColor[charDB[i].lsColor.length-1]}`);}
                    else if (charDivArr[i].classList.contains("char-bg-verde")) {charDivArr[i].classList.replace("char-bg-verde", `char-bg-${charDB[i].lsColor[charDB[i].lsColor.length-1]}`);}
                    else if (charDivArr[i].classList.contains("char-bg-dorado")) {charDivArr[i].classList.replace("char-bg-dorado", `char-bg-${charDB[i].lsColor[charDB[i].lsColor.length-1]}`);}
                    else if (charDivArr[i].classList.contains("char-bg-rosa")) {charDivArr[i].classList.replace("char-bg-rosa", `char-bg-${charDB[i].lsColor[charDB[i].lsColor.length-1]}`);}
                }
                continue;
            }
    } adaptGrid();
}

const select = document.querySelector(".filtro-select");
select.addEventListener("change", ()=>{charFilter(select.value);});

window.addEventListener("resize", ()=>{adaptGrid()});
function adaptGrid() {
    let count = 0;
    mainSection.childNodes.forEach(child=>{
        if(!child.classList.contains("display-none")) {count++;}
    })
    
    let gridWidth;
    const windowWidth = window.innerWidth;
    let itemWidth;
    for (let item of charDivArr) {
        if (item.offsetWidth > 0) {
            itemWidth = item.offsetWidth;
            gridWidth = itemWidth * count + 100;
            break;}
    }
    if (count < 10 && gridWidth < windowWidth) {
        mainSection.classList.forEach(cl=>{
                mainSection.classList.add("flex");
        })
    } else {
        mainSection.classList.forEach(cl=>{
            if (cl.includes("flex")) {mainSection.classList.replace(cl, "grid");}
        })
    }
}

// window.addEventListener("click", ()=>{
//     if (gridWidth != null && windowWidth != null && itemWidth != null) {
        
//     }
// })