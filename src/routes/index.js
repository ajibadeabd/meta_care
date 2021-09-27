const router = require("express").Router();

router.use("/movie", require("./film.js"));

module.exports = router