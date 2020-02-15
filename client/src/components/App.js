import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CssBaseline, IconButton } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";

import Loading from "./Utils/Loading";

const Login = lazy(() => import("./Login"));
const FarmerContainer = lazy(() => import("./Farmer/Container"));
const BuyerContainer = lazy(() => import("./Buyer/Container"));
const NotFound = () => <h1>Page not found</h1>;

let isEng = true;

const App = () => {
	const { i18n } = useTranslation();

	const isFarmer = localStorage.getItem("isFarmer");
	const token = localStorage.getItem("token");

	const switchLanguage = () => {
		i18n.changeLanguage(isEng ? "hi" : "en");
		isEng = !isEng;
	};

	return (
		<div>
			<CssBaseline />
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path="/"
						component={() => {
							if (token) {
								if (isFarmer == "true") {
									return <Redirect to="/farmer" />;
								} else {
									return <Redirect to="/buyer" />;
								}
							} else {
								return <Redirect to="/login" />;
							}
						}}
					/>
					<Route exact path="/login" component={Login} />
					<Route path="/farmer" component={FarmerContainer} />
					<Route path="/buyer" component={BuyerContainer} />
					<Route path="*" component={NotFound} />
				</Switch>
				<IconButton
					style={{
						position: "absolute",
						right: "0",
						bottom: "0",
					}}
					onClick={switchLanguage}
				>
					<LanguageIcon fontSize="large" />
				</IconButton>
			</BrowserRouter>
		</div>
	);
};

const WrappedApp = () => (
	<Suspense fallback={<Loading />}>
		<App />
	</Suspense>
);

export default WrappedApp;
