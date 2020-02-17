import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, TextField, InputAdornment, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { getQuestionAnswers, addAnswer } from "../../utils/network";
import Loading from "../Utils/Loading";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		marginBottom: "1vh",
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
	const [answer, setAnswer] = useState("");

	// used to re-fetch answers from the server
	const [changed, setChanged] = useState(0);

	async function handleSubmit() {
		// console.log(id, answer);
		try {
			const response = await addAnswer(id, answer);
			setChanged(changed + 1);
			setData(null);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await getQuestionAnswers(id);
				// console.log(response.data.answers);
				setData(response.data.answers);
				setAnswer("");
			} catch (err) {
				console.log(err);
			}
		}

		fetchData();
	}, [id, changed]);

	return (
		<div>
			<h1>{question}</h1>
			<div>
				<h2 style={{ marginBottom: 0 }}>Add Answer: </h2>
				<TextField
					multiline
					value={answer}
					onChange={e => setAnswer(e.target.value)}
					style={{ width: "100%", background: "white", marginTop: "10px" }}
					variant="outlined"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleSubmit}>
									<SendIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</div>
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
