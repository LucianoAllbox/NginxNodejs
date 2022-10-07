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
    connection.query(sql, function (err, result) {
        connection.query("SELECT name FROM people", function (err, rows) {
            console.log(rows);
            retorno = '<p><h1>Full Cycle Rocks!</h1></p>'
            Object.keys(rows).forEach(function(key) {
                var row = rows[key];
                console.log(row.name)
                retorno = retorno + row.name + '<br>'
              });
            res.send(retorno)
        });
    });

})

app.listen(port, ()=> {
    //limpar para facilitar os testes
    const sqlClear = "DELETE FROM people"
    connection.query(sqlClear)
    console.log('Rodando na porta ' + port)
})