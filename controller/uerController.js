const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Data harus diisi" });
      return;
    }

    const checkEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkEmail.rows.length == 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(201).json({
            id: results.rows[0].id,
            email: results.rows[0].email,
            token: generateToken(results.rows[0].id),
          });
        }
      );
    } else {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Data harus diisi" });
      return;
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length == 0) {
      res.send({
        status: 400,
        message: "email belum terdaftar",
      });
      return;
    }

    if (await bcrypt.compare(password, user.rows[0].password)) {
      res.json({
        id: user.rows[0].id,
        email: user.rows[0].email,
        token: generateToken(user.rows[0].id),
      });
    } else {
      res.status(400).json({ message: "password salah" });
      return;
    }

  } catch (error) {
    console.error(error.message);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { register, login };
