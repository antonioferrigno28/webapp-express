const index = (req, res) => {
  res.send("Elenco di tutti i film");
};

const show = (req, res) => {
  res.send(`Dettagli del film con ID: ${req.params.id}`);
};

export default { index, show };
