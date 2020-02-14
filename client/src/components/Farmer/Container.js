import React, { useState } from "react";
import clsx from "clsx";
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, Badge, Container } from "@material-ui/core";
import { Menu, ExitToApp, ChevronLeft } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { mainListItems } from "./ListItems";
import Router from "./Router";
import setAuthHeaders from "../../utils/setAuthHeaders";

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 18, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 24,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
}));

const MainContainer = props => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	function logout() {
		setAuthHeaders();
		localStorage.clear();
		props.history.push("/login");
	}

	return (
		<div className={classes.root}>
			<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpen(true)}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
					>
						<Menu />
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						AgroAI
					</Typography>
					<IconButton color="inherit" onClick={logout}>
						<Badge color="secondary">
							<ExitToApp />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={() => setOpen(false)}>
						<ChevronLeft />
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
			</Drawer>

			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="xl" className={classes.container}>
					<Router />
				</Container>
			</main>
		</div>
	);
};

export default MainContainer;
