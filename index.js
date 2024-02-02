const express = require('express');
const cors = require('cors');
const {body} = require('express-validator');
// const authMiddleware = require('../middlewares/auth-middleware');
// const userController = require('../controllers/user-controller');

const app = express();

// Middleware для обработки CORS-заголовков для всего приложения
// app.use((req, res, next) => {
//     console.log('!!!')
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', true);
//
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Origin', '*'); // или укажите конкретные источники
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         res.header('Access-Control-Allow-Headers', 'Content-Type');
//         res.header('Access-Control-Allow-Credentials', true);
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });
app.use(cors({
    origin: "*"
}))

app.options('*', (req, res) => {
    console.log('!!!')
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    res.sendStatus(200);
});

// Пример маршрута
app.get("/simple-cors", (req, res) => {
    console.info("GET /simple-cors");
    console.log('req: ', req);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    res.json({
        text: "Simple CORS requests are working. [GET]"
    });
});
app.options("/simple-cors", (req, res) => {
    console.info("GET /simple-cors");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    res.json({
        text: "Simple CORS requests are working. [GET]"
    });
});
// Еще один пример маршрута
app.post("/other-route", (req, res) => {
    console.info("POST /other-route");
    res.json({
        text: "Other route. [POST]"
    });
});

// Ваши другие маршруты...

// Обработка ошибки 404
app.use((req, res, next) => {
    res.status(404).json({
        error: "Not Found"
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal Server Error"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
