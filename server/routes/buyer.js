const controller = require("../controller/buyer");

const routes = [
	{
		method: "POST",
		url: "/api/auth/buyer/signup",
		handler: controller.signup
	}
];

module.exports = routes;
