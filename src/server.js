const express = require("express")
const server = express()

const db = require("../src/database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o req.body na aplicaçao
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminho da home
server.get("/", (req, res) => {
    return res.render("index.html", { 
        title: "Um titulo" })

})
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
        const query = 
            `INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items)
            VALUES (?,?,?,?,?,?,?);
            )`
    const VALUES = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items    
    ]

    function afterInsertData(err) {
            if (err) {
                console.log(err)
                return res.render("create-point.html", {error: true})
            }
            else {
                console.log('Cadastrado com sucesso.')
                console.log(this)
                return res.render("create-point.html", {saved: true})
            }
        }
            db.run(query, VALUES, afterInsertData)
})


server.get("/search-results", (req, res) => {

    const search = req.query.search

    if(search == ''){
        return res.render('search-results.html', {total: 0})
    }else{
        db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function(err, rows) {
            const total = rows.length
            if(err){
                console.log(err)
            }
            else{
                console.log('Registros:')
                console.log(rows)
                return res.render("search-results.html", {places: rows, total: total})
            }
        })
    }

})

//ligar o server
server.listen(3000)