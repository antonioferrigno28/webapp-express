const connection = require("../connections/conn.js");
function index(req, res) {
  let sql = "SELECT * FROM `movies`";

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "La query non è andata a buon fine" });
    }
    res.json(results);
  });
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM `movies` WHERE `id` = ?";

  connection.query(sql, [id], (err, moviesResults) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "La query non è andata a buon fine" });
    }
    if (moviesResults.length === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }

    const selectedMovie = moviesResults[0];
    const reviewsQuery = "SELECT * FROM reviews WHERE movie_id = ?";
    connection.query(reviewsQuery, [id], (err, reviewsResults) => {
      if (err) {
        console.error("Errore durante la ricerca delle recensioni", err);
        return res.status(500).send("Errore del server");
      }

      res.json({
        selectedMovie,
        reviews: reviewsResults,
      });
    });
  });
}

function storeReviewByMovieId(req, res) {
  const movieId = req.params.id;
  const { name, text, vote } = req.body;
  const sql = `
  INSERT INTO reviews (name, text, vote, movie_id)
  VALUES (?,?,?,?)
  `;
  connection.query(sql, [name, text, vote, movieId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "ko",
        message: "Database query failed",
      });
    }

    reviews = results;
    res.json({
      status: "ok",
      message: "review added",
    });
  });
}

function getReviewsByMovieId(req, res) {
  const movieId = req.params.id;
  const sql = `
  SELECT id, name, vote, text
  FROM reviews
  WHERE movie_id =?
  ORDER BY created_at ASC
  `;
  connection.query(sql, [movieId], (err, reviews) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "ko",
        message: "Database query failed",
      });
    }
    res.json({
      status: "ok",
      reviews,
    });
  });
}

module.exports = { index, show, storeReviewByMovieId, getReviewsByMovieId };
