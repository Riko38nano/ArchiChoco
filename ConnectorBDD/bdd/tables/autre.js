const getAutre = function (con, id, callback) {
    const sql = 'SELECT * ' +
        'FROM Autres ' +
        'WHERE NumArtAutre = ?';
    return con.query(sql, [id], callback)
};
exports.getAutre = getAutre;

const updateAutre = function (con, id, descr, callback) {
    const sql = 'UPDATE Autres ' +
        'SET description = ? ' +
        'WHERE numArtAutre = ?';
    return con.query(sql, [descr, id], callback)
};
exports.updateAutre = updateAutre;

const insertAutre = function (con, descr, callback) {
    const sql = 'INSERT INTO autres (descr) ' +
        'VALUES (?)';
    return con.query(sql, [descr], callback)
};
exports.insertAutre = insertAutre;

const insertAutreWId = function (con, id, descr, callback) {
    const sql = 'INSERT INTO autres ' +
        'VALUES (?, ?)';
    return con.query(sql, [id, descr], callback)
};
exports.insertAutreWId = insertAutreWId;

const delAutre = function (con, id, callback) {
    const sql = 'DELETE FROM autres ' +
        'WHERE numArtAutre = ?';
    return con.query(sql, [id], callback)
};
exports.delAutre = delAutre;