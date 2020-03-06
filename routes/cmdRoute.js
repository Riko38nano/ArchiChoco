const cli = require('../bdd/tables/client');
const autre = require('../bdd/tables/autre');
const boite = require('../bdd/tables/boite');
const tab = require('../bdd/tables/tablette');

const ligneCmd = require('../bdd/tables/ligneCmd');
const cmd = require('../bdd/tables/commande');

const operation = require('../bdd/operation');

const cmdRoute = function (router, commande, con) {
    commande.get(function (req, res) {
        const token = JSON.parse(JSON.stringify(req.headers)).authorization;

        const decoded = operation.decodeToken(token);

        if (decoded === null) {
            res.statusCode = 401;
            res.end(JSON.stringify({
                error: "Your token is not availaible"
            }))
        } else {

            if (decoded.admin === 1) {

                ligneCmd.getCommandes(con, function (err, result) {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.toString())
                    }

                    result = JSON.parse(JSON.stringify(result));

                    if (result.length > 0) { // si il y a des commandes

                        let tabCmd = [];

                        const diff = operation.findDiff(result); // Les commandes différentes

                        for (let i = 0; i < diff.length; i++) {
                            // Recupere des information sur les clients qui ont commandé
                            if (result[diff[i]].Livraison === 1) {

                                // Si le client veut se faire livrer on recupere son addresse
                                cli.getNomAddress(con, result[diff[i]].NumCli, function (err2, res2) {
                                    if (err2) {
                                        res.statusCode = 500;
                                        res.end(err.toString())
                                    }

                                    res2 = JSON.parse(JSON.stringify(res2[0]));

                                    tabCmd[i] = {
                                        NumCmd: result[diff[i]].NumCmd,
                                        NomCli: res2.nomCli,
                                        PnomCli: res2.pnomCli,
                                        Consigne: result[diff[i]].Consigne,
                                        Livraison: result[diff[i]].Livraison,
                                        RueCli: res2.rueCli,
                                        CPCli: res2.CPcli,
                                        VilleCli: res2.villeCli,
                                        artList: '',
                                        prixTot: ''
                                    };
                                });

                            } else {
                                // pas de livraison
                                cli.getClientNomPnom(con, result[diff[i]].NumCli, function (err2, res2) {
                                    if (err2) {
                                        res.statusCode = 500;
                                        res.end(err.toString())
                                    }

                                    res2 = JSON.parse(JSON.stringify(res2[0]));

                                    tabCmd[i] = {
                                        NumCmd: result[diff[i]].NumCmd,
                                        NomCli: res2.nomCli,
                                        PnomCli: res2.pnomCli,
                                        Consigne: result[diff[i]].Consigne,
                                        Livraison: result[diff[i]].Livraison,
                                        artList: '',
                                        prixTot: ''
                                    };
                                });
                            }

                            // recuperer les detail des articles

                            ligneCmd.getLcdByCmd(con, result[diff[i]].NumCmd, function (err3, res3) {
                                if (err3) {
                                    res.statusCode = 500;
                                    res.end(err3.toString())
                                }

                                let tabArticleExtended = [];
                                res3 = JSON.parse(JSON.stringify(res3));
                                for (let j = 0; j < res3.length; j++) { // pour chaque article que l'on trouve dans la table principal
                                    // on veut pouvoir recuperer les attributs qu'il a dans la SousTable qui lui correspond

                                    const type = res3[j].Type;
                                    const id = res3[j].idArt;
                                    switch (type) {
                                        case "boites":
                                            boite.getBoite(con, id, function (error, result2) {
                                                if (err) {
                                                    res.statusCode = 500;
                                                    res.end(err.toString())
                                                }
                                                cbGetTable(result2)
                                            });
                                            break;
                                        case "tablettes":
                                            tab.getTablette(con, id, function (error, result2) {
                                                if (err) {
                                                    res.statusCode = 500;
                                                    res.end(err.toString())
                                                }
                                                cbGetTable(result2)
                                            });
                                            break;
                                        case "autres":
                                            autre.getAutre(con, id, function (error, result2) {
                                                if (err) {
                                                    res.statusCode = 500;
                                                    res.end(err.toString())
                                                }
                                                cbGetTable(result2);
                                            });
                                            break;
                                        default:
                                            res.statusCode = 400;
                                            res.end("Article de type inconnu");

                                        function cbGetTable(result2) {
                                            result2 = JSON.parse(JSON.stringify(result2[0]));

                                            tabArticleExtended[j] = operation.createArticleExtended(
                                                {
                                                    NumArt: res3[j].idArt,
                                                    Type: res3[j].Type,
                                                    Prix: res3[j].Prix,
                                                    Affichage: res3[j].Affichage
                                                }, result2);

                                            tabCmd[i].artList = tabArticleExtended;
                                            tabCmd[i].prixTot = operation.getPrixTot(res3);

                                            if (j === res3.length - 1 && i === diff.length - 1) {

                                                console.log(tabCmd);
                                                res.end(JSON.stringify(tabCmd));

                                            }
                                        }
                                    }
                                }
                            });
                        }
                    } else {
                        res.statusCode = 200;
                        res.end()
                    }
                });
            } else {
                res.statusCode = 403;
                res.end(JSON.stringify({
                    error: "Unauthorized to get this item"
                }))
            }
        }
    })
        .post(function (req, res) {
            const token = JSON.parse(JSON.stringify(req.headers)).authorization;

            const decoded = operation.decodeToken(token);

            if (decoded === null) {
                res.statusCode = 401;
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

                    const date = new Date();
                    date.setMonth(date.getMonth() + 1);
                    const dateStr = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();

                    cli.getIdCliByMail(con, decoded.mail, function (errCli, resCli) {
                        if (errCli) {
                            res.statusCode = 400;
                            res.end(errCli.toString())
                        }

                        resCli = JSON.parse(JSON.stringify(resCli[0]));

                        cmd.insertCmd(con, resCli.NumCli, dateStr, body.consigne, body.livraison, function (err, result) {
                            if (err) {
                                res.statusCode = 500;
                                res.end(err.toString())
                            }

                            // Insertion de toute les lignes de commandes

                            result = JSON.parse(JSON.stringify(result));

                            for (let i = 0; i < body.artList.length; i++) {
                                ligneCmd.insertLigne(con, result.insertId, body.artList[i], function (err2) {
                                    if (err2) {
                                        res.statusCode = 400;
                                        res.end(err2.toString())
                                    }

                                    callBackInsertLigne(i)
                                });
                            }

                            function callBackInsertLigne(count) {
                                if (count >= body.artList.length - 1) {
                                    res.statusCode = 200;
                                    res.end("Commande inserted properly")
                                }
                            }
                        })
                    });
                })
            }
        })
        .all(function (req, res) {
            res.statusCode = 405;
            res.end('methot not allowed')
        });
};
exports.commandeRoute = cmdRoute;