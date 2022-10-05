const cristal = document.getElementById("cristal");
const nombre = document.getElementById("nombre");

if (cristal != null) {console.log("esto va")
    cristal.addEventListener("click", ()=>{
        const laser = document.querySelector(".laser");
        let laserClases = laser.classList.value;
        if (laserClases.includes("verde")) {
            laser.classList.replace("laser-verde", "laser-azul");
        } else if (laserClases.includes("dorado")) {
            laser.classList.replace("laser-dorado", "laser-azul");
        } else if (laserClases.includes("azul")) {
            if (nombre.innerText == "Yarael Poof") {
            laser.classList.replace("laser-azul", "laser-dorado");
            } else if (nombre.innerText == "Ki-Adi Mundi") {
            laser.classList.replace("laser-azul", "laser-verde");
            }
        }
    });
}