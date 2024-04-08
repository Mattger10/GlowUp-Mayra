import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "../Components/muiTheme";
import { SelectChangeEvent } from "@mui/material/Select";
import ProductModal from "./Modal";
import useFirestorePantalones, {
 Pantalones,
} from "../Components/Firestore/FirestoreHandlerPantalones";
import Loading from "./Loading";

interface PantalonesProps {
  addToCart: (product: Pantalones) => void;
}

const PantalonesPage: FunctionComponent<PantalonesProps> = ({ addToCart }) => {
  // const { Accesorios } = products;

  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Pantalones | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [color, setColor] = useState("");
  const { lista } = useFirestorePantalones();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleOpenCartModal = (product: Pantalones) => {
    setSelectedProduct(product);
    setSelectedSize(product.talles[0]);
    setIsCartModalOpen(true);
    setColor(product.colores[0]);
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const productToAdd = {
      ...selectedProduct,
      selectedSize,
      color,
    };
    addToCart(productToAdd);
    handleCloseCartModal();
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

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // Hace que el Box ocupe todo el ancho disponible
            height: "100%",
            margin: "0 auto",
          }}
        >
          {lista.length === 0 ? (
            <Loading />
          ) : (
            lista.map((producto) => (
              <div key={producto.id.toString()}>
                {/* Resto del código para mostrar los productos */}
              </div>
            ))
          )}
        </Box>
        <GridContainer>
          {lista.map((producto, index) => (
            <ProductContainer key={producto.id.toString()}>
              <CustomLink
                to={`/pantalonsdetails/${producto.id}`}
                key={producto.id.toString()}
              >
                <ImageContainer
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {producto.descuento && (
                    <DiscountBadge>{`${producto.descuento}% off`}</DiscountBadge>
                  )}
                  <Img src={producto.imagenes[0]} alt={producto.nombre} />
                  <HoverImg
                    src={producto.imagenes[1]}
                    alt={producto.nombre}
                    visible={hoveredIndex === index}
                    hasImage={producto.imagenes[1] ? true : false}
                  />

                  <ProductName>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        fontFamily: "Font2",
                        textTransform: "uppercase",
                        color: "#434343",
                        margin: "5px",
                        width: "100%",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {producto.nombre}
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
                      {producto.descuento && (
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
                            {formatPrice(producto.precio)}
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
                            {formatPrice(producto.precioConDescuento)}
                          </div>
                        </div>
                      )}
                      {/* Si no hay descuento, solo se muestra el precio */}
                      {!producto.descuento && formatPrice(producto.precio)}
                    </Typography>
                    {producto.cuotasSinInteres &&
                      producto.cuotasSinInteres > 0 &&
                      producto.montoDeCuotas && (
                        <Typography
                          sx={{
                            fontFamily: "Font2",
                            fontSize: "13px",
                            color: "#434343",
                            width: "100%",
                          }}
                        >
                          {`${producto.cuotasSinInteres} cuotas sin interés de`}{" "}
                          {formatPrice(producto.montoDeCuotas)}
                        </Typography>
                      )}
                  </ProductName>
                </ImageContainer>
              </CustomLink>
              <Stack
                spacing={2}
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "auto",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleOpenCartModal(producto)}
                  sx={{
                    backgroundColor: "black",
                    width: "100",
                    borderRadius: "0px",
                    padding: "5px 20px",
                    fontSize: "10px",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                    "@media (max-width: 760px)": {
                      fontSize: "10px",
                    },
                  }}
                >
                  AGREGAR AL CARRITO{" "}
                </Button>
              </Stack>
            </ProductContainer>
          ))}
          <ProductModal
            isOpen={isCartModalOpen}
            onClose={handleCloseCartModal}
            product={selectedProduct}
            selectedSize={selectedSize}
            color={color}
            handleSizeSelect={handleSizeSelect}
            handleChange={handleChange}
            handleAddToCart={handleAddToCart}
          />
        </GridContainer>
      </Container>
    </ThemeProvider>
  );
};

export default PantalonesPage;

const ProductContainer = styled.div`
  position: relative; /* Establecer la posición relativa para los elementos hijos posicionados absolutamente */
  flex: 0 0 calc(33.33% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
`;

const DiscountBadge = styled.div`
  position: absolute;
  font-family: Font2;
  top: 0;
  left: 0;
  z-index: 1; /* Asegura que el DiscountBadge esté por encima de las imágenes */
  background-color: #262626; /* Color de fondo del recuadro de descuento */
  color: #ffffff; /* Color del texto del recuadro de descuento */
  padding: 4px 8px; /* Espacio interior del recuadro de descuento */
  border-radius: 4px; /* Borde redondeado del recuadro de descuento */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1150px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 30px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 30px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;
const Img = styled("img")(() => ({
  width: "13.75rem", // Ancho fijo para pantallas grandes
  height: "18.75rem", // Alto fijo para pantallas grandes
  maxWidth: "100%", // Añadido para asegurarse de que la imagen no se desborde del contenedor
  marginBottom: "0px",
  objectFit: "cover", // Ajustar imagen manteniendo la relación de aspecto y cubriendo completamente el contenedor
  transition: "transform 0.5s ease",
  cursor: "pointer",
  "@media (max-width: 800px)": {
    width: "13rem", // Cambiar el ancho al 100% en dispositivos móviles
    height: "15rem", // Altura automática para mantener la relación de aspecto
  },
}));

const HoverImg = styled(Img)<{ visible: boolean, hasImage: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 1s;
  display: ${({ hasImage }) => (hasImage ? "block" : "none")};
`;

const ProductName = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
