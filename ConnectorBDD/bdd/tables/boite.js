const getBoite = function (con, id, cb) {
    const sql = 'SELECT * ' +
        'FROM Boites ' +
        'WHERE numArtBoite = ?';
    return con.query(sql, [id], cb)
};
exports.getBoite = getBoite;

const insertBoite = function (con, qte, noisette, alcool, blanc, noir, au_lait, praline, cb) {
    const sql = 'INSERT INTO Boites (qte, noisette, alccol, blanc, noir, au_lait, praline) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?)';
    return con.query(sql, [qte, noisette, alcool, blanc, noir, au_lait, praline], cb)
};
exports.insertBoite = insertBoite;

const insertBoiteWId = function (con, id, qte, noisette, alcool, blanc, noir, au_lait, praline, cb) {
    const sql = 'INSERT INTO Boites ' +
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
        'WHERE numArtBoite = ?';
    return con.query(sql, [qte, noisette, alcool, blanc, noir, au_lait, praline, id], cb)
};
exports.updateBoite = updateBoite;

const delBoite = function (con, id, cb) {
    const sql = 'DELETE FROM boites ' +
        'WHERE numArtBoite = ?';
    return con.query(sql, [id], cb)
};
exports.delBoite = delBoite;