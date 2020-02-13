const controller = require("../controller/question");

const routes = [
	{
		method: "POST",
		url: "/api/question",
		handler: controller.addQuestion
	}
];

module.exports = routes;
