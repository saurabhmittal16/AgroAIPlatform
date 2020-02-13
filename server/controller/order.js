const Buyer = require("../models/buyer");
const Farmer = require("../models/farmer");
const Listing = require("../models/listing");
const Order = require("../models/order");

exports.addOrder = async (req, res) => {
	const { listingID, quantity } = req.body;
	const { id: buyerID } = req.decoded;

	try {
		const foundBuyer = await Buyer.exists({ _id: buyerID });

		// if buyer exists
		if (foundBuyer) {
			const existingListing = await Listing.findById(listingID);

			// if listing exists
			if (!!existingListing && existingListing.quantity >= quantity) {
				const createdOrder = await Order.create({
					listing: listingID,
					buyer: buyerID,
					farmer: existingListing.owner,
					quantity: quantity
				});

				return res.send({
					success: true,
					message: "Order placed successfully",
					orderID: createdOrder._id
				});
			} else {
				console.log("Invalid listing", existingListing);
				return res.code(500).send({
					message: "Invalid listing"
				});
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

exports.getOrdersFarmer = async (req, res) => {
	const { id } = req.decoded;

	try {
		const foundFarmer = await Farmer.exists({ _id: id });
		if (foundFarmer) {
			const orders = await Order.find({ farmer: id }, { farmer: 0, updatedAt: 0 })
				.populate("buyer", {
					name: 1,
					address: 1,
					mobile: 1
				})
				.populate("listing", { owner: 0 });
			return orders;
		} else {
			console.log("Invalid farmer credentials");
			return res.code(500).send({
				message: "Invalid farmer credentials"
			});
		}
	} catch (err) {
		console.log(err);
		return res.code(500);
	}
};

exports.getOrdersBuyer = async (req, res) => {
	const { id } = req.decoded;
	console.log(id);

	try {
		const foundBuyer = await Buyer.exists({ _id: id });
		if (foundBuyer) {
			const orders = await Order.find({ buyer: id }, { buyer: 0, updatedAt: 0 })
				.populate("farmer", {
					name: 1,
					address: 1,
					mobile: 1
				})
				.populate("listing", { owner: 0 });
			return orders;
		} else {
			console.log("Invalid farmer credentials");
			return res.code(500).send({
				message: "Invalid farmer credentials"
			});
		}
	} catch (err) {
		console.log(err);
		return res.code(500);
	}
};
