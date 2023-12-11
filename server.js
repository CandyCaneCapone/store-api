const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const connectDB = require("./db/connect"); 
const productRouter = require("./routes/products")

const app = express();

dotenv.config();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">API</a>`);
});

app.use("/api/v1/products" , productRouter)

app.use(notFound);
app.use(errorHandler);


connectDB()

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
