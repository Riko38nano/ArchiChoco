import {HOST_NAME, USER, PASSWORD, DATABASE} frome "../utils/constants/.env"

const mysql = require('mysql');

// fonction de connexion à la base de donnée
const connect = function () {
    const connected = mysql.createConnection({
        host: HOST_NAME,
        user: USER,
        password: PASSWORD,
        database: DATABASE
    });

    connected.connect();

    return connected
};
exports.connect = connect;
