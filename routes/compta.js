const comptaReq = require('../bdd/tables/archiveCmd');
const operation = require('../bdd/operation');

const comptaRoute = function (compta, con) {

    compta.get(function (req, res) {

        const token = JSON.parse(JSON.stringify(req.headers)).authorization;

        const decoded = operation.decodeToken(token);

        if (decoded === null) {
            res.statusCode = 401;
            res.end(JSON.stringify({
                error: "Your token is not availaible"
            }))
        } else {

            if (decoded.admin === 1) {

                comptaReq.getBenef(con, function (err, result) {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.toString())
                    }

                    // renvoie le bénefice cad la somme de tous les prix totaux de la table archive commande
                    // avec aussi le nombre de commandes réalisé

                    res.statusCode = 200;
                    res.end(JSON.stringify(result))
                })
            } else {
                res.statusCode = 403;
                res.end(JSON.stringify({
                    error: "Unauthorized to get this item"
                }))
            }
        }
    })
};
exports.comptaRoute = comptaRoute;