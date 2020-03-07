const art = require('../bdd/tables/art');
const autre = require('../bdd/tables/autre');
const boite = require('../bdd/tables/boite');
const tab = require('../bdd/tables/tablette');

const ligneCmd = require('../bdd/tables/ligneCmd');

const operation = require('../bdd/operation');

const ArticlesRoute = function (article, con) {
        article
            .get(function (req, res) {

                const token = JSON.parse(JSON.stringify(req.headers)).authorization;

                const decoded = operation.decodeToken(token);
                if (decoded === null) {
                    res.statusCode = 401;
                    res.end(JSON.stringify({
                        error: "Your token is not readable"
                    }))
                } else {
                    // Get tous les articles avec les details des SousTables

                    const id = req.url.split('/')[2];

                    art.getArticle(con, id, function (err, result) {
                        if (err) {
                            res.statusCode = 500;
                            res.end(err.toString())
                        }

                        result = JSON.parse(JSON.stringify(result));

                        let tabArticleExtended = [];

                        if (result.length > 0) {

                            // on veut pouvoir recuperer les attributs qu'il a dans la SousTable qui lui correspond

                            const type = result.Type;
                            const id = result.NumArt;
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
                                    res.end(JSON.stringify({
                                        error: "Article de type inconnu"
                                    }));

                                function cbGetTable(result2) {
                                    result2 = JSON.parse(JSON.stringify(result2[0]));

                                    tabArticleExtended = operation.createArticleExtended(result, result2);

                                    if (i === result.length - 1) {

                                        res.statusCodec = 200;
                                        res.end(JSON.stringify(tabArticleExtended));

                                    }
                                }
                            }
                        } else {
                            res.statusCode = 200;
                            res.end()
                        }
                    })
                }
            })
            .put(function (req, res) {

                const token = JSON.parse(JSON.stringify(req.headers)).authorization;
                const decoded = operation.decodeToken(token);
                if (decoded === null) {
                    res.statusCode = 401;
                    res.end(JSON.stringify({
                        error: "Your token is not readable"
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

                        if (decoded.admin === 1) {
                            // on décide de ne pas pouvoir changer le type d'un article et de preferer supprimer l'article en question

                            const id = req.url.split('/')[2];
                            let count = 1; // variable pour compter le nombre de fois où l'on rentre dans le callBack de fin
                            let nbParam = 0; // variable qui compte le nombre de paramètre non null

                            if ((body.chaine === null || body.chaine === '') && (body.Prix === null || body.Prix === '') && (body.Affichage === null || body.Affichage === '')) {
                                // pas de body
                                res.statusCode = 401;
                                res.end(JSON.stringify({
                                    error: "You should send something in your body"
                                }))
                            } else {

                                if (body.chaine && body.chaine.length > 0) {
                                    nbParam += 1;
                                    art.getType(con, id, function (err, result) {
                                        if (err) {
                                            res.statusCode = 400;
                                            res.end(err.toString())
                                        }

                                        console.log(result);

                                        result = JSON.parse(JSON.stringify(result[0]));

                                        const type = result.Type;
                                        switch (type) {
                                            case "tablettes": // 3 param + 1
                                                tab.updateTablette(con, id, body.chaine, function (error, result2) {
                                                    if (error) {
                                                        res.statusCode = 400;
                                                        res.end(error.toString())
                                                    }
                                                    cbUpdateTable(result2)
                                                });
                                                break;
                                            case "autres": // 3 param + 1
                                                autre.updateAutre(con, id, body.chaine, function (error, result2) {
                                                    if (error) {
                                                        res.statusCode = 400;
                                                        res.end(error.toString())
                                                    }
                                                    cbUpdateTable(result2)
                                                });
                                                break;
                                            default:
                                                res.end(JSON.stringify({
                                                    error: "table name unknown"
                                                }));
                                        }
                                    })
                                }

                                if (body.Prix && body.Prix.length > 0) {
                                    nbParam += 1;
                                    art.updateArtPrix(con, id, body.Prix, function (error, result2) {
                                        if (error) {
                                            res.statusCode = 400;
                                            res.end(error.toString())
                                        }
                                        cbUpdateTable(result2)
                                    });
                                }

                                if (body.Affichage === 0 || body.Affichage === 1) {
                                    nbParam += 1;
                                    art.updateArtAff(con, id, body.Affichage, function (error, result2) {
                                        if (error) {
                                            res.statusCode = 400;
                                            res.end(error.toString())
                                        }
                                        cbUpdateTable(result2)
                                    })
                                }

                                function cbUpdateTable(result) {
                                    if (count >= nbParam) {
                                        res.statusCode = 201;
                                        res.end(JSON.stringify(result))
                                    } else {
                                        count++
                                    }
                                }
                            }
                        } else {
                            res.statusCode = 403;
                            res.end(JSON.stringify({
                                error: "Unauthorized to update this item"
                            }))
                        }
                    })
                }
            })
            .delete(function (req, res) {
                const token = JSON.parse(JSON.stringify(req.headers)).authorization;

                const decoded = operation.decodeToken(token);
                if (decoded === null) {
                    res.statusCode = 401;
                    res.end(JSON.stringify({
                        error: "Your token is not readable"
                    }))
                } else {

                    if (decoded.admin === 1) {

                        // pour supprimer un article il faut d'abord le supprimer de la sous-table

                        const id = req.url.split('/')[2];

                        // pour supprimer il faut qu'aucun client n'ait commandé cet article, si une commande est en cours on placera l'attribut affichage à 0 dans article
                        // ainsi on pourra afficher ou non coté FrontEnd en fonction de cet attribut

                        ligneCmd.getLigneByArt(con, id, function (err, result) {
                            if (err) {
                                res.statusCode = 500;
                                res.end(err.toString())
                            }

                            if (result.length === 0) { // si aucune commande n'est faite sur cet article

                                // on recupere le type de l'article

                                art.getType(con, id, function (err2, result2) {

                                    if (err2) {
                                        res.statusCode = 500;
                                        res.end(err2.toString())
                                    }

                                    result2 = JSON.parse(JSON.stringify(result2[0]));
                                    const type = result2.Type;
                                    // On supprime l'article dans la sousTable qui correspond à son type
                                    switch (type) {
                                        case "tablettes":
                                            tab.delTablette(con, id, function (err3) {
                                                cbDelTable(err3)
                                            });
                                            break;
                                        case "boites":
                                            boite.delBoite(con, id, function (err3) {
                                                cbDelTable(err3)
                                            });
                                            break;
                                        case "autres":
                                            autre.delAutre(con, id, function (err3) {
                                                cbDelTable(err3)
                                            });
                                            break;
                                        default:
                                            res.statusCode = 400;
                                            res.end("Nom de la table incorrect");
                                    }

                                });

                                function cbDelTable(err) {

                                    if (err) {
                                        res.statusCode = 400;
                                        res.end(err.toString())
                                    }

                                    // enfin on supprime l'article dans la table principale
                                    art.delArt(con, id, function (err4, result4) {
                                        if (err4) {
                                            res.statusCode = 400;
                                            res.end(err4.toString())
                                        }

                                        res.statusCode = 200;
                                        res.end(JSON.stringify(result4));
                                    });
                                }
                            } else { // si une commande est en cours sur cet article
                                art.updateArtAff(con, id, 0, function (err) {
                                    if (err) {
                                        res.statusCode = 400;
                                        res.end(err.toString())
                                    }

                                    res.statusCode = 200;
                                    res.end(JSON.stringify({
                                        info: 'Vous avez des commandes liées à cet article'
                                    }))
                                })
                            }
                        })
                    } else {
                        res.statusCode = 403;
                        res.end(JSON.stringify({
                            error: "Unauthorized to delete this item"
                        }))
                    }
                }
            })
            .all(function (req, res) {
                res.statusCode = 405;
                res.end(JSON.stringify({
                    error: "Method not allowed"
                }))
            })
    }
;
exports.artIdRoute = ArticlesRoute;