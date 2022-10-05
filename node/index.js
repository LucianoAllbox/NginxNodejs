const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db', 
    user: 'root', 
    password: 'root', 
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

var retorno = ""

//Limpar o banco ao subir o serviço, apenas pra facilitar os testes
//const sqlClear = "DELETE FROM people"
//connection.query(sqlClear)

app.get('/', (req, res) => {

    //A cada chamada inserir uma linha no banco
    var dataHora = new Date().toString().replace(/T/, ':').replace(/\.\w*/, '');
    const sql = "INSERT INTO people(name) values ('Luciano - " + dataHora + "')"
    connection.query(sql)

    //desolver a lista retornada do banco
    connection.connect(function(err) {
        connection.query("SELECT name FROM people", function (err, rows) {
            retorno = '<p><h1>Full Cycle Rocks!</h1></p>'
            rows.forEach(function(row) {
                retorno = retorno + '<p>' + row.name + "</p>";
            });      
        });
        res.send(retorno)
    });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})