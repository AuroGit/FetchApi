import { getDB } from "./fetchRequest.js";

const charDB = await getDB();
export const mainSection = document.querySelector(".characters");

// Pantalla inicial

const charSelect = ()=> {
    for (let i = 0; i<charDB.length; i++) {
        const fragment = document.createDocumentFragment();
        const div = document.createElement('DIV');
        div.setAttribute("class", "char");
        div.setAttribute("data-id", i);
        div.classList.add(`char-bg-${charDB[i].bgColor}`);
        let charItem = `<img src="${charDB[i].img[charDB[i].img.length-1]}" alt="">
                        <h1>${charDB[i].nombre}</h1>`;
        div.innerHTML = charItem;
        fragment.appendChild(div);
        mainSection.appendChild(fragment);
    }
}
charSelect();