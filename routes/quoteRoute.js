const express = require("express");
const router = express.Router();
const { getQuote, postQuote, updateQuote, deleteQuote, getAllQuote } = require("../controller/quoteController");
const { protect } = require("../auth/auth");

router.get("/", protect, getQuote);
router.get("/list", protect, getAllQuote);
router.post("/quote", protect, postQuote);
router.put("/update/:id", protect, updateQuote)
router.delete("/delete/:id", protect, deleteQuote)
module.exports = router;
