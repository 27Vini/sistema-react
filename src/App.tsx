import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Toolbar,
	Typography,
	createTheme,
	useMediaQuery,
	ThemeProvider,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import { AppRoutes } from "./routes";

const drawerWidth = 260;

const theme = createTheme({
	palette: {
		primary: {
			main: "#1f3a5f",
		},
		secondary: {
			main: "#2e7d5b",
		},
		background: {
			default: "#f4f6f8",
			paper: "#ffffff",
		},
	},
	shape: {
		borderRadius: 10,
	},
});

const navigationItems = [
	{ label: "Home", to: "/" },
	{ label: "Cadastrar jogo jogado", to: "/jogosJogados/cadastrar" },
	{ label: "Listar jogos jogados", to: "/jogosJogados/listar" },
	{ label: "Cadastrar jogo", to: "/jogos/cadastrar" },
	{ label: "Listar jogos", to: "/jogos/listar" },
	{ label: "Cadastrar usuario", to: "/usuarios/cadastrar" },
	{ label: "Listar usuarios", to: "/usuarios/listar" },
	{ label: "Cadastrar administrador", to: "/administradores/cadastrar" },
	{ label: "Listar administradores", to: "/administradores/listar" },
	{ label: "Cadastrar distribuidora", to: "/distribuidoras/cadastrar" },
	{ label: "Listar distribuidoras", to: "/distribuidoras/listar" },
];

function App() {
	const location = useLocation();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const [mobileOpen, setMobileOpen] = useState(false);

	const drawerContent = (
		<Box>
			<Toolbar>
				<Typography variant="h6" component="div" className={styles.drawerTitle}>
					Biblioteca de Jogos
				</Typography>
			</Toolbar>
			<Divider />
			<List>
				{navigationItems.map((item) => (
					<ListItemButton
						key={item.to}
						component={RouterLink}
						to={item.to}
						selected={location.pathname === item.to}
						onClick={() => setMobileOpen(false)}
					>
						<ListItemText primary={item.label} />
					</ListItemButton>
				))}
			</List>
		</Box>
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ display: "flex", minHeight: "100vh" }}>
				<AppBar
					position="fixed"
					sx={{
						width: { md: `calc(100% - ${drawerWidth}px)` },
						ml: { md: `${drawerWidth}px` },
					}}
				>
					<Toolbar>
						{!isDesktop ? (
							<IconButton
								color="inherit"
								edge="start"
								onClick={() => setMobileOpen((current) => !current)}
								sx={{ mr: 2 }}
							>
								<MenuIcon />
							</IconButton>
						) : null}
						<Box>
							<Typography
								variant="h6"
								component="h1"
								className={styles.appTitle}
							>
								Sistema Web de Biblioteca Pessoal de Jogos
							</Typography>
							<Typography variant="body2">
								Cadastro de jogos, usuarios, administradores e distribuidoras
							</Typography>
						</Box>
					</Toolbar>
				</AppBar>

				<Box
					component="nav"
					sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
				>
					<Drawer
						variant={isDesktop ? "permanent" : "temporary"}
						open={isDesktop ? true : mobileOpen}
						onClose={() => setMobileOpen(false)}
						ModalProps={{ keepMounted: true }}
						sx={{
							"& .MuiDrawer-paper": {
								width: drawerWidth,
								boxSizing: "border-box",
							},
						}}
					>
						{drawerContent}
					</Drawer>
				</Box>

				<Box
					component="main"
					className={styles.mainContent}
					sx={{
						flexGrow: 1,
						p: 3,
						width: { md: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					<AppRoutes />
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default App;
