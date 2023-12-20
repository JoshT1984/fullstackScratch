import express from "express";
const app = express();
const expressPort = 8000;

import pg from "pg";
const { Pool } = pg;
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: databaseURL,
});

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/cards", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM deck`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(404).send("No pets found");
  }
});

app.get("/cards/images", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM picture`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(404).send("No pets found");
  }
});

// app.post("/cards", async (req, res) => {
//   const background_color = "null";
//   const { card_number } = req.body;
//   console.log(card_number);
//   try {
//     const { rows } = await pool.query(
//       `INSERT INTO deck (background_color, card_number) VALUES ($1, $2)`,
//       [background_color, card_number]
//     );
//     const newNumberQuery = await pool.query(
//       `SELECT * FROM deck ORDER BY id DESC LIMIT 1`
//     );
//     const newNumber = newNumberQuery.rows[0];
//     res.status(201).send(newNumber);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.listen(expressPort, () => {
  console.log(`Listening on port ${expressPort}`);
});
