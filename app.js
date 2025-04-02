const express = require('express');
const app = express();

const users = [
    { user_id: 1, name: 'Yasin', favorite_product: 'Duo Daggers', age: 16 },
    { user_id: 2, name: 'John', favorite_product: 'Sword', age: 18 },
    { user_id: 3, name: 'Doe', favorite_product: 'Arrow', age: 19 },
    { user_id: 4, name: 'Jimmy', favorite_product: 'Greatsword', age: 22 },
    { user_id: 5, name: 'Arnold', favorite_product: 'Spear', age: 16 },
    { user_id: 6, name: 'Nolan', favorite_product: 'Knife', age: 14 },
]

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/api', (req, res) => {
    res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));