import React, { useEffect, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import appFirebase from "../../../firebase/credenciales";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import TextField from "@mui/material/TextField";
import { Box, Grid, Typography, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "styled-components";
import theme from "../../muiTheme";
import Administrador from "../Administrador";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Checkbox from "@mui/material/Checkbox";

const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const AgregarAccesorios = () => {
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [talles, setTalles] = useState<string[]>([]);
  const [colores, setColores] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();
  const [descuento, setDescuento] = useState("");
  const [precio, setPrecio] = useState("");
  const [precioConDescuento, setPrecioConDescuento] = useState("");
  const [destacado, setDestacado] = useState(false); // Nuevo estado para controlar si el producto es destacado


  const calcularPrecioConDescuento = () => {
    if (precio && descuento) {
      const precioFloat = parseFloat(precio);
      const descuentoFloat = parseFloat(descuento);
      const descuentoDecimal = descuentoFloat / 100;
      const precioConDescuento = precioFloat * (1 - descuentoDecimal);
      setPrecioConDescuento(precioConDescuento.toFixed(2));
    }
  };

  useEffect(() => {
    calcularPrecioConDescuento();
  }, [precio, descuento]);

  const handleDescuentoChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDescuento(event.target.value);
  };

  const handlePrecioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPrecio(event.target.value);
  };

  const guardarInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoadingData(true);
    const target = e.target as typeof e.target & {
      nombre: { value: string };
      precio: { value: string };
      precioConDescuento: { value: string };
      descripcion: { value: string };
      descuento: { value: string };
      cuotasSinInteres: { value: string };
      montoDeCuotas: { value: string };
    };
    const nombre = target.nombre.value;
    const precio = parseFloat(target.precio.value);
    const precioConDescuento = parseFloat(target.precioConDescuento.value);
    const descripcion = target.descripcion.value;
    const descuento = target.descuento.value
      ? parseFloat(target.descuento.value)
      : null;
    const cuotasSinInteres = target.cuotasSinInteres.value
      ? parseFloat(target.cuotasSinInteres.value)
      : null;
    const montoDeCuotas = target.montoDeCuotas.value
      ? parseFloat(target.montoDeCuotas.value)
      : null;

    const newProducto = {
      nombre: nombre,
      precio: precio,
      precioConDescuento: precioConDescuento,
      talles: talles,
      colores: colores,
      descripcion: descripcion,
      imagenes: imagenes,
      descuento: descuento,
      cuotasSinInteres: cuotasSinInteres,
      montoDeCuotas: montoDeCuotas,
      destacado: destacado, // Agregar la información sobre si el producto es destacado o no
    };

    // Agregar descuento y cuotasSinInteres al objeto newProducto solo si se proporcionan valores
    if (precioConDescuento !== null) {
      newProducto.precioConDescuento = precioConDescuento;
    }

    if (descuento !== null) {
      newProducto.descuento = descuento;
    }
    if (cuotasSinInteres !== null) {
      newProducto.cuotasSinInteres = cuotasSinInteres;
    }
    if (montoDeCuotas !== null) {
      newProducto.montoDeCuotas = montoDeCuotas;
    }

    try {
      // Agregar producto a la colección "productos"
      const productosRef = collection(db, "accesorios");
      await addDoc(productosRef, newProducto);

      // Si el producto es destacado, agregarlo también a la colección "destacados"
      if (destacado) {
        const destacadosRef = collection(db, "productos");
        await addDoc(destacadosRef, newProducto);
      }

      console.log("Producto agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
    // Limpiar los campos después de agregar el producto
    target.nombre.value = "";
    target.precio.value = "";
    target.precioConDescuento.value = "";
    target.descripcion.value = "";
    target.descuento.value = "";
    target.cuotasSinInteres.value = "";
    target.montoDeCuotas.value = "";
    setTalles([]);
    setColores([]);
    setImagenes([]);
    setLoading(false);
    setLoadingData(false);
    navigate("/administrador/accesorios"); // Redirigir al usuario a la ruta deseada
  };

  const fileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const archivoI = e.target.files[0];
      const refArchivo = ref(storage, `documentos/${archivoI.name}`);
      setLoading(true);
      await uploadBytes(refArchivo, archivoI);
      const url = await getDownloadURL(refArchivo);
      setImagenes((prevImagenes) => [...prevImagenes, url]);
      setLoading(false);
      setLoadingData(false);
    }
  };

  const eliminarImagen = (index: number) => {
    const newImagenes = [...imagenes];
    newImagenes.splice(index, 1);
    setImagenes(newImagenes);
    // Si deseas eliminar la imagen del almacenamiento en la nube, descomenta el siguiente bloque de código:
    // const imagenRef = ref(storage, `documentos/${nombre_de_la_imagen}`);
    // deleteObject(imagenRef);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: "3rem",
          display: "flex",
          "@media (max-width: 768px)": {
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
      >
        <Box
          sx={{
            width: "40%",
            marginBottom: "1rem",
            marginTop: "-2rem",
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Administrador />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "-2rem",
            padding: "10px",
          }}
        >
          <form onSubmit={guardarInfo}>
            <Typography
              variant="h6"
              sx={{
                marginTop: "1rem",
                marginBottom: "2rem",
                fontFamily: "Font1",
                display: "flex",
                justifyContent: "center",
                fontSize: "55px",
                textDecoration: "underline",
                color: "#333333",
                "@media (max-width: 768px)": {
                  fontSize: "35px",
                },
              }}
            >
               <span style={{ textDecoration: "underline", textDecorationLine: "underline", textDecorationColor: "red", marginBottom: "0.2em" }}></span>
              Agragar Accesorios
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Typography sx={{ marginRight: "0rem", fontFamily: "Font2" }}>
                ¿Querés agregar este producto a Destacados?
              </Typography>
              <Checkbox
                checked={destacado}
                onChange={(e) => setDestacado(e.target.checked)}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="nombre"
                  label=""
                  placeholder="Nombre del producto"
                  sx={{ width: "100%" }}
                  name="nombre"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="precio"
                  label=""
                  placeholder="Precio del producto"
                  sx={{ width: "100%" }}
                  name="precio"
                  value={precio}
                  onChange={handlePrecioChange} // Utiliza el controlador de eventos para actualizar el estado 'precio'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="descripcion"
                  label=""
                  placeholder="Descripción"
                  sx={{ width: "100%" }}
                  name="descripcion"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="talle"
                  label=""
                  placeholder="Talles (separados por comas)"
                  sx={{ width: "100%" }}
                  name="talle"
                  onChange={(e) => setTalles(e.target.value.split(","))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="color"
                  label=""
                  placeholder="Colores (separados por comas)"
                  sx={{ width: "100%" }}
                  name="color"
                  onChange={(e) => setColores(e.target.value.split(","))}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  type="number"
                  id="descuento"
                  label=""
                  placeholder="Descuento (sin signo %)"
                  sx={{ width: "100%" }}
                  name="descuento"
                  value={descuento}
                  onChange={handleDescuentoChange} // Utiliza el controlador de eventos para actualizar el estado 'descuento'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  id="precioConDescuento"
                  label=""
                  placeholder="Precio con descuento (sin signo $)"
                  sx={{ width: "100%" }}
                  name="precioConDescuento"
                  value={precioConDescuento} // Utiliza el estado 'precioConDescuento' para mostrar el precio con descuento
                  disabled // Deshabilita la edición del campo de precio con descuento
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  id="cuotasSinInteres"
                  label=""
                  placeholder="Cuotas sin interés"
                  sx={{ width: "100%" }}
                  name="cuotasSinInteres"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  id="montoDeCuotas"
                  label=""
                  placeholder="Monto de cuotas (sin signo $)"
                  sx={{ width: "100%" }}
                  name="montoDeCuotas"
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {imagenes.map((imagen, index) => (
                  <div key={index} style={{ marginRight: "1rem" }}>
                    <div
                      key={index}
                      style={{
                        marginRight: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{ fontFamily: "Font2" }}
                      >
                        {index === 0
                          ? "Imagen Principal"
                          : index === 1
                          ? "Imagen Secundaria"
                          : "Imagen Terciaria"}
                      </Typography>
                      <img
                        key={index}
                        src={imagen}
                        alt={`Imagen ${index}`}
                        style={{
                          width: "200px",
                          height: "300px",
                          margin: "5px",
                          marginBottom: "1rem",
                        }}
                      />
                      <Tooltip title="Eliminar">
                        <DeleteIcon
                          onClick={() => eliminarImagen(index)}
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            marginTop: "0.5rem",
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <input
                  type="file"
                  id="file"
                  name="file"
                  style={{ display: "none" }}
                  onChange={fileHandler}
                />
                <label htmlFor="file" style={{ cursor: "pointer" }}>
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      color: "white",
                      width: "100%",
                      marginTop: "0rem",
                      marginBottom: "1rem",
                      background:
                        "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
                      "&:hover": {
                        background:
                          "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
                      },
                      "@media (max-width: 768px)": {
                        width: "100%",
                      },
                    }}
                  >
                    Agregar imagen{" "}
                    <CloudUploadIcon
                      style={{ cursor: "pointer", marginLeft: "1rem" }}
                    />
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      width: "100%",
                      background:
                        "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
                      "&:hover": {
                        background:
                          "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
                      },
                    }}
                  >
                    Guardar
                  </Button>
                </label>
              </Grid>
            </Grid>
          </form>
          <Modal
            open={loading}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                borderRadius: "10px",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Cargando imagen...
              </Typography>
              <CircularProgress sx={{ color: "black" }} />
            </Box>
          </Modal>
          <Modal
            open={loadingData}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                borderRadius: "10px",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Guardando producto...
              </Typography>
              <CircularProgress sx={{ color: "black" }} />
            </Box>
          </Modal>
        </Box>
      </Box>
    </ThemeProvider>
  );
};


export default AgregarAccesorios;
