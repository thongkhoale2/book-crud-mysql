//type: module
import express from 'express'; 
import mysql from 'mysql2'; //mysql2 for version 8.0 authentication
import cors from 'cors'

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "test"
});

app.use(express.json()); // test postman using json
app.use(cors()); // Allow client port to use backend, can specify allowed port

// If auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Lamadev123'

app.get("/", (req, res) => {
    res.json("Home back")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)";
    console.log(req.body);
    const values =[req.body.title, req.body.desc, req.body.cover, req.body.price];
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been created successfully.");
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?;";
    const values =[req.body.title, req.body.desc, req.body.cover, req.body.price, bookId];
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been updated successfully.");
    })
})

app.delete("/books/:id", (req, res) => {
    const q = 'DELETE FROM books WHERE id = ?';
    const bookId = req.params.id;
    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully.")
    });
})

app.listen(8800, () => {
    console.log("Connect to backend at port 8800!");
})