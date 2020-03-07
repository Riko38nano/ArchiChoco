const getClientNomPnom = function (con, id, callback) {
    const sql = 'SELECT NomCli, PnomCli ' +
        'FROM Clients ' +
        "WHERE NumCli = ?";
    return con.query(sql, [id], callback)
};
exports.getClientNomPnom = getClientNomPnom;

const getClientByMail = function (con, mail, callback) {
    const sql = 'SELECT NumCli, mdpCli, EstAdmin ' +
        'FROM Clients ' +
        "WHERE mailCli = ?";
    return con.query(sql, [mail], callback)
};
exports.getClientByMail = getClientByMail;

const getIdCliByMail = function (con, mail, cb) {
    const sql = 'SELECT NumCli ' +
        'FROM Clients ' +
        'WHERE mailCli = ?';
    return con.query(sql, [mail], cb)
};
exports.getIdCliByMail = getIdCliByMail;

const getNomAddress = function (con, id, callback) {
    const sql = 'SELECT NomCli, PnomCli, RueCli, CPCli, VilleCli ' +
        'FROM Clients ' +
        "WHERE NumCli = ?";
    return con.query(sql, [id], callback)
};
exports.getNomAddress = getNomAddress;

const insertCli = function (con, mail, nom, pnom, rue, cp, ville, mdpHash, callback) {
    const sql = "INSERT INTO Clients (mailCli, NomCli, PnomCli, RueCli, CPCli, VilleCli, mdpCli, EstAdmin)" +
        " VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    return con.query(sql, [mail, nom, pnom, rue, cp, ville, mdpHash, 0], callback)
};
exports.insertCli = insertCli;

/*
const updateCli = function (con, id, mail, nom, pnom, rue, cp, ville, mdpHash, callback) {
    const sql = 'UPDATE Clients ' +
    "SET mailCli = ?, nomCli = ?" +
    ", pnomCli = ?, rueCli = ?" +
    ", cpCli = ?" + ", villeCli = ?" +
    ", mdpCLi = ?)" +
    " WHERE numCli = ?";
    return con.query(sql, [mail, nom, pnom, rue, cp, ville, mdpHash, id], callback)
};
exports.updateCli = updateCli;
 */
/*
const delCli = function (con, id, callback) {
    const sql = 'DELETE FROM clients ' +
    "WHERE numCli = ?";
    return con.query(sql, [id], callback)
};
exports.delCLi = delCli;
 */