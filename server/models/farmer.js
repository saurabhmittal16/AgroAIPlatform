const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const farmerSchema = new mongoose.Schema(
	{
		name: String,
		password: String,
		address: String,
		lattitude: Number,
		longitude: Number,

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

farmerSchema.pre("save", function(next) {
	let user = this;
	if (!user.isModified("password")) {
		return next();
	}
	let hash = bcrypt.hashSync(user.password);
	user.password = hash;
	next();
});

farmerSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model("Farmer", farmerSchema);
