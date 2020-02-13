import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import Loading from "./Utils/Loading";

const Login = lazy(() => import("./Login"));
const Container = lazy(() => import("./Container"));
const ForgotPassword = () => <h1>ForgotPassword</h1>;
const NotFound = () => <h1>Page not found</h1>;

const App = () => (
	<Suspense fallback={<Loading />}>
		<CssBaseline />
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/forgot" component={ForgotPassword} />
				<Route path="/" component={Container} />
				<Route path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	</Suspense>
);

export default App;
