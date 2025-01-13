const express = require("express");

const app = express();
const cors = require("cors");
const { APP_HOST, APP_PORT, APP_FRONTEND_URL } = process.env;
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const port = 3000;
app.use(cors(corsOptions));
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
