const express = require("express");

const app = express();
const port = 3000;
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware.js");
app.use(express.json());
app.use(express.static("public"));

const moviesRouter = require("./routers/moviesRouter");

app.use("/api/movies", moviesRouter);

app.get("/", (req, res) => {
  res.send("Home della lista film");
});

app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
