import { backghround } from "./charData.js";

export const slider = document.querySelector(".slider");

const img1 = document.getElementById("slider-1");
const img2 = document.getElementById("slider-2");
const img3 = document.getElementById("slider-3");
export const imgsArr = [img1, img2, img3];

const nav1 = document.getElementById("rango-1");
const nav2 = document.getElementById("rango-2");
const nav3 = document.getElementById("rango-3");
export const navsArr = [nav1, nav2, nav3];

navsArr.forEach(btn=>btn.addEventListener("click", ()=>{
        if (btn.getAttribute("data-active") == null) {
            const imgTarget = btn.getAttribute("id") == "rango-1"? 
            img1 : btn.getAttribute("id") == "rango-2"? img2 : img3;
            for (let i = 0; i < 3; i++) {
                if (imgsArr[i].getAttribute("data-active") != null) {
                    imgsArr[i].removeAttribute("data-active");
                    imgTarget.setAttribute("data-active", "");
                    if (imgTarget.getAttribute("src").includes("LukeSkywalker-1")) {
                        backghround.classList.replace("perfil-bg-verde", "perfil-bg-azul");
                    } else if (imgTarget.getAttribute("src").includes("LukeSkywalker-2")) {
                        backghround.classList.replace("perfil-bg-azul", "perfil-bg-verde");
                    }
                }
                if (navsArr[i].getAttribute("data-active") != null) {
                    navsArr[i].removeAttribute("data-active");
                    btn.setAttribute("data-active", "");
                    break;
                }
            }
        }
    }
));