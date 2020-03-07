const http = require('http');

const finalhandler = require('finalhandler');
const Router = require('router');
const nodeStatic = require('node-static');

let router = new Router();

const moduleCo = require('./bdd/connector');
const userRoute = require('./routes/userCtrl');

const artRoute = require('./routes/articleRoute');
const artIdRoute = require('./routes/artIdRoute');

const boiteRoute = require('./routes/boiteRoute');

const cmdRoute = require('./routes/cmdRoute');
const cmdIdRoute = require('./routes/cmdIdRoute');

const compta = require('./routes/compta');

const ope = require('./bdd/operation');

ope.genRandStr();

let serverBack = http.createServer(function onRequest(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Request-Method', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === "OPTIONS") {
        res.statusCode = 200;
        res.end();
    }

    router(req, res, finalhandler(req, res))
});

const file = new(nodeStatic.Server)('./client/dist/chocoAngular/*');

const con = moduleCo.connectWith('admin', 'toto');

router.route('/')
    .get(function (req, res) {
        file.serve(req, res);
    });

router.use(function (req, res, next) {
    const connexionUser = router.route('/api/connexion');
    userRoute.connexion(connexionUser, con);
    next()
});

router.use(function (req, res, next) {
    const inscr = router.route('/api/inscription');
    userRoute.inscription(inscr, con);
    next()
});

router.use(function (req, res, next) {
    const article = router.route('/api/article');
    artRoute.ArticlesRoute(article, con);
    next()
});

router.use(function (req, res, next) {
    const articleBoite = router.route('/api/boite');
    boiteRoute.boiteRoute(articleBoite, con);
    next()
});

router.use(function (req, res, next) {
    const artId = router.route('/api/article/:id');
    artIdRoute.artIdRoute(artId, con);
    next()
});

router.use(function (req, res, next) {
    const commande = router.route("/api/commandes");
    cmdRoute.commandeRoute(router, commande, con);
    next()
});

router.use(function (req, res, next) {
    const cmdId = router.route('/api/commandes/:id');
    cmdIdRoute.cmdIdRoute(cmdId, con);
    next()
});

router.use(function (req, res, next) {
    const comptabilite = router.route("/api/comptabilite");
    compta.comptaRoute(comptabilite, con);
    next()
});

// const hostname = 'localhost';
const port = process.env.PORT || 8085;

serverBack.listen(port, () => {
    console.log(`Server running on :${port}/`);
});