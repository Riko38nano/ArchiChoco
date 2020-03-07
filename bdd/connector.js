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

const connect = function () {
    const connected = mysql.createConnection({
        host: "mysql-riko38nano.alwaysdata.net",
        user: '201388',
        password: 'IG3PolytechChocochoco',
        database: "riko38nano_choco"
    });

    connected.connect();

    return connected
};
exports.connect = connect;