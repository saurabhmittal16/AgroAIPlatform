const Farmer = require("../models/farmer");
const Question = require("../models/question");
const Answer = require("../models/answer");

exports.addQuestion = async (req, res) => {
	const { question } = req.body;
	const { id } = req.decoded;

	try {
		const foundFarmer = await Farmer.exists({ _id: id });
		if (foundFarmer) {
			const addedQuestion = await Question.create({
				question: question,
				by: id
			});

			return {
				message: "Question added"
			};
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

exports.getQuestion = async (req, res) => {
	const { id: questionID } = req.params;
	const { id } = req.decoded;

	try {
		const foundFarmer = await Farmer.exists({ _id: id });
		if (foundFarmer) {
			const foundQuestion = await Question.findById(questionID).populate("by", { name: 1, mobile: 1 });
			const answers = await Answer.find({ question: questionID }, { question: 0 }).populate("by", {
				name: 1,
				mobile: 1
			});
			return {
				question: foundQuestion,
				answers: answers
			};
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

exports.addAnswer = async (req, res) => {
	const { id: questionID } = req.params;
	const { answer } = req.body;
	const { id } = req.decoded;

	try {
		const foundFarmer = await Farmer.exists({ _id: id });
		if (foundFarmer) {
			const foundAnswer = await Answer.create({
				answer: answer,
				question: questionID,
				by: id
			});
			return {
				message: "Answer added"
			};
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
