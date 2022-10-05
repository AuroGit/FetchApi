const arma1 = document.getElementById("arma-1");
const arma2 = document.getElementById("arma-2");
const arma3 = document.getElementById("arma-3");
const arma4 = document.getElementById("arma-4");
const armasArr = [arma2, arma3, arma4];
const handlers = document.querySelectorAll(".handler");
const handlerImgs = document.querySelectorAll(".handler-img");
const laserMain = document.getElementById("laser-main");
const laser2 = document.getElementById("laser-2");
const laser3 = document.getElementById("laser-3");
const laser4 = document.getElementById("laser-4");
const lasers = [laserMain, laser2, laser3, laser4];
const laserDual = document.getElementById("laser-dual");
const cristal = document.getElementById("cristal");

export function mostrarArma (pnj) {
    resetLightsaber();
    const armas = pnj.armas;
    switch (armas.length) {
        case 1:
            handlerImgs[0].setAttribute("src", armas[0].img);
            lasers[0].classList.add(`laser-${armas[0].color}`);
            switch (armas[0].tipo) {
                case "normal":
                    lasers[0].classList.add("laser-length-l");
                    break;
                case "normalOffset":
                    lasers[0].classList.add("laser-length-l");
                    handlers[0].classList.add("offset-10");
                    break;
                case "corto":
                    lasers[0].classList.add("laser-length-s");
                    handlers[0].classList.add("offset-10");
                    break;
                case "curvo":
                    lasers[0].classList.add("laser-length-l");
                    handlers[0].classList.add("offset-40");
                    break;
                case "bicolor":
                    lasers[0].classList.value = "laser";
                    cristal.classList.remove("display-none");
                    if (pnj.nombre == "Yarael Poof") {
                        cristal.classList.add("cristal-dorado-azul");
                        lasers[0].classList.add("laser-dorado");
                    } else if (pnj.nombre == "Ki-Adi Mundi") {
                        cristal.classList.add("cristal-verde-azul");
                        lasers[0].classList.add("laser-verde");
                    }
                    lasers[0].classList.add("laser-length-l");
                    break;
                case "dual":
                    handlers[0].classList.add("order-2");
                    lasers[0].classList.add("order-3");
                    lasers[0].classList.add("laser-length-l");
                    laserDual.removeAttribute("style");
                    arma1.classList.add("oblique");
                    break;
            }
            break;
        case 2: case 4:
            if (armas.length == 2) {
                arma2.removeAttribute("style");
                arma1.classList.add("dos");
                arma2.classList.add("dos");
            } else if (armas.length == 4) {
                arma1.classList.add("cuatro");
                for (let item of armasArr) {
                    item.removeAttribute("style");
                    item.classList.add("cuatro");
                }
            }
            for (let id in armas) {
                handlerImgs[id].setAttribute("src", armas[id].img);
                handlerImgs[id].setAttribute("src", armas[id].img);
                lasers[id].classList.add(`laser-${armas[id].color}`);
                lasers[id].classList.add(`laser-${armas[id].color}`);
                switch (armas[id].tipo) {
                    case "normal":
                        if (armas.length == 4) {
                            for (let i = 0; i < lasers.length; i++) {
                                if (i%2 == 0) {
                                    lasers[i].classList.add("laser-length-l");
                                } else {lasers[i].classList.add("laser-length-s");}
                            }
                        } else {lasers[id].classList.add("laser-length-l");}
                        break;
                    case "normalOffset":
                        if (armas.length == 4) {
                            for (let i = 0; i < lasers.length; i++) {
                                if (i%2 == 0) {
                                    lasers[i].classList.add("laser-length-l");
                                } else {lasers[i].classList.add("laser-length-s");}
                            }
                        } else {lasers[id].classList.add("laser-length-l");}
                        handlers[id].classList.add("offset-10");
                        break;
                }
            }
            break;
    }
}

function resetLightsaber () {
    arma1.classList.value = "lightsaber";
    cristal.classList.value = "display-none cristal-toggle";
    laserDual.style.display = "none"
    for (let arma of armasArr) {
        arma.classList.value = "lightsaber";
        arma.style.display = "none";
    }
    for (let h of handlers) {h.classList.value = "handler";}
    for (let i of handlerImgs) {i.setAttribute("src", "");}
    for (let l of lasers) {
        if (l.getAttribute("id") != "laser-dual") {
            l.classList.value = "laser";
        }
    }
}

// Laser Toggle
    cristal.addEventListener("click", ()=>{
        const laser = document.querySelector(".laser");
        let laserClases = laser.classList.value;
        if (laserClases.includes("verde")) {
            laser.classList.replace("laser-verde", "laser-azul");
            cristal.setAttribute("checked", "");
        } else if (laserClases.includes("dorado")) {
            laser.classList.replace("laser-dorado", "laser-azul");
            cristal.setAttribute("checked", "");
        } else if (laserClases.includes("azul")) {
            if (nombre.innerText == "Yarael Poof") {
            laser.classList.replace("laser-azul", "laser-dorado");
            cristal.removeAttribute("checked");
            } else if (nombre.innerText == "Ki-Adi Mundi") {
            laser.classList.replace("laser-azul", "laser-verde");
            cristal.removeAttribute("checked");
            }
        }
    });