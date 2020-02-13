const controller = require("../controller/buyer");

const routes = [
	{
		method: "POST",
		url: "/api/auth/buyer/signup",
		handler: controller.signup
	},
	{
		method: "POST",
		url: "/api/auth/buyer/login",
		handler: controller.login
	}
];

module.exports = routes;
