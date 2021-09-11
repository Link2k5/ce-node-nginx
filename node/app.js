const express = require('express')
const app = express()
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'node_db'
})


const users = [
    'João da Silva',
    'Maria de Oliveira',
    'José Antônio',
    'Ana Maria',
]

connection.connect()

users.forEach(user => {
    connection.query(`INSERT INTO users(name) values ('${user}')`, (error, results, fields) => {
        if (error) throw error
        console.log(results)
    })
})


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const sqlQuery = 'Select name from users'
    connection.query(sqlQuery, (error, result, fields) => {
        if (error) throw error
        res.render('pages/index', {users: result})
    })

})

app.listen(3000)

