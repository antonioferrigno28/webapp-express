import express from "express";

const app = express();
const port = 3000;
import errorMiddleware from "./middlewares/errorMiddleware.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";

app.use(express.json());
app.use(express.static("public"));

import { router as moviesRouter } from "./routers/moviesRouter.js";

app.use("/api/movies", moviesRouter);

app.get("/", (req, res) => {
  res.send("Home della lista film");
});

app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
