const axios = require("axios");
const pool = require("../db");

// Get quote from apidsa
const getQuote = async (req, res) => {
  try {
    const response = await axios.get("https://api.kanye.rest/");

    const checkQuote = await pool.query(
      "SELECT * FROM quotes WHERE quote = $1",
      [response.data.quote]
    );

    if (checkQuote.rows.length == 0) {
      pool.query(
        "INSERT INTO quotes (quote) VALUES ($1) RETURNING *",
        [response.data.quote],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).json({
            id: req.user.rows[0].id,
            email: req.user.rows[0].email,
            quote: response.data.quote,
          });
          return;
        }
      );
    } else {
      return res.status(400).json({ message: "Quote sudah ada" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Get All Quotes
const getAllQuote = async (req, res) => {
  const getAllQuotes = await pool.query("SELECT * FROM quotes");
  let quote = getAllQuotes.rows.map((x) => x.quote);
  let favorite = getAllQuotes.rows.map((x) => x.favorite);

  res.status(200).send({
    quote: quote,
    favorite: favorite,
  });
};

// Insert Quote ke table
const postQuote = async (req, res) => {
  const { quote, favorite } = req.body;

  if (!quote || !favorite) {
    res.send({ status: 400, message: "Data harus diisi" });
    return;
  }

  pool.query(
    "INSERT INTO quotes (quote, favorite) VALUES ($1, $2)",
    [quote, favorite],
    (error, result) => {
      if (error) throw error;
      res.status(200).json({
        quote: quote,
        favorite: favorite,
      });
    }
  );
};

// Update quote
const updateQuote = async (req, res) => {
  const quoteId = req.params.id;

  const checkId = await pool.query("SELECT * FROM quotes WHERE id = $1", [
    quoteId,
  ]);

  if (checkId.rows.length == 0) {
    res.status(400).json({ message: "Id tidak ditemukan" });
    return;
  }

  const favorite = req.body.favorite;
  if (!favorite) {
    res.send({
      message: "Data tidak boleh kosong",
    });
    return;
  }

  pool.query(
    "UPDATE quotes SET favorite = $1 WHERE id = $2",
    [favorite, quoteId],
    (error, result) => {
      if (error) throw error;
      res.status(200).json({
        id: quoteId,
        quote: checkId.rows[0].quote,
        favorite: favorite,
      });
    }
  );
};

// Delete quote
const deleteQuote = async (req, res) => {
  const quoteId = req.params.id;

  const checkId = await pool.query("SELECT * FROM quotes WHERE id = $1", [
    quoteId,
  ]);

  if (checkId.rows.length == 0) {
    res.status(400).json({ message: "Id tidak ditemukan" });
    return;
  }

  pool.query("DELETE FROM quotes WHERE id = $1", [quoteId], (error, result) => {
    if (error) throw error;
    res.status(200).json({
      id: quoteId,
      message: "Berhasil dihapus",
    });
  });
};

module.exports = { getQuote, postQuote, updateQuote, deleteQuote, getAllQuote };
