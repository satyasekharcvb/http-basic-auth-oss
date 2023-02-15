// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth')

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

// app.use(/^(?!\/api).+/, (req, res) => {
//     res.sendFile(path.resolve(DIST_DIR, 'index.html'));
// });


app.get('/api/animals', (req, res) => {
    res.json({ animals: ["Lion", "Tiger", "Bear", "Monkey"] });
});

app.get('/api/birds',basicAuth({
    challenge: true,
    users: { 'admin': 'supersecret' },
    unauthorizedResponse: (req)=>{console.dir(req)}
}), (req, res) => {
    console.dir(req);
    res.json({ birds: ["Sparrow", "Pigeon", "Parrot", "Crow"] });
});


app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}`
    )
);
