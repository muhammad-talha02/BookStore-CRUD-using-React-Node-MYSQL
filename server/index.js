import express from "express";
import mysql from "mysql";
import cors from "cors"
const port = 8000;

const app = express();
app.use(cors())


app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@123",
    database: "bookstore"
})


app.get("/", (req, res) => {
    res.send("Hi")
})


// Get All Books

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Add New Book

app.post("/books", (req, res) => {
    const q = "INSERT INTO books(title, description, cover, price, author) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
        req.body.author,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book added successfully")
    })
});


// Get Specific Book

app.get("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * from books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
});

// UpdATE A BOOK

app.put("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET title=? , description=?, cover=?, price=?, author=? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
        req.body.author,
    ];
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book Updated successfully")
    })
})

// Delete a Book

app.delete("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE from books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book Deleted Successfully")
    })
})

app.listen(port, () => {
    console.log("App is Running on", port)
})