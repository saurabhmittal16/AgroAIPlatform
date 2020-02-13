const fastify = require("fastify");
const mongoose = require("mongoose");
const cors = require("cors");
const app = fastify({
	ignoreTrailingSlash: true
});

const mongo_url = "mongodb://localhost:27017/agroai";

app.use(cors());

app.get("/", async (request, res) => {
	return {
		message: "Welcome to AgroAI Platform"
	};
});

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
