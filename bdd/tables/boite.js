// fichiers contenant toutes les requêtes SQL utilisés pour la gestion de la table boites
const getBoite = function (con, id, cb) {
    const sql = 'SELECT * ' +
        'FROM boites ' +
        'WHERE NumArtBoite = ?';
    return con.query(sql, [id], cb)
};
exports.getBoite = getBoite;

const insertBoiteWId = function (con, id, qte, noisette, alcool, blanc, noir, au_lait, praline, cb) {
    const sql = 'INSERT INTO boites ' +
        'VALUES (?,?, ?, ?, ?, ?, ?, ?)';
    return con.query(sql, [id, qte, noisette, alcool, blanc, noir, au_lait, praline], cb)
};
exports.insertBoiteWId = insertBoiteWId;

const updateBoite = function (con, id, qte, noisette, alcool, blanc, noir, au_lait, praline, cb) {
    const sql = 'UPDATE boites ' +
        'SET quantite = ?, noisette = ?' +
        ', alccol = ?, blanc = ?' +
        ', noir = ?, au_lait = ?' +
        ', praline = ?) ' +
        'WHERE NumArtBoite = ?';
    return con.query(sql, [qte, noisette, alcool, blanc, noir, au_lait, praline, id], cb)
};
exports.updateBoite = updateBoite;

const delBoite = function (con, id, cb) {
    const sql = 'DELETE FROM boites ' +
        'WHERE NumArtBoite = ?';
    return con.query(sql, [id], cb)
};
exports.delBoite = delBoite;