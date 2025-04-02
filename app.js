const http = require('http')

const users = [
    { user_id: 1, name: 'Yasin', favorite_product: 'Duo Daggers', age: 16 },
    { user_id: 2, name: 'John', favorite_product: 'Sword', age: 18 },
    { user_id: 3, name: 'Doe', favorite_product: 'Arrow', age: 19 },
    { user_id: 4, name: 'Jimmy', favorite_product: 'Greatsword', age: 22 },
    { user_id: 5, name: 'Arnold', favorite_product: 'Spear', age: 16 },
    { user_id: 6, name: 'Nolan', favorite_product: 'Knife', age: 14 },
]

http.createServer((req, res) => {
    if (req.url === '/api') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(users))
        res.end()
    }
}).listen(8080)