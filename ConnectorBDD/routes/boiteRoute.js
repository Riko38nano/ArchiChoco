const operation = require('../bdd/operation');

const art = require('../bdd/tables/art');
const boite = require('../bdd/tables/boite');

const boiteRoute = function (article, con) {
    article.post(function (req, res) {
        const token = JSON.parse(JSON.stringify(req.headers)).authorization;

        const decoded = operation.decodeToken(token);

        if (decoded === null) {
            res.statusCode = 403;
            res.end(JSON.stringify({
                error: "Your token is not availaible"
            }))
        } else {

            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk)
            }).on('end', () => {
                body = Buffer.concat(body).toString();

                if (operation.isJSON(body)) {
                    body = JSON.parse(body);
                } else {
                    res.statusCode = 400;
                    res.end(JSON.stringify({
                        error: "You should send JSON"
                    }))
                }
// ici tous les clients peuvent poster des boites
                art.insertArt(con, body.Prix, body.Type, decoded.admin, function (err, result) {
                    if (err) {
                        res.statusCode = 400;
                        res.end(err.toString())
                    }

                    result = JSON.parse(JSON.stringify(result));

                    boite.insertBoiteWId(con, result.insertId, body.quantite, body.noisette, body.alcool, body.blanc, body.noir, body.au_lait, body.praline, function (error, result2) {
                        if (error) {
                            res.statusCode = 400;
                            res.end(error.toString())
                        }

                        res.statusCode = 201;
                        res.end(JSON.stringify(result))

                    });
                })
            })
        }
    })
};
exports.boiteRoute = boiteRoute;