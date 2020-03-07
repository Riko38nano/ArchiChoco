const archCmd = require('../bdd/tables/archiveCmd');

const ligneCmd = require('../bdd/tables/ligneCmd');
const cmd = require('../bdd/tables/commande');

const operation = require('../bdd/operation');

const cmdIdRoute = function(commandeId, con){
    commandeId.delete(function (req, res) {

            const token = JSON.parse(JSON.stringify(req.headers)).authorization;

            const decoded = operation.decodeToken(token);

            if (decoded === null) {
                res.statusCode = 401;
                res.end(JSON.stringify({
                    error: "Your token is not availaible"
                }))
            } else {
                // Lorsqu'on supprime une commande on veut garder le bénéfice et sa date dans la table ArchiveCmd

                const idCmd = req.url.split('/')[3];

                // on doit récuperer le prix total de la commande, sa date et son id
                archCmd.getPrixTotCmd(con, idCmd, function (err, result) {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.toString())
                    }

                    result = JSON.parse(JSON.stringify(result[0]));

                    const date = new Date();
                    date.setMonth(date.getMonth() + 1);
                    const dateStr = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();

                    archCmd.insertArchCmd(con, idCmd, result.Prix, dateStr, function (err2) {

                        if (err2) {
                            res.statusCode = 500;
                            res.end(err2.toString())
                        }

                        // archivage faite
                        // suprresion de toute les ligneCmd de la commande en question

                        for (let i = 1; i <= result.count; i++) {
                            ligneCmd.delLigneByCmd(con, idCmd, function (err3) {
                                if (err3) {
                                    res.statusCode = 500;
                                    res.end(err3.toString())
                                }
                                callBackDelCmd(i)
                            });
                        }

                        function callBackDelCmd(count) {
                            if (count >= result.count) {
                                cmd.delCmd(con, idCmd, function (err4, res4) {
                                    if (err4) {
                                        res.statusCode = 500;
                                        res.end(err4.toString())
                                    }
                                    res.statusCode = 200;
                                    res.end(JSON.stringify(res4))
                                })
                            }
                        }
                    })
                })
            }
        })
};
exports.cmdIdRoute = cmdIdRoute;