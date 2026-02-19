var supa = require('@supabase/supabase-js');

var express = require('express');
var router = express.Router();

const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


//get * orders
router.get('/', async function (req, res, next) {
	const { data, error } = await supabase;
	if (req.params.role == "admin") {
		const { data, error } = await supabase
			.from('orders')
			.select();

		if (error !== null)
			res.status(500);

		res.json(data);

	} else {
		const { data, error } = await supabase
			.from('orders')
			.select()
			.eq(req.params.id,'id');

		if (error !== null)
			res.status(500);

		res.json(data);
	}
});


//get orders by user/id
router.get('/:id', async function (req, res, next) {

	const { data, error } = await supabase
		.from('users')
		.select()
		.eq('id', req.params.id)
		.join('orders');

	if (error !== null)
		res.status(500);

	if (data.length === 0)
		res.status(404);

	res.json(data);
});


// get order by /order/id
router.get('/:id', async function (req, res, next) {

	const { data, error } = await supabase
		.from('orders')
		.select()
		.eq('id', req.params.id);

	if (error !== null)
		res.status(500);

	if (data.length === 0)
		res.status(404);

	res.json(data[0]);
});




module.exports = router;
