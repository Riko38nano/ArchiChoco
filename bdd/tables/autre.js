// fichiers contenant toutes les requêtes SQL utilisés pour la gestion de la table autres
const getAutre = function (con, id, callback) {
    const sql = 'SELECT * ' +
        'FROM autres ' +
        'WHERE NumArtAutre = ?';
    return con.query(sql, [id], callback)
};
exports.getAutre = getAutre;

const updateAutre = function (con, id, descr, callback) {
    const sql = 'UPDATE autres ' +
        'SET description = ? ' +
        'WHERE NumArtAutre = ?';
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
        'WHERE NumArtAutre = ?';
    return con.query(sql, [id], callback)
};
exports.delAutre = delAutre;