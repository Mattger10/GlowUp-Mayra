import * as React from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Box } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router-dom";

export default function Administrador() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        marginTop: "2rem",
        display: "flex",

        "@media (max-width: 768px)": {
          flexDirection: "column",
          justifyContent: "center",
        },
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          marginTop: "-1rem",
          bgcolor: "background.paper",
          "@media (max-width: 768px)": {
            maxWidth: "100%",
          },
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          sx={{
            color: "white",

            borderRadius: "8px",
            marginBottom: "0.5rem",
            background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
            "&:hover": {
              background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
            },
          }}
        >
          <ListItemIcon>
            <BurstModeIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Slider" />
        </ListItemButton>

        <ListItemButton
          onClick={handleClick}
          sx={{
            color: "white",

            borderRadius: "8px",
            marginBottom: "0.5rem",
            background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
            "&:hover": {
              background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
            },
          }}
        >
          <ListItemIcon>
            <InboxIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Ofertas" />
        </ListItemButton>

        <Link to="/administrador/destacados" style={{ textDecoration: "none" }}>
          <ListItemButton
            sx={{
              color: "white",

              marginBottom: "0.5rem",
              borderRadius: "8px",
              background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
              "&:hover": {
                background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
              },
            }}
          >
            <ListItemIcon>
              <LocalOfferIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Productos destacados" />
          </ListItemButton>
        </Link>

        <Link to="/administrador/accesorios" style={{ textDecoration: "none" }}>
          <ListItemButton
            onClick={handleClick}
            sx={{
              color: "white",

              marginBottom: "0.5rem",
              borderRadius: "8px",
              background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
              "&:hover": {
                background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
              },
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Accesorios" />
          </ListItemButton>
        </Link>

        <Link
          to="/administrador/blusasycamisas"
          style={{ textDecoration: "none" }}
        >
          <ListItemButton
            onClick={handleClick}
            sx={{
              color: "white",

              marginBottom: "0.5rem",
              borderRadius: "8px",
              background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
              "&:hover": {
                background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
              },
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Blusas y camisas" />
          </ListItemButton>
        </Link>

        <Link
          to="/administrador/corsetybody"
          style={{ textDecoration: "none" }}
        >
          <ListItemButton
            onClick={handleClick}
            sx={{
              color: "white",

              marginBottom: "0.5rem",
              borderRadius: "8px",
              background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
              "&:hover": {
                background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
              },
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Corset y body" />
          </ListItemButton>
        </Link>

        <Link to="/administrador/pantalones" style={{ textDecoration: "none" }}>
          <ListItemButton
            onClick={handleClick}
            sx={{
              color: "white",

              marginBottom: "0.5rem",
              borderRadius: "8px",
              background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
              "&:hover": {
                background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
              },
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Pantalones" />
          </ListItemButton>
        </Link>

        <Link
          to="/administrador/topsyremeras"
          style={{ textDecoration: "none" }}
        >
          <ListItemButton
            onClick={handleClick}
            sx={{
              color: "white",

              marginBottom: "0.5rem",
              borderRadius: "8px",
              background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
              "&:hover": {
                background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
              },
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Tops y remeras" />
          </ListItemButton>
        </Link>

        <Link
          to="/administrador/vestidosyenterizos"
          style={{ textDecoration: "none" }}
        >
          <ListItemButton
            onClick={handleClick}
            sx={{
              color: "white",

              marginBottom: "0.5rem",
              borderRadius: "8px",
              background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
              "&:hover": {
                background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
              },
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Vestidos y enterizos" />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
}
