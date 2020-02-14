const fastify = require("fastify");
const mongoose = require("mongoose");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const config = require("./config");

// initialise fastify app
const app = fastify({
	ignoreTrailingSlash: true
});

// load .env file to environment variables
require("dotenv").config();

// get Mongo constants from environment variables
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB, MONGO_HOST, MONGO_PORT } = process.env;
const mongo_url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// import routes defined in various modules
const routes = require("./routes");

// register plugin to get data about request
app.register(require("fastify-url-data"), err => {});

// use CORS
app.use(cors());

// add hook that checks for token before every request
app.addHook("preHandler", (request, reply, next) => {
	const urlData = request.urlData();
	if (
		urlData.path === "/" ||
		urlData.path === "/api/auth/buyer/signup" ||
		urlData.path === "/api/auth/buyer/login" ||
		urlData.path === "/api/auth/farmer/login" ||
		urlData.path === "/api/auth/farmer/signup"
	) {
		// No checking for token if authentication routes
		next();
	} else {
		// token is in 'authorization' header in format: Bearer <token>
		let token = request.headers["authorization"];
		if (token) {
			token = token.split(" ")[1];
			jsonwebtoken.verify(token, config.secret, (err, decoded) => {
				if (err) {
					console.log("Verification failed");
					// console.log(err);
					reply.code(401);
					next(new Error("Token expired"));
				} else {
					request.decoded = decoded;
					next();
				}
			});
		} else {
			reply.code(401);
			next(new Error("Authentication failed"));
		}
	}
});

// welcome route for API
app.get("/", async (request, res) => {
	return {
		message: "Welcome to AgroAI Platform"
	};
});

// register routes defined in different modules
routes.forEach(route => app.route(route));

// connect to mongodb and serve fastify app
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
