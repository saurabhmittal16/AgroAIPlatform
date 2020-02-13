const controller = require("../controller/order");

const routes = [
	{
		method: "POST",
		url: "/api/order",
		handler: controller.addOrder
	},
	{
		method: "GET",
		url: "/api/order/farmer",
		handler: controller.getOrdersFarmer
	},
	{
		method: "GET",
		url: "/api/order/buyer",
		handler: controller.getOrdersBuyer
	}
];

module.exports = routes;
