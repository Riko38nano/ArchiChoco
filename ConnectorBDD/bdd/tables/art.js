const getArticles = function (con, callback) {
    const sql = 'SELECT NumArt, ROUND(Prix, 2) as Prix, Type, Affichage ' +
        'FROM Articles';
    return con.query(sql, [], callback)
};
exports.getArticles = getArticles;

const getArticle = function (con, id, callback) {
    const sql = 'SELECT * ' +
        'FROM Articles ' +
        'WHERE NumArt = ?';
    return con.query(sql, [id], callback)
};
exports.getArticle = getArticle;

const getType = function (con, id, cb) {
    const sql = 'SELECT Type ' +
        'FROM articles ' +
        'WHERE NumArt = ?';
    return con.query(sql, [id], cb)
};
exports.getType = getType;

const insertArt = function (con, prix, type, aff, callback){
    const sql = 'INSERT INTO Articles (prix, type, affichage)' +
        'VALUES (?, ?, ?)';
    return con.query(sql, [prix, type, aff], callback)
};
exports.insertArt = insertArt;

const updateArtPrix = function (con, id, prix, callback){
    const sql = 'UPDATE Articles ' +
        'SET prix = ? ' +
        'WHERE numArt = ?';
    return con.query(sql, [prix, id], callback)
};
exports.updateArtPrix = updateArtPrix;

const updateArtAff = function (con, id, aff, callback){
    const sql = 'UPDATE Articles ' +
        'SET affichage = ? ' +
        'WHERE numArt = ?';
    return con.query(sql, [aff, id], callback)
};
exports.updateArtAff = updateArtAff;

const delArt = function (con, id, callback){
    const sql = "DELETE FROM Articles " +
        "WHERE numArt = ?";
    return con.query(sql, [id], callback)
};
exports.delArt = delArt;