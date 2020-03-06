const keygen = require("keygenerator");

const jwt = require('jsonwebtoken');

const createArtConcat = function (Art, SousArt) {
    // fonction qui à partir d'un objet de la table principale ajoute les attributs de la sous table
    let obj = {};

    for (const key in Art) {
        obj[key] = Art[key]
    }

    for (const Souskey in SousArt) {
        if (Souskey === 'NumArtTab' || Souskey === 'NumArtBoite' || Souskey === 'NumArtAutre') {
        } else {
            obj[Souskey] = SousArt[Souskey]
        }
    }
    return obj;
};
exports.createArticleExtended = createArtConcat;

const findDiff = function (lignes) {
    // fonction qui trouve l'indice des commandes différentes dans la liste des commandes que l'on reçoit
    // pour pouvoir retrouver les informations sur les clients qui ont achetés
    let diff = [];
    let diffCmd = [];
    for (let i = 0; i < lignes.length; i++) {
        if (!diffCmd.includes(lignes[i].NumCmd)) { // si on ne trouve pas i dans diff
            diffCmd.push(lignes[i].NumCmd);
            diff.push(i)
        }
    }
    return diff
};
exports.findDiff = findDiff;

const getPrixTot = function (lignesArt) {
    // fonction qui parcourt des lignes d'article et qui somme le prix de tous les articles
    let somme = 0;
    for (let i = 0; i < lignesArt.length; i++) {
        somme += lignesArt[i].Prix
    }
    return parseFloat(somme.toFixed(2))
};
exports.getPrixTot = getPrixTot;

function decodeOk(token, str) {
    try {
        jwt.verify(token, str)
    } catch (e) {
        return false
    }
    return true
}

let randStr = '';
const decodeToken = function (token) {
    if (decodeOk(token, randStr)) {
        return jwt.verify(token, randStr);
    } else {
        return null
    }
};
exports.decodeToken = decodeToken;

const isJSON = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
exports.isJSON = isJSON;

const genRandStr = function () {
    randStr = keygen.session_id();
};
exports.genRandStr = genRandStr;

const getRandStr = function () {
    return randStr
};
exports.getRandStr = getRandStr;