const express = require('express');
const mysql = require('mysql2')
const app = express();
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.SQL_PORT,
    ssl: { rejectUnauthorized: false }
});

const users = [
    ['Yasin', 'Duo Daggers', 16],
    ['John', 'Sword', 18],
    ['Doe', 'Arrow', 19],
    ['Jimmy', 'Greatsword', 22],
    ['Arnold', 'Spear', 16],
    ['Nolan', 'Knife', 14]
]

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
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});

con.connect((err) => {
    if (err) throw new Error(err);
    app.get('/api', authApiKey, (req, res) => {
        con.query('SELECT * FROM users', (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json(result);
        });
    });
})

app.get('/', (req, res) => {
    res.send(`
        <div style="width: 100%; height: 100dvh; display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 20px; padding: 0; margin: 0;">
            <p style="font-size:35px; font-family: sans-serif; padding: 0; margin: 0">You can use my API here: https://my-first-api-two.vercel.app/api</p>
            <p style="font-size:35px; font-family: sans-serif; padding: 0; margin: 0">But I won't say the API key</p>
        </div>
    `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
