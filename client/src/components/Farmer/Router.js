import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Loading from "../Utils/Loading";

const Dashboard = () => <h1>Dashboard</h1>;
const NewCrop = lazy(() => import("./AddCrop"));
const NotFound = () => <h1>Page not found</h1>;

class Router extends React.Component {
	render() {
		return (
			<Suspense fallback={<Loading style={{ height: "60vh" }} />}>
				<Switch>
					<Route exact path="/farmer" component={Dashboard} />
					<Route exact path="/farmer/new" component={NewCrop} />
					<Route path="/farmer/*" component={NotFound} />
				</Switch>
			</Suspense>
		);
	}
}

export default Router;
