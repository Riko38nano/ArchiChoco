const cli = require('../bdd/tables/client');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
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

                cli.getClientByMail(con, body.mail.toString(), function (err, result) {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.toString())
                    }

                    if (result.length > 0) { // si un utilisateur possède cet email, eg si la réponse ne fait pas que deux carachtere donc une reponse vide
                        result = JSON.parse(JSON.stringify(result[0]));

                        //bcrypt.compare(body.mdp.toString(), result.mdpCli.toString(), function (err, resBcrypt) {
                        /*
                            if (err) {
                                res.statusCode = 500;
                                res.end(JSON.stringify({
                                    error: "Hash do not match"
                                }))
                            }

                         */
                            //if (resBcrypt) { // si le hash du mdp de la base correspond à celui fourni
                                let userData = {
                                    "mail": body.mail,
                                    "admin": result.EstAdmin
                                };

                                res.statusCode = 200;
                                let token = jwt.sign(userData, ope.getRandStr(), {expiresIn: '2h'});
                                res.end(JSON.stringify({
                                    token: token
                                }))
                        /*
                            } else {
                                res.statusCode = 403;
                                res.end(JSON.stringify({
                                    error: "Wrong password"
                                }))
                            }

                         */
                        //});
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
                   // bcrypt.hash(body.mdpCli, 5, function (err, pass) {
                        cli.insertCli(con, body.mailCli, body.NomCli, body.PnomCli, body.RueCli, body.CPCli, body.VilleCli, body.mdp,
                            function (err, result) {
                                if (err) {
                                    res.statusCode = 400;
                                    res.end(JSON.stringify({
                                        error: err.toString()
                                    }))
                                }
                                res.end(JSON.stringify(result));
                            });
                   // });
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