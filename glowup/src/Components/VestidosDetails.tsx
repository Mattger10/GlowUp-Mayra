import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ThemeProvider } from "styled-components";
import theme from "../Components/muiTheme";
import useFirestoreVestidosyEnterizos, {
  VestidosyEnterizos
} from "../Components/Firestore/FirestoreHandlerVestidosyEnterizos";
import Loading from "./Loading";

interface VestidosyEnterizosDetailsProps {
  addToCart: (product: VestidosyEnterizos) => void;
}

const VestidosyEnterizosDetails: FunctionComponent<VestidosyEnterizosDetailsProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const { lista } = useFirestoreVestidosyEnterizos();
  const product = lista.find((producto) => producto.id === id);

  const [selectedSize, setSelectedSize] = useState<string>(
    product ? product.talles[0] : ""
  );
  const [color, setColor] = useState<string>(
    product && Array.isArray(product.colores) && product.colores.length > 0
      ? product.colores[0]
      : ""
  );
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = (err) => reject(err);
        img.src = url;
      });
    };
  
    if (product) {
      Promise.all(product.imagenes.map(loadImage))
        .then(() => setImagesLoaded(true))
        .catch((error) => console.error("Error loading images", error));
      
      // Inicializar el estado de selectedSize con el primer tamaño disponible
      setSelectedSize(product.talles.length > 0 ? product.talles[0] : "");
      setColor(product.colores.length > 0 ? product.colores[0] : "")
    }
  }, [product]);

  const [addingToCart, setAddingToCart] = useState<boolean>(false); // Estado para controlar el texto del botón
  const [cartItems, setCartItems] = useState<{ [key: number]: VestidosyEnterizos }>({});

  const handleSizeSelect = (talla: string) => {
    setSelectedSize(talla.toUpperCase());
  };

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const handleAddToCart = async (product: VestidosyEnterizos) => {
    setAddingToCart(true); // Cambiar el texto del botón a "Agregando..."
    const productToAdd = { ...product, selectedSize, color };
    // Agregar un pequeño retraso simulado para demostrar el estado "Agregando..."
    await new Promise((resolve) => setTimeout(resolve, 1000));
    addToCart(productToAdd);
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [productToAdd.id]: productToAdd,
    }));
    setAddingToCart(false); // Restaurar el texto original del botón
  };

  const handleRemoveFromCart = (productId: number) => {
    const updatedCartItems = { ...cartItems };
    delete updatedCartItems[productId];
    setCartItems(updatedCartItems);
  };

  const isInCart = (productId: number) => {
    return Object.prototype.hasOwnProperty.call(cartItems, productId);
  };

  const formatPrice = (price: number) => {
    const formattedPrice = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    return formattedPrice;
  };

  if (!product || !imagesLoaded) return <Loading />

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GridContainer>
          <SecondaryImgContainer>
            <SecondaryImg src={product.imagenes[1]} alt="" />
            <SecondaryImg src={product.imagenes[2]} alt="" />
          </SecondaryImgContainer>
          <MainImg src={product.imagenes[0]} alt="" />
        </GridContainer>
        <BoxContainer>
          <BoxContent>
            <Typography
              sx={{
                fontSize: "24px",
                textAlign: "start",
                color: "#434343",
                fontFamily: "Font2",
              }}
            >
              {product.nombre}
            </Typography>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "bold",
                textAlign: "start",
                color: "#434343",
                fontFamily: "Font2",
              }}
            >
              {formatPrice(product.precio)}
            </Typography>
            <br />

            <Typography
              sx={{
                fontSize: "14px",
                color: "#434343",
                paddingTop: "20px",
                paddingBottom: "10px",
              }}
            >
              TALLE: <span style={{ fontWeight: "bold" }}>{selectedSize.toUpperCase()}</span>
            </Typography>

            <ButtonGroup
              variant="contained"
              aria-label="Basic button group"
              sx={{ boxShadow: 0, paddingBottom: "0px" }}
            >
              {product.talles.map((talla, index) => (
                <StyledButton
                  key={index}
                  onClick={() => handleSizeSelect(talla)}
                  selected={selectedSize === talla}
                >
                  {talla.toUpperCase()}
                </StyledButton>
              ))}
            </ButtonGroup>

            <Box
              sx={{
                width: "100%",
                "@media (max-width: 768px)": {
                  width: "90%",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#434343",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                  fontFamily: "Font2",
                  fontSize: "14px",
                }}
              >
                COLOR:
              </Typography>
              <FormControlStyled fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={color}
       
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ style: { color: "#000" } }}
                  sx={{
                    "& .MuiSelect-select": {
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    },
                  }}
                >
                 {product.colores.map((color: string, index: number) => (
                  <MenuItem key={index} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </MenuItem>
                ))}
                </Select>
              </FormControlStyled>
            </Box>
            <br />
            <Typography
              sx={{
                fontFamily: "Font2",
                fontWeight: "bold",
                fontSize: "16px",
                color: "#434343",
              }}
            >
              Descripción
            </Typography>
            <Typography
              sx={{ fontFamily: "Font2", fontSize: "14px", color: "#434343" }}
            >
              {product.descripcion}
            </Typography>
            <Stack spacing={2} direction="row" sx={{ marginTop: "1rem" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "black", // Puedes cambiar el color que desees para el hover
                  },
                }}
                onClick={() => {
                  isInCart(parseInt(product.id, 10))
                    ? handleRemoveFromCart(parseInt(product.id, 10))
                    : handleAddToCart(product);
                }}
                disabled={addingToCart} // Deshabilitar el botón mientras se está agregando
              >
                {addingToCart ? "Agregando..." : "AGREGAR AL CARRITO"}{" "}
                {/* Cambiar el texto del botón según el estado */}
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: "20px", marginLeft: "1rem" }}
                />
              </Button>
            </Stack>
          </BoxContent>
        </BoxContainer>
      </Container>
    </ThemeProvider>
  );
};

export default VestidosyEnterizosDetails;

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
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? "#434343" : "#434343")};
    color: white; // Cambiar el color del texto a blanco al hacer hover
  }
`;

const MainImg = styled("img")(() => ({
  width: "25rem",
  height: "35rem",
  float: "right",
  objectFit: "cover", // Ajustar imagen manteniendo la relación de aspecto y cubriendo completamente el contenedor
  marginLeft: "-12rem",
  "@media screen and (max-width: 768px)": {
    marginLeft: "0",
    width: "100%",
  },
  "@media screen and (min-width: 768px) and (max-width: 1024px)": {
    marginLeft: "-7rem",
    width: "100%",
  },
}));

const SecondaryImg = styled("img")(() => ({
  width: "9rem",
  height: "10rem",
  "@media screen and (max-width: 768px)": {
    width: "100%",
    height: "30rem",
  },
}));

const Container = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 30px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 70%; // Cambia el orden de las columnas
  gap: 20px;
  margin-top: 30px;
  width: 100%;
  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Cambia a una sola columna en dispositivos más pequeños
  }
`;

const SecondaryImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BoxContainer = styled.div`
  margin-top: -31.4rem;
  float: right;
  width: 45%; // ajusta el ancho según sea necesario
  @media screen and (max-width: 768px) {
    float: none;
    width: 100%;
    margin-top: 1rem;
  }
  @media screen and (min-width: 768px) and (max-width: 900px) {
    margin-left: -5rem;
    width: 100%;
    margin-top: 1rem; /* Ajusta este valor según sea necesario */
  }
`;

const BoxContent = styled(Box)`
  padding: 20px;
`;