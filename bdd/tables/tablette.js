// fichiers contenant toutes les requêtes SQL utilisés pour la gestion de la table tablettes
const getTablette = function (con, id, cb) {
    const sql = 'SELECT * ' +
        'FROM tablettes ' +
        'WHERE NumArtTab = ?';
    return con.query(sql, [id], cb)
};
exports.getTablette = getTablette;

const insertTablette = function (con, typeChoco, cb) {
    const sql = 'INSERT INTO tablettes (typeChoco) ' +
        'VALUES(?)';
    return con.query(sql, [typeChoco], cb)
};
exports.insertTablette = insertTablette;

const insertTabletteWId = function (con, id, typeChoco, cb) {
    const sql = 'INSERT INTO tablettes ' +
        'VALUES(?, ?)';
    return con.query(sql, [id, typeChoco], cb)
};
exports.insertTabletteWId = insertTabletteWId;

const updateTablette = function (con, id, typeChoco, cb) {
    const sql = 'UPDATE tablettes ' +
        'SET typeChoco = ? ' +
        'WHERE NumArtTab = ?';
    return con.query(sql, [typeChoco, id], cb)
};
exports.updateTablette = updateTablette;

const delTablette = function (con, id, cb) {
    const sql = 'DELETE FROM tablettes ' +
        'WHERE NumArtTab = ?';
    return con.query(sql, [id], cb)
};
exports.delTablette = delTablette;