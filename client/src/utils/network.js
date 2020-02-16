import axios from "axios";
import config from "../config";

export function login(mobile, password, isFarmer) {
	let url = config.server_url;
	url = url + "/api/auth" + (isFarmer === "true" ? "/farmer/login" : "/buyer/login");

	const response = axios.post(url, {
		mobile: mobile,
		password: password,
	});

	return response;
}

export function uploadImage(file) {
	let url = config.model_url;
	url = url + "/";

	let formData = new FormData();
	formData.append("file", file);

	return axios.post(url, formData);
}

export function addListing(name, quantity, price, quality, image) {
	let url = config.server_url;
	url = url + "/api/listing";

	const response = axios.post(url, {
		name,
		price,
		image,
		quantity,
		quality,
	});

	return response;
}

export function getFarmerListings() {
	let url = config.server_url + "/api/listing/farmer";

	const response = axios.get(url);
	return response;
}

export function getFarmerOrders() {
	let url = config.server_url + "/api/order/farmer";

	const response = axios.get(url);
	return response;
}
