const cli = require('../bdd/tables/client');
const jwt = require('jsonwebtoken');
const ope = require('../bdd/operation');

const connexion = function (connexionUser, con) {
    connexionUser.post(function (req, res) {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            if (ope.isJSON(body)) {
                body = JSON.parse(body);
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    error: "You should send JSON"
                }))
            }

            if (body.mail) {
                // On regarde si le client existe dans la base

                cli.getClientByMail(con, body.mail, function (err, result) {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.toString())
                    }

                    if (result && result.length > 0) { // si un utilisateur possède cet email
                        result = JSON.parse(JSON.stringify(result[0]));

                        if (result.mdpCli === ope.crypt(body.mdpCli)) {
                            let userData = {
                                "mail": body.mail,
                                "admin": result.EstAdmin
                            };

                            res.statusCode = 200;
                            let token = jwt.sign(userData, ope.getRandStr(), {expiresIn: '2h'});
                            res.end(JSON.stringify({
                                token: token
                            }))

                        } else {
                            res.statusCode = 403;
                            res.end(JSON.stringify({
                                error: "Wrong password"
                            }))
                        }

                    } else {
                        res.statusCode = 401;
                        res.end(JSON.stringify({
                            error: "identification non renseigné"
                        }))
                    }
                });
            }
        })
    })
        .all(function (req, res) {
            res.statusCode = 405;
            res.end(JSON.stringify({
                error: "Method not allowed"
            }))
        })
};
exports.connexion = connexion;

const inscription = function (inscr, con) {
    inscr.post(function (req, res) {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);

            cli.getClientByMail(con, body.mail, function (err, result) {

                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({
                        error: err.toString()
                    }))
                }

                if (result.length === 0) { // si l'email n'est pas déjà dans la base
                    const cryptedPass = ope.crypt(body.mdp);
                    cli.insertCli(con, body.mailCli, body.NomCli, body.PnomCli, body.RueCli, body.CPCli, body.VilleCli, cryptedPass,
                        function (err, result) {
                            if (err) {
                                res.statusCode = 400;
                                res.end(JSON.stringify({
                                    error: err.toString()
                                }))
                            }
                            res.end(JSON.stringify(result));
                        });
                } else { // si l'email existe dans la base
                    res.statusCode = 409;
                    res.end(JSON.stringify({
                        error: 'User arleady exist'
                    }))
                }
            });
        });
    })
        .all(function (req, res) {
            res.statusCode = 405;
            res.end(JSON.stringify({
                error: "Method not allowed"
            }))
        })
};
exports.inscription = inscription;