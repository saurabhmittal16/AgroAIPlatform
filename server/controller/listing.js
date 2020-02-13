const Listing = require("../models/listing");

exports.addNew = async (req, res) => {
	const { name, price, image } = req.body;
	const { mobile, id } = req.decoded;

	console.log(name, price, image);
	console.log(mobile, id);

	return "OK";
};
