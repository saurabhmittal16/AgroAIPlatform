const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
	// name of crop
	name: String,

	// price of crop per kg
	price: Number,

	// url of uploaded image - relative URL of Flask server
	image: String,

	// listing added by farmer
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Farmer"
	}
});

module.exports = mongoose.model("Listing", listingSchema);
