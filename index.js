const express = require("express")
const port = 1010
const app = express()
const dotenv = require("dotenv").config();

app.use(express.json())

app.use("/api/quotes", require("./routes/quoteRoute"))
app.use("/api/users", require("./routes/userRoute"))

app.listen(port, () => console.log(`server started on port ${port}`))