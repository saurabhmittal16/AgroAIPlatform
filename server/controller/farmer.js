const jwt = require("jsonwebtoken");
const config = require("../config");

const Farmer = require("../models/farmer");

exports.signup = async (req, res) => {
	const { password, name, mobile, address, lattitude, longitude } = req.body;

	const existingFarmer = await Farmer.exists({ mobile: mobile });
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
			address,
			lattitude,
			longitude
		});

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

exports.login = async (req, res) => {
	const { mobile, password } = req.body;

	try {
		const foundFarmer = await Farmer.findOne({ mobile: mobile });
		if (foundFarmer) {
			const isValid = foundFarmer.comparePassword(password);

			if (!!isValid) {
				const token = jwt.sign(
					{
						mobile: foundFarmer.mobile,
						id: foundFarmer._id
					},
					config.secret,
					{
						expiresIn: 60 * 60 * 24 * 7
					}
				);

				return {
					success: true,
					message: "Login successful",
					token: token
				};
			}
			return {
				sucess: false,
				message: "Invalid password"
			};
		} else {
			return {
				sucess: false,
				message: "No such farmer exists"
			};
		}
	} catch (err) {
		console.log(err);
		return res.code(500);
	}
};
