var supa = require('@supabase/supabase-js');

var express = require('express');
var router = express.Router();

const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// POST /product => 201
router.post('/', async function (req, res) {
	const newProduct = {
		name: req.body.name,
		price: req.body.price
	};
	if (newProduct.name === undefined) {
		res
			.status(400)
			.json({"errorMessage": "Missing product name"});
	}
	if (newProduct.price === undefined) {
		res
			.status(400)
			.json({"errorMessage": "Missing product price"});
	}
	const { data, error } = await supabase
		.from('products')
		.insert(newProduct)
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
	}
	res
		.status(201)
		.location(`/product/${data[0].id}`)
		.json(data);
});

// GET /product => Product[]
router.get('/', async function (_, res) {
	const { data, error } = await supabase
		.from('products')
		.select();
	if (error !== null) res.status(500);
	res.json(data);
});

// GET /product/{id} => Product
router.get('/:id', async function (req, res) {
	const { data, error } = await supabase
		.from('products')
		.select()
		.eq('id', req.params.id);
	if (error !== null) res.status(500);
	if (data.length === 0) res.status(404);
	res.json(data[0]);
});

// PUT /product/{id} => Product
router.put('/:id', async function (req, res) {
	const newProduct = {
		id: req.params.id,
		name: req.body.name,
		price: req.body.price
	};
	if (newProduct.name === undefined) {
		res
			.status(400)
			.json({"errorMessage": "Missing product name"});
	}
	if (newProduct.price === undefined) {
		res
			.status(400)
			.json({"errorMessage": "Missing product price"});
	}
	const { data, error } = await supabase
		.from('products')
		.update(newProduct)
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
			);
	}
	console.log("AAAAAAAAA", data);
	res
		.status(200)
		.location(`/product/${data[0].id}`)
		.json(data);
})


module.exports = router;
