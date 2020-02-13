const controller = require("../controller/listing");

const routes = [
	{
		method: "POST",
		url: "/api/listing",
		handler: controller.addNew
	}
];

module.exports = routes;
