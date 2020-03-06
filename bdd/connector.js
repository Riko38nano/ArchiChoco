const mysql = require('mysql');

const connectWith = function (user, mdp) {
    const connected = mysql.createConnection({
        host: "localhost",
        user: user,
        password: mdp,
        database: "choco"
    });

    connected.connect();

    return connected
};

exports.connectWith = connectWith;