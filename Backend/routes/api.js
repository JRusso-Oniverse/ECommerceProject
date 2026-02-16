var express = require('express');
var router = express.Router();

/* GET pokemons listing. */
router.get('/', function (req, res, next) {
	res.json(
		{ "Risposta": "Domanda" }
	);
});

module.exports = router;
