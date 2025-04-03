const express = require('express');
const app = express();
require('dotenv').config();

const users = [
    { user_id: 1, name: 'Yasin', favorite_product: 'Duo Daggers', age: 16 },
    { user_id: 2, name: 'John', favorite_product: 'Sword', age: 18 },
    { user_id: 3, name: 'Doe', favorite_product: 'Arrow', age: 19 },
    { user_id: 4, name: 'Jimmy', favorite_product: 'Greatsword', age: 22 },
    { user_id: 5, name: 'Arnold', favorite_product: 'Spear', age: 16 },
    { user_id: 6, name: 'Nolan', favorite_product: 'Knife', age: 14 },
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
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');  // Добавляем x-api-key сюда
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});

app.get('/api', authApiKey, (req, res) => {
    res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));