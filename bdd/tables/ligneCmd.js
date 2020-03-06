const getLcdByCmd = function (con, idCmd, cb) {
    const sql = 'SELECT lcd.idArt, art.Type, art.Affichage, ROUND(art.Prix, 2) as Prix ' +
        'FROM ligneCmd as lcd INNER JOIN articles as art ON (lcd.idArt = art.NumArt) ' +
        'WHERE lcd.idCmd = ?';
    return con.query(sql, [idCmd], cb)
};
exports.getLcdByCmd = getLcdByCmd;

const getCommandes = function (con, cb) {
    const sql = 'SELECT art.NumArt, art.Prix, art.Type, art.Affichage, cmd.NumCli, cmd.Consigne, cmd.Livraison, cmd.Date, cmd.NumCmd ' +
        'FROM articles as art INNER JOIN lignecmd as lcd ON (art.NumArt = lcd.idArt) ' +
        'INNER JOIN commandes as cmd ON (lcd.idCmd = cmd.NumCmd) ' +
        'ORDER BY cmd.Date DESC';
    return con.query(sql, [], cb)
};
exports.getCommandes = getCommandes;

const getLigneByArt = function (con, idArt, cb) {
    const sql = "SELECT * " +
        "FROM ligneCmd " +
        "WHERE idArt = ?";
    return con.query(sql, [idArt], cb)
};
exports.getLigneByArt = getLigneByArt;

const insertLigne = function (con, idCmd, idArt, cb) {
    const sql = 'INSERT INTO ligneCmd (idCmd, idArt) ' +
        'VALUES (?, ?)';
    return con.query(sql, [idCmd, idArt], cb)
};
exports.insertLigne = insertLigne;

const delLigneByCmd = function (con, id, cb) {
    const sql = 'DELETE FROM ligneCmd ' +
        'WHERE idCmd = ?';
    return con.query(sql, [id], cb)
};
exports.delLigneByCmd = delLigneByCmd;