const express = require('express');
const mysql = require('mysql2');
const app = express();
require('dotenv').config();
const cors = require('cors');

// Настройка CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.SQL_PORT,
    ssl: { rejectUnauthorized: false }
});

const API_KEY = process.env.API_KEY;
const authApiKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'Api key is missing' });
    }

    if (apiKey !== API_KEY) {
        return res.status(403).json({ error: 'Invalid Api key' });
    }

    next();
};

con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        process.exit(1);
    }
});

app.get('/api', authApiKey, (req, res) => {
    con.query('SELECT * FROM users', (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(result);
    });
});

// Главная страница
app.get('/', (req, res) => {
    res.send(`
        <div style="width: 100%; height: 100dvh; display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 20px; padding: 0; margin: 0;">
            <p style="font-size:35px; font-family: sans-serif; padding: 0; margin: 0">You can use my API here: https://my-first-api-two.vercel.app/api</p>
        </div>
    `);
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
