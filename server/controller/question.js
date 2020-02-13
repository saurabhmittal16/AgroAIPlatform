const Farmer = require("../models/farmer");
const Question = require("../models/question");

exports.addQuestion = async (req, res) => {
	const { question } = req.body;
	const { id } = req.decoded;

	try {
		const foundFarmer = await Farmer.findOne({ _id: id });
		if (foundFarmer) {
			try {
				const addedQuestion = await Question.create({
					question: question,
					by: foundFarmer._id
				});

				return {
					message: "Question added"
				};
			} catch (err) {
				console.log(err);
				return res.code(500);
			}
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
