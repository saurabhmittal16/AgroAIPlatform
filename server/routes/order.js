const controller = require("../controller/order");

const routes = [
	{
		method: "POST",
		url: "/api/order",
		handler: controller.addOrder
	}
];

module.exports = routes;
