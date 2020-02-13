const controller = require("../controller/listing");

const routes = [
	{
		method: "POST",
		url: "/api/listing",
		handler: controller.addNew
	},
	{
		method: "GET",
		url: "/api/listing",
		handler: controller.getListings
	},
	{
		method: "GET",
		url: "/api/listing/:id",
		handler: controller.getSingleListing
	}
];

module.exports = routes;
