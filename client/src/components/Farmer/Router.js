import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Loading from "../Utils/Loading";

const Dashboard = lazy(() => import("./Dashboard"));
const NewCrop = lazy(() => import("./AddCrop"));
const Listing = lazy(() => import("./Listing"));
const Order = lazy(() => import("./Order"));
const Question = lazy(() => import("./QuestionFeed"));
const NotFound = () => <h1>Page not found</h1>;

class Router extends React.Component {
	render() {
		return (
			<Suspense fallback={<Loading style={{ height: "60vh" }} />}>
				<Switch>
					<Route exact path="/farmer" component={Dashboard} />
					<Route exact path="/farmer/new" component={NewCrop} />
					<Route exact path="/farmer/listing" component={Listing} />
					<Route exact path="/farmer/order" component={Order} />
					<Route exact path="/farmer/question" component={Question} />
					<Route path="/farmer/*" component={NotFound} />
				</Switch>
			</Suspense>
		);
	}
}

export default Router;
