import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";

import ListItemLink from "../Utils/ListItemLink";

export const mainListItems = (
	<div>
		<ListItemLink primary="Home" icon={<DashboardIcon />} to="/farmer" />
		<ListItemLink primary="New Crop" icon={<AddCircleIcon />} to="/farmer/new" />
		<ListItemLink primary="Listings" icon={<ListAltIcon />} to="/farmer/listing" />
		<ListItemLink primary="Orders" icon={<ShoppingCartIcon />} to="/farmer/order" />
		<ListItemLink primary="Q/A" icon={<PeopleIcon />} to="/farmer/question" />
	</div>
);
