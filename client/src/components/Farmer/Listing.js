import React, { useState, useEffect } from "react";
import { getFarmerListings } from "../../utils/network";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Modal, Backdrop, Fade } from "@material-ui/core";
import Loading from "../Utils/Loading";
import config from "../../config";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		marginBottom: "1vh",
		height: "10vh",
	},
	title: {
		fontSize: 18,
	},
	body: {
		fontSize: 16,
		display: "flex",
		justifyContent: "space-between",
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		border: "2px solid #000",
		padding: theme.spacing(2, 4, 3),
	},
}));

const Listing = () => {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	async function fetchData() {
		try {
			const response = await getFarmerListings();
			// console.log(response.data);
			setData(response.data);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<h1>My Listing</h1>
			{data.length === 0 ? (
				<Loading />
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					{data.map((item, i) => {
						return (
							<Card
								className={classes.root}
								variant="outlined"
								onClick={() => {
									setOpen(true);
									setIndex(i);
								}}
								key={`farmer_${i}`}
							>
								<CardContent>
									<Typography className={classes.title} component="h1">
										<strong>Name: </strong>
										{item.name}
									</Typography>
									<Typography className={classes.body}>
										<span>
											<strong>Price: </strong>
											{item.price}
										</span>
										<span>
											<strong>Quantity: </strong>
											{item.quantity}
										</span>
									</Typography>
								</CardContent>
							</Card>
						);
					})}
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={open}
						onClose={() => setOpen(false)}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>
							<div className={classes.paper}>
								<h2 style={{ marginBottom: 5, marginTop: 0 }}>{data[index].name}</h2>
								<ul style={{ marginTop: 2, marginBottom: 0, paddingLeft: 20 }}>
									<li>
										<strong>Price:</strong> ₹{data[index].price}
									</li>
									<li>
										<strong>Quantity:</strong> {data[index].quantity} kg
									</li>
									<li>
										<strong>Quality:</strong> {data[index].quality} %
									</li>
									<li>
										<a href={config.model_url + data[index].image} target="none">
											Image
										</a>
									</li>
								</ul>
							</div>
						</Fade>
					</Modal>
				</div>
			)}
		</div>
	);
};

export default Listing;
