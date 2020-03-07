const insertCmd = function (con, idCli, date, cons, liv, cb) {
    const sql = 'INSERT INTO Commandes (NumCli, Date, Consigne, Livraison) ' +
        'VALUES (?, ?, ?, ?)';
    return con.query(sql, [idCli, date, cons, liv], cb)
};
exports.insertCmd = insertCmd;

const delCmd = function (con, id, cb) {
    const sql = 'DELETE FROM Commandes ' +
        'WHERE NumCmd = ?';
    return con.query(sql, [id], cb)
};
exports.delCmd = delCmd;