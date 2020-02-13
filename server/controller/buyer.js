const jwt = require("jsonwebtoken");

const Buyer = require("../models/buyer");

exports.signup = async (req, res) => {
	const { password, name, mobile, address } = req.body;

	const existingBuyer = await Buyer.findOne({ mobile: mobile });
	if (existingBuyer) {
		return {
			sucess: false,
			message: "Number already registered"
		};
	}

	try {
		const createdBuyer = await Buyer.create({
			password,
			name,
			mobile,
			address
		});

		return {
			message: "Account created",
			success: true
		};
	} catch (err) {
		console.log(err);
		return res.code(500);
	}
};
