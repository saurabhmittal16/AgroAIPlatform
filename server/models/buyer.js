const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const buyerSchema = new mongoose.Schema(
	{
		name: String,
		password: String,
		address: String,

		// primary key
		mobile: {
			type: String,
			unique: true
		}
	},
	{
		versionKey: false
	}
);

buyerSchema.pre("save", function(next) {
	let user = this;
	if (!user.isModified("password")) {
		return next();
	}
	let hash = bcrypt.hashSync(user.password);
	user.password = hash;
	next();
});

buyerSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model("Buyer", buyerSchema);
