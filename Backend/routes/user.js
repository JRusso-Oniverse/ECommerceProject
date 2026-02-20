var supa = require('@supabase/supabase-js');

var express = require('express');
var router = express.Router();

const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// POST /User => 201
router.post('/', async function (req, res) {
	const newUser = {
		username: req.body.username,
		role: req.body.role
	};
	if (newUser.username === undefined) {
		res
			.status(400)
			.json({ "errorMessage": "Insert your current username" });
		return;
	}
	if (newUser.role === undefined) {
		newUser.role = "user";
	}
	const { data, error } = await supabase
		.from('users')
		.insert(newUser)
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
		.location(`/users/${data[0].id}`)
		.json(data);
	return;
});

// GET /user => User []
router.get('/', async function (_, res) {
	const { data, error } = await supabase
		.from('users')
		.select();
	if (error !== null) res.status(500);
	res.json(data);
});

// GET /user/{id} => Users
router.get('/:id', async function (req, res) {
	const { data, error } = await supabase
		.from('users')
		.select()
		.eq('id', req.params.id);
	if (error !== null) res.status(500);
	if (data.length === 0) res.status(404);
	res.json(data[0]);
});

// PUT /user/{id} => User
router.put('/:id', async function (req, res) {
	const newUser = {
		id: req.params.id,
		username: req.body.username,
	};
	if (newUser.username === undefined) {
		res
			.status(400)
			.json({ "errorMessage": "Insert your current username" });
	}
	const { data, error } = await supabase
		.from('users')
		.update(newUser)
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
		.location(`/users/${data[0].id}`)
		.json(data);
})


// DELETE /user/{id} => User
router.delete('/:id', async function (req, res) {

	await supabase
		.from('users')
		.delete()
		.eq("id", req.params.id);

	res
		.status(204)
		.send();
});

module.exports = router;