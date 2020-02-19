import React, { useState } from "react";
import {
	Button,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormControl,
	CircularProgress,
	Backdrop,
	Typography,
	Snackbar,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { uploadImage, addListing } from "../../utils/network";
import Dropzone from "react-dropzone";
import config from "../../config";

// Util function to round number to 1 decimal place
const round = arg => Math.round(arg * 10) / 10;

const AddCrop = props => {
	const [t] = useTranslation();
	const [name, setName] = useState("");
	const [quantity, setquantity] = useState(0);
	const [price, setPrice] = useState(0);
	const [showPrice, setShowPrice] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const [metadata, setMetadata] = useState(null);
	const [error, setError] = useState(null);

	async function handleUpload(file) {
		try {
			setShowLoader(true);
			const response = await uploadImage(file);
			setMetadata(response.data);
			setPrice(round(response.data.price));
			setShowPrice(true);
		} catch (err) {
			console.log(err);
		} finally {
			setShowLoader(false);
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await addListing(name, quantity, price, metadata.quality, metadata.url);
			console.log(response.data.message);
			props.history.push("/farmer");
		} catch (err) {
			console.log("Error", err.response.data.message);
			setError(err.response.data.message);
		}
	}

	return (
		<div>
			<h1>{t("new.title")}</h1>

			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<Typography style={{ marginBottom: "10px" }}>1) {t("new.1")}</Typography>
				<FormControl fullWidth variant="outlined" style={{ marginBottom: "25px" }}>
					<InputLabel htmlFor="outlined-text">Name</InputLabel>
					<OutlinedInput
						id="outlined-text"
						value={name}
						onChange={e => setName(e.target.value)}
						labelWidth={60}
					/>
				</FormControl>

				<Typography style={{ marginBottom: "10px" }}>2) {t("new.2")}</Typography>
				<FormControl fullWidth variant="outlined" style={{ marginBottom: "25px" }}>
					<InputLabel htmlFor="outlined-text">Quantity</InputLabel>
					<OutlinedInput
						id="outlined-text"
						type="number"
						value={quantity}
						onChange={e => setquantity(e.target.value)}
						endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
						labelWidth={60}
					/>
				</FormControl>

				<Typography style={{ marginBottom: "5px" }}>3) {t("new.3")}</Typography>
				<Dropzone accept="image/*" noDrag={false} multiple={false} onDrop={files => handleUpload(files[0])}>
					{({ getRootProps, getInputProps }) => (
						<section style={{ marginBottom: "15px" }}>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<Button
									fullWidth
									variant="contained"
									color="primary"
									component="span"
									disabled={showLoader}
								>
									Upload
								</Button>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginTop: "10px",
									marginBottom: "10px",
								}}
							>
								<Backdrop open={showLoader} style={{ zIndex: 10000 }}>
									<CircularProgress />
								</Backdrop>
							</div>
							{showPrice && (
								<img
									src={config.model_url + metadata.url}
									style={{ width: "100%" }}
									alt="Uploaded crop"
								/>
							)}
						</section>
					)}
				</Dropzone>

				{showPrice && (
					<>
						<Typography style={{ marginBottom: "10px" }}>4) {t("new.4")}</Typography>
						<FormControl fullWidth variant="outlined" style={{ marginBottom: "20px" }}>
							<InputLabel htmlFor="outlined-text">Price</InputLabel>
							<OutlinedInput
								id="outlined-text"
								type="number"
								value={price}
								onChange={e => setPrice(e.target.value)}
								startAdornment={<InputAdornment position="start">₹</InputAdornment>}
								labelWidth={60}
							/>
						</FormControl>
					</>
				)}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					disabled={!showPrice || name === "" || quantity === 0 || price === 0}
				>
					Submit
				</Button>
			</form>
			<Snackbar open={!!error} onClose={() => setError(null)} autoHideDuration={2000} message={error} />
		</div>
	);
};

export default AddCrop;
