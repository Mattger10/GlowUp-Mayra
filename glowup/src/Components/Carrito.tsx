import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import styled, { keyframes } from "styled-components";
import { IconButton } from "@mui/material";
import { Producto } from "./Firestore/FirestoreHandler";

interface CarritoProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Producto[];
  removeFromCart: (productId: string) => void;
}

const Carrito: React.FC<CarritoProps> = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
}) => {
  const totalPrice = cartItems
    .reduce((total, currentItem) => {
      return (
        total +
        (currentItem.precioConDescuento
          ? Number(currentItem.precioConDescuento)
          : Number(currentItem.precio))
      );
    }, 0)
    .toLocaleString("es-ES", { style: "currency", currency: "ARS" });

  // Función para enviar los datos del producto al vendedor por WhatsApp
  const enviarPorWhatsApp = async () => {
    let mensaje = `Hola, quiero comprar los siguientes productos:\n\n`;
    for (const item of cartItems) {
      mensaje += `${item.nombre} (Color: ${item.colores}, Talle: ${
        item.selectedSize
      }) - Valor: $${
        item.precioConDescuento ? item.precioConDescuento : item.precio
      }\n`;
      mensaje += `Imagen: ${item.imagenes[0]}\n\n`;
    }
    mensaje += `Total: $${totalPrice}`;

    const numeroVendedor = "3794654492";
    const url = `https://wa.me/${numeroVendedor}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank");
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="cart-modal"
      aria-describedby="cart-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        "@media (max-width:768px)": {
          alignItems: "center",
        },
      }}
    >
      <ModalWrapper
        sx={{
          bgcolor: "background.paper",
          p: 1,
          width: "lg",
          height: "100%",
          overflow: "auto", // Agregar overflow para habilitar el scroll
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            id="cart-modal"
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              paddingTop: "20px",
              fontWeight: "700",
              fontFamily: "Font2",
              fontSize: "20px",
              color: "#434343",
            }}
          >
            CARRITO DE COMPRAS
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              marginTop: "0.8rem",
              color: "black",
              display: "flex",
              marginLeft: "auto",
              alignItems: "center",
              justifyContent: "end",
              "@media (max-width:768px)": {
                marginLeft: "10rem",
              },
            }}
          >
            <CloseIcon sx={{ border: "1px solid #434343", color: "#434343" }} />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #434343",
            borderBottom: "1px solid #434343",
            padding: "10px",
            gap: "18rem",
            width: "auto",
            "@media (max-width:768px)": {
              gap: "12rem",
            },
          }}
        >
          <Typography
            id="cart-modal-description"
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "start",
              fontFamily: "Font2",
              fontSize: "14px",
              color: "#434343",
            }}
          >
            PRODUCTO
          </Typography>
          <Typography
            id="cart-modal-description"
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "end",
              fontFamily: "Font2",
              fontSize: "14px",
              color: "#434343",
              marginLeft: "auto",
            }}
          >
            SUBTOTAL
          </Typography>
        </Box>
        <Box>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                borderBottom: "1px solid #434343",
                marginTop: "1rem",
              }}
            >
              <ImgCarrito
                src={item.imagenes[0]}
                alt=""
                style={{ marginLeft: "10px", marginBottom: "1rem" }}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", // Alinea verticalmente los elementos
                  marginTop: "-4rem",
                }}
              >
                <Typography
                  sx={{
                    paddingLeft: "10px",
                    fontSize: "14px",
                    fontFamily: "Font2",
                    color: "#434343",
                    textTransform: "uppercase",
                  }}
                >
                  {item.nombre}{" "}
                  <span
                    style={{ fontSize: "11.9px" }}
                  >{` (${item.color}, ${item.selectedSize})`}</span>
                </Typography>

                <Box
                  sx={{
                    paddingLeft: "70px",
                    fontSize: "14px",
                    fontFamily: "Font2",
                    marginLeft: "auto",
                  }}
                >
                  $
                  {item.precioConDescuento
                    ? parseFloat(item.precioConDescuento.toString()).toLocaleString(
                        "es-ES",
                        { style: "currency", currency: "ARS" }
                      )
                    : parseFloat(item.precio.toString()).toLocaleString(
                        "es-ES",
                        { style: "currency", currency: "ARS" }
                      )}
                </Box>

                <IconButton
                  aria-label="delete"
                  onClick={() => removeFromCart(item.id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent", // Cambia el color de fondo al pasar el ratón sobre el icono
                    },
                  }}
                >
                  <DeleteIcon sx={{ color: "#434343" }} />
                </IconButton>
              </Box>
            </div>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          {cartItems.length > 0 && ( // Verifica si hay elementos en el carrito
            <>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Font2",
                  fontSize: "24px",
                  color: "#434343",
                  marginRight: "10px",
                }}
              >
                Total:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Font2",
                  fontSize: "24px",
                  color: "#434343",
                  fontWeight: "bold",
                }}
              >
                ${totalPrice}
              </Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          {cartItems.length > 0 ? ( // Verifica si hay elementos en el carrito
            <Button
              variant="contained"
              color="primary"
              onClick={enviarPorWhatsApp}
              sx={{
                backgroundColor: "black",
                width: "100%",
                "&:hover": {
                  backgroundColor: "black", // Cambia el color de fondo al pasar el ratón sobre el icono
                },
              }}
            >
              FINALIZAR COMPRA
            </Button>
          ) : (
            // Si no hay productos en el carrito, muestra el mensaje "No hay productos"
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                color: "#c09853",
                padding: "5px",
                fontSize: "14px",
                fontFamily: "Font2",
              }}
            >
              EL CARRITO DE COMPRAS ESTÁ VACÍO.
            </Typography>
          )}
        </Box>
      </ModalWrapper>
    </Modal>
  );
};

export default Carrito;

const ImgCarrito = styled("img")(() => ({
  width: "56.39px",
  height: "75.06px",
}));

const slideRightToLeft = keyframes`
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  `;

const ModalWrapper = styled(Box)`
  && {
    @media (max-width: 768px) {
      align-items: center;
    }

    /* Aplicar animación */
    animation: ${slideRightToLeft} 0.3s ease-out;
  }
`;
