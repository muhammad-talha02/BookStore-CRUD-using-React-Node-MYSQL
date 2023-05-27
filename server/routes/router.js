const express = require("express");
const router = new express.Router();
const db = require("../db/conn");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const fs = require("fs")
// image store config in multer

var imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads",)
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})

router.get("/", (req, res) => {
    res.send("Hi")
})


// Get All Books

router.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Add New Book

router.post("/books", upload.single("file"), (req, res) => {
    const q = "INSERT INTO books(title, description, file, price, author) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.file.filename,
        req.body.price,
        req.body.author,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book added successfully")
    })
});


// Get Specific Book

router.get("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * from books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
});

// UpdATE A BOOK

router.put("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET title=? , description=?, price=?, author=? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.author,
    ];
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book Updated successfully")
    })
})

// Delete a Book

router.delete("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * from books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        let file = data[0].file
        console.log(file);
        fs.unlink(`./uploads/${file}`, (err) => {
            if (err) console.log("error in multer")
           return
        })
        const dellQuery = "DELETE from books WHERE id = ?";
        db.query(dellQuery, [bookId], (err, data) => {
            if (err) return res.json(err);
            return res.json("Book Deleted Successfully")
        })
    })
})

module.exports = router