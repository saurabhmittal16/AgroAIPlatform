import React, { useState, useEffect } from "react";
import { getBuyerFeed } from "../../utils/network";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Modal, Backdrop, Fade, Menu, MenuItem, Button } from "@material-ui/core";
import Loading from "../Utils/Loading";
import config from "../../config";
import getDistance from "../../utils/distance";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		marginBottom: "1vh",
		// height: "20vh",
	},
	title: {
		fontSize: 16,
	},
	body: {
		fontSize: 16,
		display: "flex",
		flexDirection: "column",
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

const getCompareFn = type => {
	if (type === 0) {
		return function(a, b) {
			return a.distance - b.distance;
		};
	} else if (type === 1) {
		return function(a, b) {
			return b.price - a.price;
		};
	} else if (type === 2) {
		return function(a, b) {
			return b.quantity - a.quantity;
		};
	}
};

const Order = () => {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = type => {
		setAnchorEl(null);
		setData(data.sort(getCompareFn(type)));
	};

	async function fetchData() {
		try {
			const response = await getBuyerFeed();
			setData(
				response.data.map(item => {
					item.distance = getDistance(item.farmerLattitude, item.farmerLongitude);
					// item.distance = Math.random() * 1000;
					return item;
				})
			);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<h1>Available Listings</h1>
			{data.length === 0 ? (
				<Loading style={{ height: "60vh" }} />
			) : (
				<div>
					<Button
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleClick}
						style={{ marginBottom: 10 }}
					>
						Filter
					</Button>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={() => handleClose(0)}>Distance</MenuItem>
						<MenuItem onClick={() => handleClose(1)}>Price</MenuItem>
						<MenuItem onClick={() => handleClose(2)}>Quantity</MenuItem>
					</Menu>
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
									key={`listing_${i}`}
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
											<span>
												<strong>Farmer Mobile: </strong>
												{item.farmerMobile}
											</span>
											<span>
												<strong>Distance: </strong>
												{item.distance} km
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
									<h2 style={{ marginBottom: 5, marginTop: 8 }}>
										<em>{data[index].name}</em>
									</h2>
									<ul style={{ marginTop: 2, marginBottom: 0, paddingLeft: 20 }}>
										<li>
											<strong>Price:</strong> {data[index].price}
										</li>
										<li>
											<strong>Quantity:</strong> {data[index].quantity} kg
										</li>
										<li>
											<strong>Farmer Name:</strong> {data[index].farmerName}
										</li>
										<li>
											<strong>Farmer Mobile:</strong> {data[index].farmerMobile}
										</li>
										<li>
											<strong>Farmer Address:</strong> {data[index].farmerAddress}
										</li>
										<li>
											<a href={config.model_url + data[index].image} target="none">
												Image
											</a>
										</li>
										<li>
											<strong>Distance: </strong>
											{data[index].distance} km
										</li>
									</ul>
								</div>
							</Fade>
						</Modal>
					</div>
				</div>
			)}
		</div>
	);
};

export default Order;
