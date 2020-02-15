import React, { useState } from "react";
import {
	Button,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormControl,
	CircularProgress,
	Typography,
} from "@material-ui/core";
import { uploadImage } from "../../utils/network";
import Dropzone from "react-dropzone";

// Util function to round number to 1 decimal place
const round = arg => Math.round(arg * 10) / 10;

const AddCrop = () => {
	const [name, setName] = useState("");
	const [weight, setWeight] = useState(0);
	const [price, setPrice] = useState(0);
	const [showPrice, setShowPrice] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	let metaData = {};

	async function handleUpload(file) {
		try {
			setShowLoader(true);
			const response = await uploadImage(file);
			metaData = response.data;
			// console.log(metaData);
			setPrice(round(metaData.price));
			setShowPrice(true);
		} catch (err) {
			console.log(err);
		} finally {
			setShowLoader(false);
		}
	}

	return (
		<div>
			<h1>Add New Crop</h1>

			<form noValidate autoComplete="off">
				<Typography style={{ marginBottom: "10px" }}>1) Enter the name of the crop</Typography>
				<FormControl fullWidth variant="outlined" style={{ marginBottom: "25px" }}>
					<InputLabel htmlFor="outlined-text">Name</InputLabel>
					<OutlinedInput
						id="outlined-text"
						value={name}
						onChange={e => setName(e.target.value)}
						labelWidth={60}
					/>
				</FormControl>

				<Typography style={{ marginBottom: "10px" }}>2) Enter the quantity of the crop available</Typography>
				<FormControl fullWidth variant="outlined" style={{ marginBottom: "25px" }}>
					<InputLabel htmlFor="outlined-text">Quantity</InputLabel>
					<OutlinedInput
						id="outlined-text"
						type="number"
						value={weight}
						onChange={e => setWeight(e.target.value)}
						endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
						labelWidth={60}
					/>
				</FormControl>

				<Typography style={{ marginBottom: "5px" }}>3) Select an image of the crop</Typography>
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
								{showLoader && <CircularProgress />}
							</div>
						</section>
					)}
				</Dropzone>

				{showPrice && (
					<>
						<Typography style={{ marginBottom: "10px" }}>
							4) Select a price in a range we have selected
						</Typography>
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
					disabled={!showPrice || name === "" || weight === 0 || price === 0}
				>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default AddCrop;
