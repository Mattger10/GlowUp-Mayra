import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  ButtonGroup,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { SelectChangeEvent } from "@mui/material/Select"; // Importa SelectChangeEvent
import { Link } from "react-router-dom";
import { Producto } from "./Firestore/FirestoreHandler";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Producto | null; // Utiliza la interfaz Product
  selectedSize: string;
  color: string;
  handleSizeSelect: (size: string) => void;
  handleChange: (event: SelectChangeEvent<string>) => void;
  handleAddToCart: (product: Producto) => void; // Utiliza la interfaz Product
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedSize,
  color,
  handleSizeSelect,
  handleChange,
  handleAddToCart,
}) => {

  const formatPrice = (price: number) => {
    const formattedPrice = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    return formattedPrice;
  };

  


  if (!product) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ImgModal src={product.imagenes[0]} alt="" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            width: "100%",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontSize: "24px",
              fontFamily: "Font2",
              color: "#434343",
              textTransform: "uppercase",
            }}
          >
            {product.nombre}
          </Typography>
          <Typography
                      sx={{
                        fontFamily: "Font2",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {/* Precio con descuento a la izquierda */}
                      {product.descuento && (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {/* Precio tachado a la izquierda */}
                          <div
                            style={{
                              textDecoration: "line-through",
                              marginRight: "5px",
                              fontSize: "14px",
                              color: "#434343",
                            }}
                          >
                            {formatPrice(product.precio)}
                          </div>
                          {/* Línea vertical */}
                          <div
                            style={{
                              borderLeft: "1px solid black",
                              height: "12px",
                              marginRight: "5px",
                            }}
                          ></div>
                          {/* Precio con descuento a la derecha */}
                          <div style={{ marginRight: "5px" }}>
                            {formatPrice(product.precioConDescuento)}
                          </div>
                        </div>
                      )}
                      {/* Si no hay descuento, solo se muestra el precio */}
                      {!product.descuento && formatPrice(product.precio)}
                    </Typography>
          {product.talles && product.talles.length > 0 && (
            <Typography
              sx={{
                fontSize: "14px",
                color: "#434343",
                paddingTop: "20px",
                paddingBottom: "10px",
              }}
            >
              TALLE: <span style={{ fontWeight: "bold" }}>{selectedSize}</span>
            </Typography>
          )}
          {product.talles && product.talles.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                variant="contained"
                aria-label="Basic button group"
                sx={{ boxShadow: 0, paddingBottom: "20px" }}
              >
                {product.talles.map(
                  (
                    talla: string,
                    index: number // Añadir tipos explícitos
                  ) => (
                    <StyledButton
                      key={index}
                      onClick={() => handleSizeSelect(talla)}
                      selected={selectedSize === talla}
                    >
                      {talla.toUpperCase()}
                    </StyledButton>
                  )
                )}
              </ButtonGroup>
            </Box>
          )}
          {product.colores && product.colores.length > 0 && (
            <Box
              sx={{
                width: "100%",
                "@media (max-width: 768px)": {
                  width: "90%",
                },
              }}
            >
              <FormControlStyled fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "black" }}
                >
                  Color
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={color}
                  label="Color"
                  onChange={handleChange}
                  inputProps={{ style: { color: "#000" } }}
                >
                  {product.colores.map((color: string, index: number) => (
                    <MenuItem key={index} value={color}>
                       {color.charAt(0).toUpperCase() + color.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlStyled>
            </Box>
          )}
          <Button
            variant="contained"
            onClick={() => {
              handleAddToCart(product);
              onClose(); // Cierra el modal después de agregar al carrito
            }}
            sx={{
              display: "inline-block",
              marginTop: "1rem",
              backgroundColor: "black",
              width: "100%",
              borderRadius: "0px",
              padding: "9px 12px",
              fontSize: "18px",
              "&:hover": {
                backgroundColor: "black",
              },
              "@media (max-width: 768px)": {
                fontSize: "10px",
                width: "90%",
              },
            }}
          >
            AGREGAR AL CARRITO
          </Button>
          <CustomLink to={`/details/${product.id}`}>
            <Box sx={{ marginTop: "1rem", marginBottom: "auto",display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "Font2",
                  borderBottom: "1px solid",
                  width: "35%",
                  paddingLeft: "5px ",
                  textAlign: "center",
                }}
              >
                VER MAS DETALLES
              </Typography>
            </Box>
          </CustomLink>
        </Box>
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            marginLeft: "53rem",
            color: "black",
            "@media (max-width: 768px)": {
              marginLeft: "21.7rem",
              marginTop: "0rem",
            },
          }}
        >
          <CloseIcon
            sx={{
              border: "1px solid #434343",
              color: "#434343",
              "@media (max-width: 768px)": {
                backgroundColor: "white",
                marginTop: "1rem",
              },
            }}
          />
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductModal;

const FormControlStyled = styled(FormControl)`
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: rgba(
      0,
      0,
      0,
      0.23
    ); /* Cambia el color del borde a negro al hacer clic */
    color: "red";
  }
`;

const StyledButton = styled.button<{ selected: boolean }>`
  margin-right: 5px;
  border: 1px solid #434343;
  border-radius: 0px;
  background-color: ${({ selected }) => (selected ? "#434343" : "transparent")};
  color: ${({ selected }) => (selected ? "white" : "#434343")};
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? "#434343" : "#434343")};
    color: white; // Cambiar el color del texto a blanco al hacer hover
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  maxHeight: '80vh', // Establecer una altura máxima para el contenido
  overflowY: 'auto', // Habilitar el scroll vertical
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  display: "flex",

  "@media (max-width: 768px)": {
    width: "100%",
    height: "100%",
    padding: "10px",
    flexDirection: "column",
  },
};

const ImgModal = styled("img")(() => ({
  position: "relative",
  width: "100%",
  height: "auto",
  maxWidth: "380px",
  marginBottom: "0px",
  marginRight: 10,
  "@media (max-width: 768px)": {
    width: "90%",
    height: "auto", // Cambiar el ancho a 100% para pantallas más pequeñas
    paddingLeft: "15px", // Cambiar el padding para pantallas más pequeñas
  },
}));

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
