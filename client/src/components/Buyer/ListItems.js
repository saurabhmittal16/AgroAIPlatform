import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import ListItemLink from "../Utils/ListItemLink";

export const mainListItems = (
	<div>
		<ListItemLink primary="Home" icon={<DashboardIcon />} to="/buyer" />
		<ListItemLink primary="Feed" icon={<ListAltIcon />} to="/buyer/feed" />
		<ListItemLink primary="Order" icon={<ShoppingCartIcon />} to="/buyer/order" />
	</div>
);
