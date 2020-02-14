import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import { CssBaseline, IconButton } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";

import Loading from "./Utils/Loading";

const Login = lazy(() => import("./Login"));
const Container = lazy(() => import("./Container"));
const ForgotPassword = () => <h1>ForgotPassword</h1>;
const NotFound = () => <h1>Page not found</h1>;

let isEng = true;

const App = () => {
	const { t, i18n } = useTranslation();

	const switchLanguage = () => {
		i18n.changeLanguage(isEng ? "hi" : "en");
		isEng = !isEng;
	};

	return (
		<div>
			<CssBaseline />
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/forgot" component={ForgotPassword} />
					<Route path="/" component={Container} />
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
