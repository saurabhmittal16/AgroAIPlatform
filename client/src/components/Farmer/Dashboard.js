import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		width: "100%",
		marginBottom: "1vh",
		height: "20vh",
	},
	title: {
		fontSize: 28,
		textAlign: "center",
		marginBottom: "1vh",
		fontWeight: "bold",
	},
	body: {
		fontSize: 18,
		textAlign: "center",
	},
});

const Dashboard = props => {
	const classes = useStyles();
	const redirect = to => props.history.push(to);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Card className={classes.root} variant="outlined" onClick={() => redirect("/farmer/new")}>
				<CardContent>
					<Typography className={classes.title} component="h1">
						NEW CROP
					</Typography>
					<Typography className={classes.body} component="p">
						Add a new crop which can be bough by buyers
					</Typography>
				</CardContent>
			</Card>
			<Card className={classes.root} variant="outlined" onClick={() => redirect("/farmer/listing")}>
				<CardContent>
					<Typography className={classes.title} component="h1">
						LISTINGS
					</Typography>
					<Typography className={classes.body} component="p">
						View the listings you have added
					</Typography>
				</CardContent>
			</Card>
			<Card className={classes.root} variant="outlined" onClick={() => redirect("/farmer/order")}>
				<CardContent>
					<Typography className={classes.title} component="h1">
						ORDERS
					</Typography>
					<Typography className={classes.body} component="p">
						View the orders placed
					</Typography>
				</CardContent>
			</Card>
			<Card className={classes.root} variant="outlined" onClick={() => redirect("/farmer/question")}>
				<CardContent>
					<Typography className={classes.title} component="h1">
						Q/A
					</Typography>
					<Typography className={classes.body} component="p">
						View questions added by others and answer
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default Dashboard;
