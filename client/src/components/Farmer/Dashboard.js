import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
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
	const [t] = useTranslation();

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
						{t("f_dashboard.new_crop.header")}
					</Typography>
					<Typography className={classes.body} component="p">
						{t("f_dashboard.new_crop.sub")}
					</Typography>
				</CardContent>
			</Card>
			<Card className={classes.root} variant="outlined" onClick={() => redirect("/farmer/listing")}>
				<CardContent>
					<Typography className={classes.title} component="h1">
						{t("f_dashboard.listing.header")}
					</Typography>
					<Typography className={classes.body} component="p">
						{t("f_dashboard.listing.sub")}
					</Typography>
				</CardContent>
			</Card>
			<Card className={classes.root} variant="outlined" onClick={() => redirect("/farmer/order")}>
				<CardContent>
					<Typography className={classes.title} component="h1">
						{t("f_dashboard.order.header")}
					</Typography>
					<Typography className={classes.body} component="p">
						{t("f_dashboard.order.sub")}
					</Typography>
				</CardContent>
			</Card>
			<Card className={classes.root} variant="outlined" onClick={() => redirect("/farmer/question")}>
				<CardContent>
					<Typography className={classes.title} component="h1">
						{t("f_dashboard.qna.header")}
					</Typography>
					<Typography className={classes.body} component="p">
						{t("f_dashboard.qna.sub")}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default Dashboard;
