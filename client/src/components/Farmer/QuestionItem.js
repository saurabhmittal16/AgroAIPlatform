import React, { useEffect, useState } from "react";
import { getQuestionAnswers } from "../../utils/network";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import Loading from "../Utils/Loading";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		marginBottom: "1vh",
		// height: "20vh",
	},
	title: {
		fontSize: 16,
		marginBottom: 5,
	},
	body: {
		fontSize: 14,
		marginBottom: 10,
		float: "right",
	},
}));

const QuestionItem = props => {
	const question = props.location.state.question;
	const id = props.match.params.id;

	const classes = useStyles();
	const [data, setData] = useState(null);

	async function fetchData() {
		try {
			const response = await getQuestionAnswers(id);
			console.log(response.data.answers);
			setData(response.data.answers);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<h1>{question}</h1>
			{data === null ? (
				<Loading style={{ height: "60vh" }} />
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<h2>Answers: </h2>
					{data.map((item, index) => (
						<Card className={classes.root} variant="outlined" key={`answer_${index}`}>
							<CardContent>
								<Typography className={classes.title} component="h1">
									{item.answer}
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

export default QuestionItem;
