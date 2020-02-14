import React, { useState } from "react";
import { Button, OutlinedInput, InputLabel, InputAdornment, FormControl } from "@material-ui/core";

const AddCrop = () => {
	const [name, setName] = useState("");
	const [weight, setWeight] = useState(0);
	const [price, setPrice] = useState(0);
	const [showPrice, setShowPrice] = useState(false);

	function uploadImage(e) {
		console.log(e);
	}

	return (
		<div>
			<h1>Add New Crop</h1>
			<form noValidate autoComplete="off">
				<FormControl variant="outlined">
					<input
						color="primary"
						accept="image/*"
						id="contained-button-file"
						style={{ display: "none" }}
						type="file"
						onChange={uploadImage}
					/>
					<label htmlFor="contained-button-file">
						<Button variant="contained" color="primary" component="span">
							Upload
						</Button>
					</label>
				</FormControl>

				<p />
				<FormControl fullWidth variant="outlined">
					<InputLabel htmlFor="outlined-text">Name</InputLabel>
					<OutlinedInput id="outlined-text" value={name} onChange={setName} labelWidth={60} />
				</FormControl>

				<p />
				<FormControl fullWidth variant="outlined">
					<InputLabel htmlFor="outlined-text">Quantity</InputLabel>
					<OutlinedInput
						id="outlined-text"
						type="number"
						value={weight}
						onChange={setWeight}
						endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
						labelWidth={60}
					/>
				</FormControl>
				<p />
				{showPrice && (
					<FormControl fullWidth variant="outlined">
						<InputLabel htmlFor="outlined-text">Price</InputLabel>
						<OutlinedInput
							id="outlined-text"
							type="number"
							value={price}
							onChange={setPrice}
							startAdornment={<InputAdornment position="start">₹</InputAdornment>}
							labelWidth={60}
						/>
					</FormControl>
				)}
			</form>
		</div>
	);
};

export default AddCrop;
