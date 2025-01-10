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

const show = (req, res) => {
  res.send(`Dettagli del film con ID: ${req.params.id}`);
};
module.exports = { index, show };
