import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";

import ListItemLink from "../Utils/ListItemLink";

export const mainListItems = (
	<div>
		<ListItemLink primary="Home" icon={<DashboardIcon />} to="/farmer" />
		<ListItemLink primary="New Crop" icon={<ShoppingCartIcon />} to="/farmer/new" />
		<ListItemLink primary="Q/A" icon={<PeopleIcon />} to="/farmer/question" />
	</div>
);
