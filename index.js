const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

//Middleware
app.use(express.json());
app.use(cors());

// MySQL-тэй холбогдох тохиргоо
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Temvjin0606$",
  database: "backEndB",
});

// MySQL-тэй холбогдож байгаа эсэхийг шалгах
db.connect((err) => {
  if (err) {
    console.error("MySQL холбогдсонгүй:", err);
  } else {
    console.log("MySQL-тэй амжилттай холбогдлоо!");
  }
});

app.get("/", (request, response) => {
  response.send("Server ajillaj bn !!!");
});

app.get("/users", (request, response) => {
  db.query("select * from users", (err, results) => {
    if (err) {
      response.status(500).json({ error: err.message });
    } else {
      response.json(results);
    }
  });
});

app.post("/createUsers", (req, res) => {
  const { first_name, last_name, age, email } = req.body;

  if (!first_name || !last_name || !age || !email) {
    return res.status(400).json({ error: "Мэдээлэл дутуу байна." });
  }

  console.log("iishe orjin");

  db.query(
    "insert into users (first_name, last_name, age, email, created_at) values (?, ?, ?, ?, current_timestamp())",
    [first_name, last_name, age, email],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    }
  );
});

// Сервер эхлүүлэх
app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} дээр ажиллаж байна`);
});
