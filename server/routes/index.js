const farmer = require("./farmer");
const buyer = require("./buyer");
const listing = require("./listing");
const order = require("./order");
const question = require("./question");

module.exports = [].concat(farmer, buyer, listing, order, question);
