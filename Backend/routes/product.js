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
		return;
	}
	if (newProduct.price === undefined) {
		res
			.status(400)
			.json({"errorMessage": "Missing product price"});
		return;
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
		return;
	}
	res
		.status(201)
		.location(`/product/${data[0].id}`)
		.json(data);
	return;
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
	res
		.status(200)
		.location(`/product/${data[0].id}`)
		.json(data);
})

// PATCH /product/{id} => 
router.patch('/:id', async function (req, res) {
	const diffs = {	};
	if (req.body.name !== undefined) diffs["name"] = req.body.name;
	if (req.body.price !== undefined) diffs["price"] = req.body.price;
	const { data, error } = await supabase
		.from('products')
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
			);
	}
	res
		.status(200)
		.location(`/product/${data[0].id}`)
		.json(data);
})

// DELETE /product/{id} =>
router.delete('/:id', async function (req, res) {
	await supabase
		.from('products')
		.delete()
		.eq("id", req.params.id)
		.select();
	res
		.status(204)
		.send();
})

module.exports = router;
