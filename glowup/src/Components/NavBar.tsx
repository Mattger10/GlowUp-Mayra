import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../public/glow up.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { ThemeProvider } from "styled-components";
import theme from "../Components/muiTheme";
import Carrito from "./Carrito";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PersonIcon from "@mui/icons-material/Person";
import { Producto } from "../Components/Firestore/FirestoreHandler";



interface NavBarProps {
  cartItems: Producto[];
  removeFromCart: (productId: string) => void;
}

const pages = [
  { name: "Inicio", link: "/" },
  { name: "Admin", link: "/administrador" },
  { name: "Accesorios", link: "/accesorios" },
  { name: "Blusas y Camisas", link: "/blusas" },
  { name: "Corset y Body", link: "/corset" },
  { name: "Pantalones", link: "/pantalones" },
  { name: "Tops y Remeras", link: "/topsyremeras" },
  { name: "Vestidos y Enterizos", link: "/vestidos" },
];

const productos = [
  { name: "Accesorios", link: "/accesorios" },
  { name: "Blusas y Camisas", link: "/blusas" },
  { name: "Corset y Body", link: "/corset" },
  { name: "Pantalones", link: "/pantalones" },
  { name: "Tops y Remeras", link: "/topsyremeras" },
  { name: "Vestidos y Enterizos", link: "/vestidosyenterizos" },
];

function NavBar({ cartItems, removeFromCart }: NavBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElProducts, setAnchorElProducts] =
    React.useState<null | HTMLElement>(null);

  const [isCartModalOpen, setIsCartModalOpen] = React.useState<boolean>(false);

  const handleOpenProductsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProducts(event.currentTarget);
  };

  const handleCloseProductsMenu = () => {
    setAnchorElProducts(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenCartModal = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  const cartItemCount = cartItems.length;

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <AppBar
          position="static"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            backgroundColor: "transparent",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              ></Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  color: "black",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link
                          to={page.link}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {page.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Link to="/">
                <Img src={Logo} alt="" />
              </Link>

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              ></Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", marginLeft: "1rem" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                >
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button sx={{}}>
                      <Typography
                        sx={{
                          color: "black",
                          cursor: "pointer",
                          marginRight: "2rem",
                          marginLeft: "2rem",
                        }}
                      >
                        Inicio
                      </Typography>
                    </Button>
                  </Link>

                  <Button onClick={handleOpenProductsMenu} sx={{}}>
                    <Typography sx={{ color: "black", cursor: "pointer" }}>
                      Productos
                    </Typography>
                    {anchorElProducts ? (
                      <IconButton aria-label="Cerrar">
                        <ArrowDropUpIcon />
                      </IconButton>
                    ) : (
                      <IconButton aria-label="Abrir">
                        <ArrowDropDownIcon />
                      </IconButton>
                    )}
                  </Button>

                  <Link to="/descuentos" style={{ textDecoration: "none" }}>
                    <Button sx={{}}>
                      <Typography
                        sx={{
                          color: "black",
                          cursor: "pointer",
                          marginRight: "2rem",
                          marginLeft: "1rem",
                        }}
                      >
                        Ofertas
                      </Typography>
                    </Button>
                  </Link>

                  <Link to="/contacto" style={{ textDecoration: "none" }}>
                    <Button sx={{}}>
                      <Typography
                        sx={{
                          color: "black",
                          cursor: "pointer",
                          marginRight: "2rem",
                          marginLeft: "1rem",
                        }}
                      >
                        CONTACTO
                      </Typography>
                    </Button>
                  </Link>
                </Box>

                <Menu
                  id="products-menu"
                  anchorEl={anchorElProducts}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElProducts)}
                  onClose={handleCloseProductsMenu}
                >
                  {productos.map((page) => (
                    <MenuItem onClick={handleCloseProductsMenu}>
                      <Link
                        to={page.link}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {page.name}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <IconButton aria-label="cart" onClick={handleOpenCartModal}>
                <StyledBadge badgeContent={cartItemCount}>
                  <ShoppingCartIcon sx={{ color: "black" }} />
                </StyledBadge>
              </IconButton>
              <Link to="/administrador" style={{ textDecoration: "none" }}>
                <IconButton aria-label="cart">
                  <PersonIcon sx={{ color: "black" }} />
                </IconButton>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
        <Carrito
          isOpen={isCartModalOpen}
          onClose={handleCloseCartModal}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />
      </React.Fragment>
    </ThemeProvider>
  );
}
export default NavBar;

const Img = styled("img")(() => ({
  width: "90px",
  height: "90px",
  borderRadius: "50%",
}));

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: "2px solid",
    padding: "0 4px",
    color: "white",
    backgroundColor: "#434343",
  },
}));
