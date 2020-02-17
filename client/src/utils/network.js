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

export function signup(name, mobile, password, address, isFarmer, lattitude, longitude) {
	let url = config.server_url;
	url = url + "/api/auth" + (isFarmer === "true" ? "/farmer/signup" : "/buyer/signup");

	const response = axios.post(url, {
		name,
		mobile,
		address,
		password,
		lattitude,
		longitude,
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

export function getBuyerOrders() {
	let url = config.server_url + "/api/order/buyer";

	const response = axios.get(url);
	return response;
}

export function getBuyerFeed() {
	let url = config.server_url + "/api/listing";

	const response = axios.get(url);
	return response;
}

export function getQuestionFeed() {
	let url = config.server_url + "/api/question";

	const response = axios.get(url);
	return response;
}

export function getQuestionAnswers(id) {
	let url = config.server_url + "/api/question/" + id;

	const response = axios.get(url);
	return response;
}

export function addQuestion(question) {
	let url = config.server_url + "/api/question";

	const response = axios.post(url, {
		question: question,
	});

	return response;
}

export function addAnswer(id, answer) {
	let url = config.server_url + "/api/question/" + id + "/answer";

	const response = axios.post(url, {
		answer: answer,
	});

	return response;
}
