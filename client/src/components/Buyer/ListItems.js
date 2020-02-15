import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import ListItemLink from "../Utils/ListItemLink";

export const mainListItems = (
	<div>
		<ListItemLink primary="Home" icon={<DashboardIcon />} to="/buyer" />
		<ListItemLink primary="Listings" icon={<ShoppingCartIcon />} to="/buyer/listings" />
	</div>
);
