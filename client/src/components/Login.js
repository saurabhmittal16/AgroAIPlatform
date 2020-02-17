import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Avatar,
	Button,
	TextField,
	Link,
	Grid,
	Container,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { login } from "../utils/network";
import setAuthHeaders from "../utils/setAuthHeaders";

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = props => {
	const [t] = useTranslation();

	const classes = useStyles();
	const [mobile, handleMobile] = useState("");
	const [password, handlePassword] = useState("");
	const [isFarmer, handleType] = useState("true");
	const [error, setError] = useState(null);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await login(mobile, password, isFarmer);
			setAuthHeaders(response.data.token);
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("isFarmer", isFarmer);
			localStorage.setItem("latt", response.data.lattitude);
			localStorage.setItem("long", response.data.longitude);
			props.history.push(isFarmer === "true" ? "/farmer" : "/buyer");
		} catch (err) {
			console.log("Error", err.response.data.message);
			setError(err.response.data.message);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{t("title")}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="mobile"
						label="Mobile Number"
						id="mobile"
						autoFocus
						value={mobile}
						onChange={e => handleMobile(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						value={password}
						onChange={e => handlePassword(e.target.value)}
					/>
					<RadioGroup
						style={{ justifyContent: "center" }}
						aria-label="position"
						name="type"
						value={isFarmer}
						onChange={e => handleType(e.target.value)}
						row
					>
						<FormControlLabel value="true" control={<Radio color="primary" />} label="Farmer" />
						<FormControlLabel value="false" control={<Radio color="primary" />} label="Buyer" />
					</RadioGroup>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Snackbar open={!!error} onClose={() => setError(null)} autoHideDuration={2000} message={error} />
		</Container>
	);
};

export default Login;
