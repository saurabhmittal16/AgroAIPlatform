const farmer = require("./farmer");
const buyer = require("./buyer");
const listing = require("./listing");
const order = require("./order");

module.exports = [].concat(farmer, buyer, listing, order);
