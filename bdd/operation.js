const keygen = require("keygenerator");
var CryptoJS = require("crypto-js");

const jwt = require('jsonwebtoken');

const createArtConcat = function (Art, SousArt) {
    // fonction qui à partir d'un objet de la table principale ajoute les attributs de la sous table
    // En enelevant le NumArt de la sous table car déjà présent dans la table principale
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

// Calcul du prix pour une commande
const getPrixTot = function (lignesArt) {
    // fonction qui parcourt des lignes d'article et qui somme le prix de tous les articles
    let somme = 0;
    for (let i = 0; i < lignesArt.length; i++) {
        somme += lignesArt[i].Prix
    }
    return parseFloat(somme.toFixed(2))
};
exports.getPrixTot = getPrixTot;

// verification si le token est decodable
function decodeOk(token, str) {
    try {
        jwt.verify(token, str)
    } catch (e) {
        return false
    }
    return true
}

// méthode de decodage des token
const decodeToken = function (token) {
    if (decodeOk(token, randStr)) {
        return jwt.verify(token, randStr);
    } else {
        return null
    }
};
exports.decodeToken = decodeToken;

// fonction de test pour vérifier si le BODY est au format que l'on veut
const isJSON = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
exports.isJSON = isJSON;

// génére une clé de session pour le codage des mdp
let randStr = '';
const genRandStr = function () {
    randStr = keygen.session_id();
};
exports.genRandStr = genRandStr;

const getRandStr = function () {
    return randStr
};
exports.getRandStr = getRandStr;

// méthode de cryptage des mdp
const crypt = function (mdp){
    const key = 'cnudncklzscopzsqkoizaxqbuhjn,oqskl45((é""éé"""';

    return CryptoJS.AES.encrypt(mdp, key).toString()
};
exports.crypt = crypt;