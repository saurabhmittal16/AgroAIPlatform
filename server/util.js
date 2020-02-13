// rounds the arg to first decimal place
const round = arg => Math.round(arg * 10) / 10;

// get distance between two geolocation points in kilometre
exports.distance = (lat1, long1, lat2, long2) => {
	const radlat1 = (Math.PI * lat1) / 180;
	const radlat2 = (Math.PI * lat2) / 180;
	const theta = long1 - long2;
	const radtheta = (Math.PI * theta) / 180;
	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = (dist * 180) / Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344;

	// return distance round to first decimal place
	return round(dist);
};
