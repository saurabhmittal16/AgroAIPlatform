const jwt = require("jsonwebtoken");

const Farmer = require("../models/farmer");

exports.signup = async (req, res) => {
	const { password, name, mobile, address } = req.body;

	const existingFarmer = await Farmer.findOne({ mobile: mobile });
	if (existingFarmer) {
		return {
			sucess: false,
			message: "Number already registered"
		};
	}

	try {
		const createdFarmer = await Farmer.create({
			password,
			name,
			mobile,
			address
		});

		// console.log(createdFarmer);

		// const token = jwt.sign({
		//     id: createdAdmin._id,
		//     email: createdAdmin.email
		// }, config.secret, {
		//     expiresIn: 60 * 60 * 24 * 7
		// });

		return {
			message: "Account created",
			success: true
			// "token": token
		};
	} catch (err) {
		console.log(err);
		return res.code(500);
	}
};
