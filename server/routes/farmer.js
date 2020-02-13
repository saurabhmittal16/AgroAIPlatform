const controller = require("../controller/farmer");

const routes = [
	{
		method: "POST",
		url: "/api/auth/farmer/signup",
		handler: controller.signup
	},
	{
		method: "POST",
		url: "/api/auth/farmer/login",
		handler: controller.login
	}
];

module.exports = routes;
