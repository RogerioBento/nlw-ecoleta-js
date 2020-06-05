//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto DB
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// criando tabela e registros com o serialize e o run para rodar as queries
db.serialize(() => {
//     //Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id integer primary key autoincrement,
//             image text,
//             name text,
//             address text,
//             address2 text,
//             state text,
//             city text,
//             items text
//         );
//     `)
// const query = 
//             `INSERT INTO places (
//                 image,
//                 name,
//                 address,
//                 address2,
//                 state,
//                 city,
//                 items)
//             VALUES (?,?,?,?,?,?,?);
//             )`
//     const VALUES = [
//         "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", 
//         "Paperside",
//         "Guilherme Gemballa, Jardim America",
//         "N 260",
//         "Santa Catarina",
//         "Rio do sul",
//         "Residuos Eletronicos, Lampadas"]
 
    // db.all(`SELECT * FROM places`, function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     else {
    //         console.log('Registros:')
    //         console.log(rows)
    //     }
    // })

    // db.run('DELETE FROM places where id = ?', [1], function(err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     else {
    //         console.log('Registro deletado')
    //     }
    // })

})