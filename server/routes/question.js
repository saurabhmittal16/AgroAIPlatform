const controller = require("../controller/question");

const routes = [
	{
		method: "POST",
		url: "/api/question",
		handler: controller.addQuestion
	},
	{
		method: "GET",
		url: "/api/question/:id",
		handler: controller.getQuestion
	},
	{
		method: "POST",
		url: "/api/question/:id/answer",
		handler: controller.addAnswer
	}
];

module.exports = routes;
