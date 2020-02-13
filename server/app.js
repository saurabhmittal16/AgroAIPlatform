const fastify = require("fastify");
const mongoose = require("mongoose");
const cors = require("cors");
const app = fastify({
	ignoreTrailingSlash: true
});

require("dotenv").config();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB } = process.env;
const mongo_url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DB}?authSource=admin`;

const routes = require("./routes");

app.use(cors());

app.get("/", async (request, res) => {
	return {
		message: "Welcome to AgroAI Platform"
	};
});

// Register routes defined in different modules
routes.forEach(route => app.route(route));

mongoose
	.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to DB");
		app.listen(8080, "0.0.0.0", function(err, address) {
			if (err) {
				console.log(err);
				process.exit(1);
			}
			console.log(`Server listening on ${address}`);
		});
	})
	.catch(err => console.log(err.message));

mongoose.set("useCreateIndex", true);
