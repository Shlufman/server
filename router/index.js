const Router = require('express').Router;
const cors = require('cors');
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
// router.use(cors());
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // или указать конкретные источники
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Укажите нужные методы
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === 'GET' || req.method === 'POST') {
        res.sendStatus(200); // Отправляем успешный ответ для предварительного запроса
    } else {
        next();
    }
});

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router
