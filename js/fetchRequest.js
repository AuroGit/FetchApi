export const swapiURL = 'https://swapi.dev/api/';

export const getDB = async ()=> {
        return await fetch("./charDB.txt").then(res=>res.json())
        .then(data=>data).catch(e=>console.log(e));
}

export const getChar = async index => {
        const url = swapiURL + index;
        return await fetch(url).then(res=>res.json())
        .then(data=>data).catch(e=>console.log(e));
}

export const getProp = async url => {
    if (typeof url == "string") {
        return await fetch(url).then(res=>res.json())
            .then(data=>data).catch(e=>console.log(e));
    } else if (typeof url == "object") {
        for (let item of url) {
            return await fetch(item).then(res=>res.json())
            .then(data=>data).catch(e=>console.log(e));
        }
    }
}