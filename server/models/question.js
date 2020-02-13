const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
	{
		question: String,
		by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Farmer"
		}
	},
	{
		versionKey: false
	}
);

module.exports = mongoose.model("Question", questionSchema);
