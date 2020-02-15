import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		width: "100%",
		marginBottom: "1vh",
		height: "40vh",
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
			<Card className={classes.root} variant="outlined" onClick={() => redirect("/buyer/feed")}>
				<CardContent>
					<Typography className={classes.title} component="h1">
						View Feed
					</Typography>
					<Typography className={classes.body} component="p">
						View crops added by farmer
					</Typography>
				</CardContent>
			</Card>
			<Card className={classes.root} variant="outlined" onClick={() => redirect("/buyer/order")}>
				<CardContent>
					<Typography className={classes.title} component="h1">
						View Orders
					</Typography>
					<Typography className={classes.body} component="p">
						View the orders you have placed
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default Dashboard;
