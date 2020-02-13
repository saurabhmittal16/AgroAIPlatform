const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
	{
		answer: String,
		question: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Question"
		},
		by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Farmer"
		}
	},
	{
		versionKey: false
	}
);

module.exports = mongoose.model("Answer", answerSchema);
