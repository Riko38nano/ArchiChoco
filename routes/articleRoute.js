const art = require('../bdd/tables/art');
const autre = require('../bdd/tables/autre');
const boite = require('../bdd/tables/boite');
const tab = require('../bdd/tables/tablette');

const operation = require('../bdd/operation');

const ArticlesRoute = function (article, con) {
    article
        .get(function (req, res) {
            // Get tous les articles avec les details des SousTables

            const token = JSON.parse(JSON.stringify(req.headers)).authorization;

            const decoded = operation.decodeToken(token);

            if (decoded === null) {
                res.statusCode = 403;
                res.end(JSON.stringify({
                    error: "Your token is not availaible"
                }))
            } else {

                art.getArticles(con, function (err, result) {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.toString())
                    }

                    result = JSON.parse(JSON.stringify(result));

                    let tabArticleExtended = [];

                    if (result.length > 0) {

                        for (let i = 0; i < result.length; i++) { // pour chaque article que l'on trouve dans la table principal
                            // on veut pouvoir recuperer les attributs qu'il a dans la SousTable qui lui correspond

                            const type = result[i].Type;
                            const id = result[i].NumArt;
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

                                    tabArticleExtended[i] = operation.createArticleExtended(result[i], result2);

                                    if (i === result.length - 1) {

                                        res.statusCodec = 200;
                                        res.end(JSON.stringify(tabArticleExtended));

                                    }
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
        .post(function (req, res) {

            // Ajoute un article dans article et dans la sousTable

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

                    if (decoded && decoded.admin === 1) {
// ici on veut que seul les admin puisse poster des boites qui se voient
                        art.insertArt(con, body.Prix, body.Type, decoded.admin, function (err, result) {
                            if (err) {
                                res.statusCode = 400;
                                res.end(err.toString())
                            }

                            console.log(result);
                            result = JSON.parse(JSON.stringify(result));
                            console.log(result);

                            const type = body.Type;
                            switch (type) {
                                case "boites":
                                    boite.insertBoiteWId(con, result.insertId, body.quantite, body.noisette, body.alcool, body.blanc, body.noir, body.au_lait, body.praline, function (error, result2) {
                                        if (error) {
                                            res.statusCode = 400;
                                            res.end(error.toString())
                                        }
                                        cbInsertTable(result2)
                                    });
                                    break;
                                case "tablettes":
                                    tab.insertTabletteWId(con, result.insertId, body.typeChoco, function (error, result2) {
                                        if (error) {
                                            res.statusCode = 400;
                                            res.end(error.toString())
                                        }
                                        cbInsertTable(result2)
                                    });
                                    break;
                                case "autres":
                                    autre.insertAutreWId(con, result.insertId, body.description, function (error, result2) {
                                        if (error) {
                                            res.statusCode = 400;
                                            res.end(error.toString())
                                        }
                                        cbInsertTable(result2)
                                    });
                                    break;
                                default:
                                    res.end("Article de type inconnu");

                            }

                            function cbInsertTable(result) {
                                res.statusCode = 201;
                                res.end(JSON.stringify(result))
                            }
                        })
                    } else {
                        res.statusCode = 403;
                        res.end(JSON.stringify({
                            error: "Unauthorized to insert this item"
                        }))
                    }
                })
            }
        });
};
exports.ArticlesRoute = ArticlesRoute;