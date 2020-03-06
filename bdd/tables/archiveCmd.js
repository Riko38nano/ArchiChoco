const getBenef = function (con, cb) {
    const sql = 'SELECT SUM(prixTot) as benef, COUNT(idCmd) as count ' +
        'FROM archiveCmd'; // TODO ajouter le where pour le mois courant
    return con.query(sql , [], cb)
};
exports.getBenef = getBenef;

const insertArchCmd = function (con, idCmd, prixTot, date, cb) {
    const sql = 'INSERT INTO ArchiveCmd (idCmd, prixTot, DateCmd) ' +
        'VALUES (?, ?, ?)';
    return con.query(sql, [idCmd, prixTot, date], cb)
};
exports.insertArchCmd = insertArchCmd;

const getPrixTotCmd = function (con, idCmd, cb) {
    const sql = 'SELECT SUM(art.Prix) as Prix, COUNT(cmd.NumCmd) as count ' +
    'FROM articles as art INNER JOIN lignecmd as lcd ON (art.NumArt = lcd.idArt) ' +
    'INNER JOIN commandes as cmd ON (lcd.idCmd = cmd.NumCmd) ' +
    'WHERE NumCmd = ?';
    return con.query(sql, [idCmd], cb)
};
exports.getPrixTotCmd = getPrixTotCmd;