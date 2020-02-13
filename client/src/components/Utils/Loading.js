import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loading = props => {
	return (
		<div className="loading" style={props.style}>
			<CircularProgress />
		</div>
	);
};

export default Loading;
