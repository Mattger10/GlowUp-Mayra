import { FunctionComponent, useState } from "react";
import useFirestoreProductos, {
  Producto,
} from "../Components/Firestore/FirestoreHandler";
import useFirestoreAccesorios, {
  Accesorios,
} from "../Components/Firestore/FirestoreHandlerAccesorios";
import useFirestoreBlusasyCamisas, {
  BlusasyCamisas,
} from "../Components/Firestore/FirestoreHandlerBlusasyCamisas";
import useFirestorePantalones, {
  Pantalones,
} from "../Components/Firestore/FirestoreHandlerPantalones";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "../Components/muiTheme";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import Loading from "./Loading";
import ProductModal from "./Modal";
import { SelectChangeEvent } from "@mui/material/Select";

interface ComponenteConDescuentoProps {
  addToCart: (product: Accesorios | Producto | BlusasyCamisas) => void;
}

const ComponenteConDescuento: FunctionComponent<
  ComponenteConDescuentoProps
> = ({ addToCart }) => {
  const { lista: productosConDescuento } = useFirestoreProductos();
  const { lista: accesoriosConDescuento } = useFirestoreAccesorios();
  const { lista: blusasycamisasConDescuento } = useFirestoreBlusasyCamisas();
  const { lista: pantalonesConDescuento } = useFirestorePantalones();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Accesorios | Producto | BlusasyCamisas | Pantalones | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const handleOpenCartModal = (product: Accesorios | Producto | BlusasyCamisas | Pantalones) => {
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

  // Filtrar productos con descuento
  const productosFiltrados: Producto[] = productosConDescuento.filter(
    (producto: Producto) => producto.descuento && producto.descuento > 0
  );

  // Filtrar accesorios con descuento
  const accesoriosFiltrados: Accesorios[] = accesoriosConDescuento.filter(
    (accesorio: Accesorios) => accesorio.descuento && accesorio.descuento > 0
  );

  const blusasycamisasFiltrados: BlusasyCamisas[] = blusasycamisasConDescuento.filter(
    (blusasycamisas: BlusasyCamisas) => blusasycamisas.descuento && blusasycamisas.descuento > 0
  );

  const pantalonesFiltrados: Pantalones[] = pantalonesConDescuento.filter(
    (pantalones: Pantalones) => pantalones.descuento && pantalones.descuento > 0
  );

  // Fusionar y ordenar productos y accesorios por nombre
  // const productosYAccesorios: (Producto | Accesorios | BlusasyCamisas | Pantalones)[] = [
  //   ...productosFiltrados,
  //   ...accesoriosFiltrados,
  //   ...blusasycamisasFiltrados,
  //   ...pantalonesFiltrados
  // ].sort((a, b) => (a.nombre > b.nombre ? 1 : -1));

  const formatPrice = (price: number) => {
    const formattedPrice = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    return formattedPrice;
  };

  const getUrl = (item: Producto | Accesorios) => {
    if ('tipo' in item && item.tipo === 'Accesorio') {
      return `/accesoriosdetails/${item.id}`;
    } else {
      return `/details/${item.id}`;
    }
  };

  // Fusionar y ordenar productos y accesorios por nombre
const productosYAccesoriosSet = new Set<string>(); // Usamos un conjunto para almacenar nombres únicos
const productosYAccesorios: (Producto | Accesorios | BlusasyCamisas | Pantalones)[] = [];

productosFiltrados.forEach((producto: Producto) => {
  if (!productosYAccesoriosSet.has(producto.nombre)) {
    productosYAccesoriosSet.add(producto.nombre);
    productosYAccesorios.push(producto);
  }
});

accesoriosFiltrados.forEach((accesorio: Accesorios) => {
  if (!productosYAccesoriosSet.has(accesorio.nombre)) {
    productosYAccesoriosSet.add(accesorio.nombre);
    productosYAccesorios.push(accesorio);
  }
});

blusasycamisasFiltrados.forEach((blusasycamisas: BlusasyCamisas) => {
  if (!productosYAccesoriosSet.has(blusasycamisas.nombre)) {
    productosYAccesoriosSet.add(blusasycamisas.nombre);
    productosYAccesorios.push(blusasycamisas);
  }
});

pantalonesFiltrados.forEach((pantalones: Pantalones) => {
  if (!productosYAccesoriosSet.has(pantalones.nombre)) {
    productosYAccesoriosSet.add(pantalones.nombre);
    productosYAccesorios.push(pantalones);
  }
});

// Ordenar la lista final por nombre
productosYAccesorios.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));


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
          {productosYAccesorios.length === 0 ? (
            <Loading />
          ) : (
            productosYAccesorios.map((producto) => (
              <div key={producto.id.toString()}>
                {/* Resto del código para mostrar los productos */}
              </div>
            ))
          )}
        </Box>
        <GridContainer>
          {productosYAccesorios.map((item: Producto | Accesorios, index) => (
            <ProductContainer key={item.id.toString()}>
              <CustomLink to={getUrl(item)} key={item.id.toString()}>
                <ImageContainer
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.descuento && (
                    <DiscountBadge>{`${item.descuento}% off`}</DiscountBadge>
                  )}
                  <Img src={item.imagenes[0]} alt={item.nombre} />
                  <HoverImg
                    src={item.imagenes[1]}
                    alt={item.nombre}
                    visible={hoveredIndex === index}
                    hasImage={item.imagenes[1] ? true : false}
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
                      {item.nombre}
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
                      {item.descuento && (
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
                            {formatPrice(item.precio)}
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
                            {formatPrice(item.precioConDescuento)}
                          </div>
                        </div>
                      )}
                      {/* Si no hay descuento, solo se muestra el precio */}
                      {!item.descuento && formatPrice(item.precio)}
                    </Typography>
                    {item.cuotasSinInteres &&
                      item.cuotasSinInteres > 0 &&
                      item.montoDeCuotas && (
                        <Typography
                          sx={{
                            fontFamily: "Font2",
                            fontSize: "13px",
                            color: "#434343",
                            width: "100%",
                          }}
                        >
                          {`${item.cuotasSinInteres} cuotas sin interés de`}{" "}
                          {formatPrice(item.montoDeCuotas)}
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
                  onClick={() => handleOpenCartModal(item)}
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

export default ComponenteConDescuento;

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

const HoverImg = styled(Img)<{ visible: boolean; hasImage: boolean }>`
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
