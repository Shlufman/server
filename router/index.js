const express = require('express');
const cors = require('cors');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');

const app = express();

// Используем cors middleware для обработки CORS-заголовков
app.use(cors({
  origin: '*', // Разрешаем доступ с любого источника
  methods: 'GET, POST, PUT, DELETE', // Укажите нужные методы
  allowedHeaders: 'Content-Type', // Укажите разрешенные заголовки
  credentials: true, // Разрешаем отправку куки и заголовка Authorization
}));

app.options('/registration', cors());

app.post('/registration',
    cors({ origin: ['*', 'http://localhost:5500', 'http://localhost:3000' ]}),
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);

app.post('/login', userController.login);
app.post('/logout', userController.logout);
app.get('/activate/:link', userController.activate);
app.get('/refresh', userController.refresh);
app.get('/users', authMiddleware, userController.getUsers);

module.exports = app
