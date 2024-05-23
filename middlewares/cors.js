const allowedCors = [
    'https://practicum.yandex.ru',
    'https://students-projects.ru',
    'https://outcastx0.nomoredomainswork.ru',   
];

function cors(req, res, next) {
    const { origin } = req.headers;
    console.log(origin);

    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    }
    next();
}

module.exports = { cors };