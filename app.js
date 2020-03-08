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

// genere une clé pour chiffré les tokens
ope.genRandStr();

let server = http.createServer(function onRequest(req, res) {
    router(req, res, finalhandler(req, res))
});
// chemin vers les fichiers compilé d'Angular
const file = new(nodeStatic.Server)('./client/dist/chocoAngular/');

router.use(function (req, res, next) {
    file.serve(req, res);

    router.route('/Connexion')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Inscription')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Accueil')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Commandes')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Panier')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Comptabilité')
        .get(function (req, res) {
            file.serve(req, res);
        });

    next()
});

// la connexion à la bdd
const con = moduleCo.connect();

// toutes les routes de l'API
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

// Les routes vers les fichiers compilés d'Angular
/*
router.use(function (req, res, next) {
    router.route('*')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Connexion')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Inscription')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Accueil')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Commandes')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Panier')
        .get(function (req, res) {
            file.serve(req, res);
        });
    router.route('/Comptabilité')
        .get(function (req, res) {
            file.serve(req, res);
        });
    next()
});
 */
// const hostname = 'localhost';
const port = process.env.PORT || 8085;

server.listen(port, () => {
    console.log(`Server running on :${port}/`);
});