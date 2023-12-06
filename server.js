const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const controllers = require("./controllers/products");
const connectDB = require("./db/connect"); 

const app = express();

dotenv.config();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">API</a>`);
});

app.get("/api/v1/products", controllers.getAllTasks);
app.get("/api/v1/products/:id", controllers.getSingleTask);
app.post("/api/v1/products", controllers.createTask);
app.patch("/api/v1/products/:id", controllers.updateTask);
app.delete("/api/v1/products/:id", controllers.deleteTask);

app.use(notFound);
app.use(errorHandler);


connectDB()

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
