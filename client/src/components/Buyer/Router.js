import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Loading from "../Utils/Loading";

const Dashboard = lazy(() => import("./Dashboard"));
const Order = lazy(() => import("./Order"));
const Feed = () => <h1>Here are the listings</h1>;
const NotFound = () => <h1>Page not found</h1>;

class Router extends React.Component {
	render() {
		return (
			<Suspense fallback={<Loading style={{ height: "60vh" }} />}>
				<Switch>
					<Route exact path="/buyer" component={Dashboard} />
					<Route exact path="/buyer/feed" component={Feed} />
					<Route exact path="/buyer/order" component={Order} />
					<Route path="/buyer/*" component={NotFound} />
				</Switch>
			</Suspense>
		);
	}
}

export default Router;
