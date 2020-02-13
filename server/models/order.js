const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		// listing ID
		listing: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Listing"
		},

		// buyer ID
		buyer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Buyer"
		},

		// farmer ID: storing redundant data to optimize order searching
		farmer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Farmer"
		},

		// quantity of crop ordered
		quantity: Number
	},
	{
		versionKey: false,
		timestamps: true
	}
);

module.exports = mongoose.model("Order", orderSchema);
