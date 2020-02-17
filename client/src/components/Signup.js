import React, { useState } from "react";
import {
	Container,
	TextField,
	Link,
	Grid,
	Typography,
	Avatar,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
	Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signup } from "../utils/network";

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = props => {
	const classes = useStyles();
	const [name, setName] = useState("");
	const [mobile, setMobile] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [isFarmer, handleType] = useState("true");
	const [error, setError] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();

		navigator.geolocation.getCurrentPosition(async ({ coords }) => {
			let lattitude = coords.latitude;
			let longitude = coords.longitude;

			// console.log(name, mobile, password, address, isFarmer, lattitude, longitude);
			try {
				const response = await signup(name, mobile, password, address, isFarmer, lattitude, longitude);
				if (response.status === 200) {
					props.history.push("login");
				}
			} catch (err) {
				console.log("Error", err.response.data.message);
				setError(err.response.data.message);
			}
		});
	}

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Name"
								autoFocus
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Mobile"
								type="mobile"
								value={mobile}
								onChange={e => setMobile(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Address"
								type="adresss"
								value={address}
								onChange={e => setAddress(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Password"
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<RadioGroup
								style={{ justifyContent: "center" }}
								aria-label="position"
								value={isFarmer}
								onChange={e => handleType(e.target.value)}
								row
							>
								<FormControlLabel value="true" control={<Radio color="primary" />} label="Farmer" />
								<FormControlLabel value="false" control={<Radio color="primary" />} label="Buyer" />
							</RadioGroup>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link variant="body2" onClick={() => props.history.push("/login")}>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Snackbar open={!!error} onClose={() => setError(null)} autoHideDuration={2000} message={error} />
		</Container>
	);
};

export default SignUp;
