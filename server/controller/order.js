const Buyer = require("../models/buyer");
const Listing = require("../models/listing");
const Order = require("../models/order");

exports.addOrder = async (req, res) => {
	const { listingID, quantity } = req.body;
	const { id: buyerID } = req.decoded;

	try {
		const foundBuyer = await Buyer.findOne({ _id: buyerID });

		// if buyer exists
		if (foundBuyer) {
			try {
				const existingListing = await Listing.findOne({ _id: listingID });

				// if listing exists
				if (existingListing && existingListing.quantity >= quantity) {
					try {
						// create order
						const createdOrder = await Order.create({
							listing: listingID,
							buyer: buyerID,
							quantity: quantity
						});

						return res.send({
							success: true,
							message: "Order placed successfully",
							orderID: createdOrder._id
						});
					} catch (err) {
						console.log("Could not create order");
						return res.code(500);
					}
				} else {
					console.log("Invalid listing", existingListing);
					return res.code(500).send({
						message: "Invalid listing"
					});
				}
			} catch (err) {
				console.log(err);
				return res.code(500);
			}
		} else {
			console.log("Invalid buyer credentials");
			return res.code(500).send({
				message: "Invalid buyer credentials"
			});
		}
	} catch (err) {
		console.log(err);
		return res.code(500);
	}
};
