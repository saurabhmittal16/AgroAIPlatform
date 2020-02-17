import React, { useState, useEffect } from "react";
import { getBuyerOrders } from "../../utils/network";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Modal, Backdrop, Fade } from "@material-ui/core";
import Loading from "../Utils/Loading";
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

const Order = () => {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	async function fetchData() {
		try {
			const response = await getBuyerOrders();
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
			<h1>My Orders</h1>
			{data.length === 0 ? (
				<Loading style={{ height: "60vh" }} />
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					{data.map((order, i) => {
						console.log(order.farmer);
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
										<strong>Order ID: </strong>
										{order._id.substr(order._id.length - 8, 8)}
									</Typography>
									<Typography className={classes.body}>
										<span>
											<strong>Bought Crop: </strong>
											{order.listing.name}
										</span>
										<span>
											<strong>Farmer Name: </strong>
											{order.farmer.name}
										</span>
										<span>
											<strong>Farmer Mobile: </strong>
											{order.farmer.mobile}
										</span>
										<span>
											<strong>Distance: </strong>
											{getDistance(order.farmer.lattitude, order.farmer.longitude)} km
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
									Order <em>{data[index]._id.substr(data[index]._id.length - 8, 8)}</em>
								</h2>
								<ul style={{ marginTop: 2, marginBottom: 0, paddingLeft: 20 }}>
									<li>
										<strong>Bought Crop:</strong> {data[index].listing.name}
									</li>
									<li>
										<strong>Bought Quantity:</strong> {data[index].quantity} kg
									</li>
									<li>
										<strong>Crop Price:</strong> {data[index].listing.price} kg
									</li>
									<li>
										<strong>Buyer Name:</strong> {data[index].farmer.name}
									</li>
									<li>
										<strong>Buyer Mobile:</strong> {data[index].farmer.mobile}
									</li>
									<li>
										<strong>Buyer Address:</strong> {data[index].farmer.address}
									</li>
									<li>
										<strong>Amount Paid:</strong> ₹{" "}
										{data[index].quantity * data[index].listing.price}
									</li>
									<li>
										<strong>Placed On: </strong>
										{Date(data[index].createdAt)
											.toString()
											.substr(0, 15)}
									</li>
									<li>
										<strong>Distance: </strong>
										{getDistance(data[index].farmer.lattitude, data[index].farmer.longitude)} km
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

export default Order;
