import React, { useState, useEffect } from "react";
import { getQuestionFeed } from "../../utils/network";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddBox";
import Loading from "../Utils/Loading";

const useStyles = makeStyles(theme => ({
	header: {
		display: "flex",
		justifyContent: "space-between",
		marginTop: "10px",
		marginBottom: "10px",
		paddingLeft: "6px",
	},
	head: {
		fontSize: "28px",
		fontWeight: "bold",
		paddingTop: "6px",
	},
	root: {
		width: "100%",
		marginBottom: "1vh",
		// height: "20vh",
	},
	title: {
		fontSize: 18,
		marginBottom: 5,
		fontWeight: "bold",
	},
	body: {
		fontSize: 16,
		marginBottom: 10,
		float: "right",
	},
}));

const Order = props => {
	const classes = useStyles();
	const [data, setData] = useState([]);

	async function fetchData() {
		try {
			const response = await getQuestionFeed();
			// console.log(response.data);
			setData(response.data);
		} catch (err) {
			console.log(err);
		}
	}

	function handleClick(id, question) {
		props.history.push({
			pathname: `/farmer/question/${id}`,
			state: { question: question },
		});
	}

	const handleAdd = () => props.history.push("/farmer/question/add");

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<div className={classes.header}>
				<span className={classes.head}>Questions</span>
				<IconButton onClick={handleAdd}>
					<AddIcon style={{ fontSize: 30 }} />
				</IconButton>
			</div>

			{data.length === 0 ? (
				<Loading style={{ height: "60vh" }} />
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					{data.map((item, index) => (
						<Card
							className={classes.root}
							variant="outlined"
							key={`question_${index}`}
							onClick={() => handleClick(item._id, item.question)}
						>
							<CardContent>
								<Typography className={classes.title} component="h1">
									{item.question}
								</Typography>
								<Typography className={classes.body}>
									<span>
										By: <em>{item.by.name}</em>
									</span>
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default Order;
