import axios from "axios";
import config from "../config";

export async function login(mobile, password, isFarmer) {
	let url = config.server_url;
	url = url + "/api/auth" + (isFarmer === "true" ? "/farmer/login" : "/buyer/login");

	const response = await axios.post(url, {
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
