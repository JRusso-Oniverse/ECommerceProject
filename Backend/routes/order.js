var supa = require('@supabase/supabase-js');

var express = require('express');
var router = express.Router();

const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);




//get * orders
// router.get('/', async function (req, res, next) {
// 	const { data, error } = await supabase;
// 	if (req.params.role == "admin") {
// 		const { data, error } = await supabase
// 			.from('orders')
// 			.select();

// 		if (error !== null)
// 			res.status(500);

// 		res.send(data);

// 	} else {
// 		const { data, error } = await supabase
// 			.from('orders')
// 			.select()
// 			.eq(req.params.id, 'id');

// 		if (error !== null)
// 			res.status(500);

// 		res.send(data);
// 	}
// });


router.get('/', async function (req, res) {
	const { data, error } = await supabase
		.from('orders')
		.select();
	if (error !== null) res.status(500);
	res.json(data);
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

	res.send(data);
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

	res.send(data[0]);
});



//ORDERS objs: id(PK), user_id(FK), product_id(FK), count



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

//delete order
router.delete('/', async function (req, res, next) {

	const del_order = await Order.findOne({
		id: req.params.id
	});

	if (del_order) {
		const deleted_order = await del_order.remove();
		res.send(deleted_order);
	} else {
		res.status(404).send("order not found.")
	}

});


module.exports = router;
