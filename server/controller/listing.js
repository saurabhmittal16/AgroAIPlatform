const Listing = require("../models/listing");
const Farmer = require("../models/farmer");
const Buyer = require("../models/buyer");

const improveListing = obj => {
	let ownerData = obj["owner"];
	delete obj["owner"];
	return {
		id: obj._id,
		name: obj.name,
		price: obj.price,
		image: obj.image,
		quantity: obj.quantity,
		farmerID: ownerData._id,
		farmerName: ownerData.name,
		farmerAddress: ownerData.address
	};
};

exports.addNew = async (req, res) => {
	const { name, price, image, quantity, quality } = req.body;
	const { id } = req.decoded;

	try {
		const foundFarmer = await Farmer.exists({ _id: id });

		if (foundFarmer) {
			const createdListing = await Listing.create({
				name,
				price,
				image,
				quantity,
				quality,
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
		const foundBuyer = await Buyer.exists({ _id: id });

		if (foundBuyer) {
			// get owner data from listing - name, id and address
			const listings = await Listing.find({}).populate("owner", { _id: 1, name: 1, address: 1 });

			return listings.map(item => improveListing(item));
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

exports.getFarmerListings = async (req, res) => {
	const { id } = req.decoded;

	try {
		const foundFarmer = await Farmer.exists({ _id: id });

		if (foundFarmer) {
			// get all listings added by that farmer
			const listings = await Listing.find({ owner: id }, { owner: 0 });
			return listings;
		} else {
			console.log("Invalid farmer credentials");
			return res.code(500).send({
				message: "Invalid farmer credentials"
			});
		}
	} catch (err) {
		console.log("Cound not find farmer", err);
		return res.code(500);
	}
};

exports.getSingleListing = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.code(404);
	} else {
		try {
			const foundListing = await Listing.findById(id).populate("owner", { _id: 1, name: 1, address: 1 });
			return improveListing(foundListing);
		} catch (err) {
			console.log("Could not find listing", err);
			return res.code(500);
		}
	}
};
