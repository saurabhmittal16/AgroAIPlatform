import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { addQuestion } from "../../utils/network";

const AddQuestion = props => {
	const [question, setQuestion] = useState("");

	async function handleSubmit() {
		// console.log(question);
		try {
			const response = await addQuestion(question);
			if (response.status === 200) {
				props.history.push("/farmer/question");
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<h1>Add Question</h1>
			<TextField
				value={question}
				multiline
				onChange={e => setQuestion(e.target.value)}
				style={{ width: "100%", background: "white", marginTop: "10px" }}
				variant="outlined"
			/>
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: 10 }}
				disabled={question.length === 0}
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</div>
	);
};

export default AddQuestion;
