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
        host: "onnjomlc4vqc55fw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        user: 'gpmbr8v59adpq3j5',
        password: 'xf5dts2fx5o1bcgz',
        database: "ye2ksnnef7sraepi"
    });

    connected.connect();

    return connected
};
exports.connect = connect;