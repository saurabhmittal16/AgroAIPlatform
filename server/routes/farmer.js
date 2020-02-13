const controller = require("../controller/farmer");

const routes = [
	{
		method: "POST",
		url: "/api/auth/farmer/signup",
		handler: controller.signup
	}
];

module.exports = routes;
