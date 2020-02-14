const jwt = require("jsonwebtoken");
const config = require("../config");

const Buyer = require("../models/buyer");

exports.signup = async (req, res) => {
	const { password, name, mobile, address, lattitude, longitude } = req.body;

	const existingBuyer = await Buyer.exists({ mobile: mobile });
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
			address,
			lattitude,
			longitude
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

exports.login = async (req, res) => {
	const { mobile, password } = req.body;

	try {
		const foundBuyer = await Buyer.findOne({ mobile: mobile });
		if (foundBuyer) {
			const isValid = foundBuyer.comparePassword(password);

			if (isValid) {
				const token = jwt.sign(
					{
						mobile: foundBuyer.mobile,
						id: foundBuyer._id
					},
					config.secret,
					{
						expiresIn: 60 * 60 * 24 * 7
					}
				);

				return {
					message: "Login successful",
					token: token
				};
			}
			return res.code(400).send({
				message: "Invalid password"
			});
		} else {
			return res.code(404).send({
				message: "No such buyer exists"
			});
		}
	} catch (err) {
		console.log(err);
		return res.code(500);
	}
};
