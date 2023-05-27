const mysql = require("mysql")


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@123",
    database: "bookstore"
});
db.connect((err)=>{
    if(err) console.log("Not connect")
    console.log("Connected")
})
module.exports = db