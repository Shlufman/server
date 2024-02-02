require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 80;
const app = express()

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     credentials: true,
//     origin: '*',
//     // origin: process.env.CLIENT_URL
// }));
// app.options('*', cors());
// app.use('/api', router);
// app.use(errorMiddleware);


app.get("/no-cors", (req, res) => {
    console.info("GET /no-cors");
    res.json({
        text: "You should not see this via a CORS request."
    });
});

/* -------------------------------------------------------------------------- */

app.head("/simple-cors", cors({origin: '*'}), (req, res) => {
    console.info("HEAD /simple-cors");
    res.sendStatus(204);
});
app.get("/simple-cors", cors({origin: '*'}), (req, res) => {
    console.info("GET /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [GET]"
    });
});
app.post("/simple-cors", cors({origin: '*'}), (req, res) => {
    console.info("POST /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [POST]"
    });
});

/* -------------------------------------------------------------------------- */

app.options("/complex-cors", cors({origin: '*'}));
app.delete("/complex-cors", cors({origin: '*'}), (req, res) => {
    console.info("DELETE /complex-cors");
    res.json({
        text: "Complex CORS requests are working. [DELETE]"
    });
});

/* -------------------------------------------------------------------------- */

const issue2options = {
    origin: true,
    methods: ["POST"],
    credentials: true,
    maxAge: 3600
};
app.options("/issue-2", cors(issue2options));
app.post("/issue-2", cors(issue2options), (req, res) => {
    console.info("POST /issue-2");
    res.json({
        text: "Issue #2 is fixed."
    });
});

/* -------------------------------------------------------------------------- */

if (!module.parent) {
    // const port = process.env.PORT || 3001;

    app.listen(PORT, () => {
        console.log("Express server listening on port " + PORT + ".");
    });
}



const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

// start()
