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
module.exports = { index, show };
