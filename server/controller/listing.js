const Listing = require("../models/listing");
const Farmer = require("../models/farmer");
const Buyer = require("../models/buyer");

exports.addNew = async (req, res) => {
	const { name, price, image, quantity } = req.body;
	const { id } = req.decoded;

	try {
		const foundFarmer = await Farmer.findOne({ _id: id });

		if (foundFarmer) {
			try {
				const createdListing = await Listing.create({
					name,
					price,
					image,
					quantity,
					owner: id
				});

				if (createdListing) {
					// console.log(createdListing);
					return {
						success: true,
						message: "Added listing"
					};
				} else {
					return res.code(500);
				}
			} catch (err) {
				console.log("Could not create listing", err);
				return res.code(500).send({
					message: "Could not create listing"
				});
			}
		} else {
			console.log("Invalid farmer credentials");
			return res.code(500).send({
				message: "Invalid farmer credentials"
			});
		}
	} catch (err) {
		console.log("Could not find farmer", err);
		return res.send(500);
	}
};

exports.getListings = async (req, res) => {
	const { id } = req.decoded;

	try {
		const foundBuyer = await Buyer.findOne({ _id: id });

		if (foundBuyer) {
			try {
				// get owner data from listing - name, id and address
				const listings = await Listing.find({}).populate("owner", { _id: 1, name: 1, address: 1 });
				return listings;
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
		console.log("Cound not find buyer", err);
		return res.code(500);
	}
};
