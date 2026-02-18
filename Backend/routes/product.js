var supa = require('@supabase/supabase-js');

var express = require('express');
var router = express.Router();

const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


// GET /product => Product[]
router.get('/', async function (req, res, next) {
	const { data, error } = await supabase
		.from('products')
		.select();
	if (error !== null) res.status(500);
	res.json(data);
});

// GET /product/{id} => Product
router.get('/:id', async function (req, res, next) {
	const { data, error } = await supabase
		.from('products')
		.select()
		.eq('id', req.params.id);
	if (error !== null) res.status(500);
	if (data.length === 0) res.status(404);
	res.json(data[0]);
});

module.exports = router;
