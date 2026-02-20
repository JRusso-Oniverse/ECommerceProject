var supa = require('@supabase/supabase-js');

var express = require('express');
var router = express.Router();

const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

//ORDERS entity: id(PK), user_id(FK), product_id(FK), count


//get all orders
router.get('/', async function (req, res) {
	const { data, error } = await supabase
		.from('orders')
		.select();
	if (error !== null) res.status(500);
	res.json(data);
});


//get orders by user id
router.get('/:id', async function (req, res, next) {

	const { data, error } = await supabase
		.from('orders')
		.select()
		.eq('id', req.params.user_id);

	if (error !== null)
		res.status(500);

	if (data.length === 0)
		res.status(404);

	res.json(data);
});




//create new order
router.post('/', async function (req, res) {
	const newOrder = {
		user_id: req.body.user_id,
		product_id: req.body.product_id,
		count: req.body.count
	};

	if (newOrder.user_id === undefined) {
		res
			.status(400)
			.json({ "errorMessage": "Missing user id" });
		return;
	}

	if (newOrder.product_id === undefined) {
		res
			.status(400)
			.json({ "errorMessage": "Missing product id" });
		return;
	}
	if (newOrder.count === undefined) {
		res
			.status(400)
			.json({ "errorMessage": "Missing products count" });
		return;
	}
	const { data, error } = await supabase
		.from('orders')
		.insert(newOrder)
		.select();
	if (error !== null) {
		res
			.status(500)
			.json(
				{
					"errorMessage": "Server error",
					"details": error.details
				}
			);
		return;
	}
	res
		.status(201)
		.location(`/order/${data[0].id}`)
		.json(data);
	return;
});



//put orders
router.put('/:id', async function (req, res) {
	const newOrder = {
		id: req.params.id,
		user_id: req.body.user_id,
		product_id: req.body.product_id,
		count: req.body.count
	};
	if (newOrder.product_id === undefined) {
		res
			.status(400)
			.json({ "errorMessage": "no product" });
	}

	const { data, error } = await supabase
		.from('orders')
		.update(newOrder)
		.eq("id", req.params.id)
		.select();
	if (error !== null) {
		res
			.status(500)
			.json(
				{
					"errorMessage": "Server error",
					"details": error.details
				}
			)
		return;
	}
	res
		.status(200)
		.location(`/order/${data[0].id}`)
		.json(data);
});



//patch orders
router.patch('/:id', async function (req, res) {
	const diffs = {};
	if (req.body.product_id !== undefined) diffs["product_id"] = req.body.product_id;
	const { data, error } = await supabase
		.from('orders')
		.update(diffs)
		.eq("id", req.params.id)
		.select();
	if (error !== null) {
		res
			.status(500)
			.json(
				{
					"errorMessage": "Server error",
					"details": error.details
				}
			)
		return;
	}
	res
		.status(200)
		.location(`/order/${data[0].id}`)
		.json(data);
});




module.exports = router;
