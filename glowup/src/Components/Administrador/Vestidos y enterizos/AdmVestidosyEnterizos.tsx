import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Box,
  } from "@mui/material";
  import useFirestoreVestidosyEnterizos, {
    VestidosyEnterizos,
  } from "../../Firestore/FirestoreHandlerVestidosyEnterizos";
  import { Link } from "react-router-dom";
  import Administrador from "../Administrador";
  import AddIcon from "@mui/icons-material/Add";
  import { Tooltip } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import styled from "styled-components";
  import { getFirestore, deleteDoc, doc } from "firebase/firestore";
  import appFirebase from "../../../firebase/credenciales";
  
  const db = getFirestore(appFirebase);
  
  const AdmVestidosyEnterizos = () => {
    const { lista, setLista } = useFirestoreVestidosyEnterizos();
  
    const eliminarProducto = async (id: string) => {
      try {
        await deleteDoc(doc(db, "Tops y remeras", id));
        setLista(lista.filter((producto) => producto.id !== id));
        console.log("Producto eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    };
  
    const confirmarEliminarProducto = async (id: string) => {
      if (
        window.confirm("¿Estás seguro de que quieres eliminar este producto?")
      ) {
        await eliminarProducto(id);
      }
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
        <Box
          sx={{
            width: "25%",
            marginBottom: "1rem",
            marginTop: "-2rem",
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Administrador />
        </Box>
        <Box sx={{ width: "100%", marginTop: "-2rem" }}>
          <Box
            sx={{
              width: "100%",
              marginTop: "-2rem",
              display: "flex",
              justifyContent: "flex-end", // Alinea los elementos hacia la derecha
              "@media (max-width: 768px)": {
                justifyContent: "center", // Alinea los elementos hacia la derecha
              },
            }}
          >
            <Link to="/administrador/agregarvestidosyenterizos">
              <Button
                sx={{
                  color: "white",
                  width: "80%", // Ancho del botón
                  marginTop: "3rem",
                  marginBottom: "1rem",
                  marginRight: "5rem",
                  background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
                  "&:hover": {
                    background: "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
                  },
                }}
              >
                Agregar productos{" "}
                <AddIcon sx={{ fontSize: "25px", marginLeft: "1rem" }} />{" "}
              </Button>
            </Link>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: "5%" }}>
                    Imágenes
                  </TableCell>
                  <TableCell align="center" sx={{ width: "5%" }}>
                    Nombre
                  </TableCell>
                  <TableCell align="center" sx={{ width: "5%" }}>
                    Precio
                  </TableCell>
                  <TableCell align="center" sx={{ width: "5%" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lista.map((producto: VestidosyEnterizos) => (
                  <TableRow key={producto.id}>
                    <TableCell align="center" sx={{ width: "5%" }}>
                      <Img src={producto.imagenes[0]} alt={producto.nombre} />
                    </TableCell>
                    <TableCell align="center" sx={{ width: "5%" }}>
                      <Typography>{producto.nombre}</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "5%" }}>
                      <Typography> {formatPrice(producto.precio)}</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        verticalAlign: "center",
                        width: "5%",
                      }}
                    >
                      <>
                        <Link
                          to={`/administrador/editvestidosyenterizos/${producto.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Tooltip title="Editar">
                            <EditIcon
                              sx={{
                                marginRight: "0rem",
                                cursor: "pointer",
                                color: "#000",
                              }}
                            />
                          </Tooltip>
                        </Link>
  
                        <Tooltip title="Eliminar">
                          <DeleteIcon
                            onClick={() => confirmarEliminarProducto(producto.id)}
                            sx={{ cursor: "pointer", marginLeft: "1rem" }}
                          />
                        </Tooltip>
                      </>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };
  
  export default AdmVestidosyEnterizos;
  
  const Img = styled("img")(() => ({
    width: "60px",
    height: "80px",
    objectFit: "cover",
    marginBottom: "0px",
    transition: "transform 0.5s ease",
    cursor: "pointer",
    marginRight: "1rem",
  }));
  