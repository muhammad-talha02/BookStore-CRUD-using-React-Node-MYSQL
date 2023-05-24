import express from "express";
import mysql from "mysql";
import cors from "cors"
const port = 8000;

const app = express();
app.use(cors())


app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    database:"bookstore"
})


app.get("/", (req, res)=>{
    res.send("Hi")
})

app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books";
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res)=>{
    const q = "INSERT INTO books(title, description, cover, price) VALUES (?)"
    const values = [
      req.body.title,
      req.body.description,
      req.body.cover,
      req.body.price,
    ];

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book added successfully")
    })
})

app.listen(port, ()=>{
    console.log("App is Running on", port)
})