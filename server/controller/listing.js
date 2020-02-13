const Listing = require("../models/listing");

exports.addNew = async (req, res) => {
	const { name, price, image } = req.body;
	const { id } = req.decoded;

	try {
		const createdListing = await Listing.create({
			name,
			price,
			image,
			owner: id
		});

		if (createdListing) {
			console.log(createdListing);
			return {
				success: true,
				message: "Added listing"
			};
		} else {
			return res.code(500);
		}
	} catch (err) {
		console.log(err);
		return res.code(500);
	}
};
