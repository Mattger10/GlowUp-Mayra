import React, { useState, useEffect, FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Corset } from "../../Firestore/FirestoreHandlerCorset";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  Tooltip,
  Checkbox,
} from "@mui/material";
import useFirestoreCorset from "../../Firestore/FirestoreHandlerCorset";
import Administrador from "../Administrador";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import appFirebase from "../../../firebase/credenciales";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModalLoadingImage from "../../Modals/ModalLoadingImage";
import ModalSavedData from "../../Modals/ModalSavedData";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  getFirestore,
  collection as firestoreCollection,
} from "firebase/firestore";

const db = getFirestore(appFirebase);


interface EditCorsetProps {}

const EditCorset: FunctionComponent<EditCorsetProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { lista, actualizarCorset } = useFirestoreCorset();
  const [formData, setFormData] = useState<Partial<Corset>>({
    imagenes: [], // Inicialmente no hay imágenes
  });
  const storage = getStorage(appFirebase);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [subirDatos, setSubirDatos] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true);
    const files = e.target.files;
    if (files && files[0]) {
      const imageFile = files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target) {
          try {
            const imageDataUrl = event.target.result as string;
            const storageRef = ref(storage, `images/${imageFile.name}`);
            await uploadString(storageRef, imageDataUrl, "data_url");
            const imageUrl = await getDownloadURL(storageRef);
            setFormData((prevData) => ({
              ...prevData,
              imagenes: [...(prevData.imagenes || []), imageUrl],
            }));
          } catch (error) {
            console.error("Error al subir la imagen:", error);
          } finally {
            setLoadingImage(false); // Establecer loadingImage en false después de cargar la imagen (incluso en caso de error)
          }
        }
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prevData) => {
      if (!prevData || !prevData.imagenes) {
        return prevData;
      }
      const updatedImages = prevData.imagenes.filter((_, i) => i !== index);
      return {
        ...prevData,
        imagenes: updatedImages,
      };
    });
  };

  useEffect(() => {
    const corset = lista.find((producto) => producto.id === id);
    if (corset) {
      setFormData((prevData) => ({
        ...prevData,
        ...corset,
        colores: Array.isArray(corset.colores) ? corset.colores : [],
        talles: Array.isArray(corset.talles) ? corset.talles : [],
      }));
    }
  }, [id, lista]);

  //   useEffect(() => {
  //     // Llama a actualizarProducto cada vez que formData cambie
  //     if (id && formData) {
  //       actualizarAccesorio(id, formData);
  //     }
  //   }, [id, formData, actualizarAccesorio]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "colores" || name === "talles") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!id) {
      console.error("ID no válido");
      return;
    }

    // Subir datos a "productos" solo si el checkbox está seleccionado
    if (subirDatos) {
      try {
        // Agregar un nuevo documento a la colección "productos"
        await addDoc(firestoreCollection(db, "productos"), formData);
        console.log(
          "Nuevo producto agregado a la colección 'productos' correctamente"
        );
      } catch (error) {
        console.error(
          "Error al agregar el nuevo producto a la colección 'productos':",
          error
        );
      }
    }

    // Actualizar "Pantalones" siempre
    await actualizarCorset(id, formData);

    // Limpiar el estado de formData después de guardar cambios
    setFormData({
      imagenes: [],
    });
    setLoading(false);
    navigate("/administrador/corsetybody"); // Redirigir al usuario a la ruta deseada
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
        <form onSubmit={handleSubmit}>
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
            Editar "{formData.nombre}"
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
              checked={subirDatos}
              onChange={(e) => setSubirDatos(e.target.checked)}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="nombre"
                label="Nombre"
                variant="outlined"
                value={formData.nombre || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="precio"
                label="Precio (sin signo $)"
                type="number"
                variant="outlined"
                value={formData.precio || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="descripcion"
                label="Descripcion"
                variant="outlined"
                value={formData.descripcion || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="descuento"
                label="Descuento (sin signo %)"
                variant="outlined"
                value={formData.descuento || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="precioConDescuento"
                label="Precio con descuento (sin signo $)"
                type="number"
                variant="outlined"
                value={formData.precioConDescuento || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="cuotasSinInteres"
                label="Cuotas sin sinterés (sin signo $)"
                variant="outlined"
                value={formData.cuotasSinInteres || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="montoDeCuotas"
                label="Monto de cuotas (sin signo $)"
                variant="outlined"
                value={formData.montoDeCuotas || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="talles"
                label="Talles (separados por comas)"
                variant="outlined"
                value={formData.talles ? formData.talles.join(", ") : ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="colores"
                label="Colores (separados por comas)"
                variant="outlined"
                value={formData.colores ? formData.colores.join(", ") : ""}
                onChange={handleChange}
                fullWidth
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
              {formData.imagenes &&
                formData.imagenes.map((imagen, index) => (
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

                      <Img src={imagen} alt={`Imagen ${index}`} />
                      <Tooltip title="Eliminar">
                        <DeleteIcon
                          onClick={() => handleRemoveImage(index)}
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
            {/* <Grid item xs={12}>
            <input type="file" onChange={handleImageChange} />
          </Grid> */}
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
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id={`upload-image-${formData.id}`}
                multiple // Para permitir la carga de múltiples imágenes
              />
              <label htmlFor={`upload-image-${formData.id}`}>
                <Button
                  sx={{
                    color: "white",
                    width: "100%",
                    marginTop: "0rem",
                    marginBottom: "1rem",
                    background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
                    "&:hover": {
                      background:
                        "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
                    },
                    "@media (max-width: 768px)": {
                      width: "100%",
                    },
                  }}
                  onClick={() => {
                    const element = document.getElementById(
                      `upload-image-${formData.id}`
                    );
                    if (element) {
                      element.click();
                    }
                  }}
                >
                  Agregar imagen
                  <CloudUploadIcon
                    style={{ cursor: "pointer", marginLeft: "1rem" }}
                  />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    color: "white",
                    width: "100%",
                    marginTop: "0rem",
                    marginBottom: "1rem",
                    background: "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
                    "&:hover": {
                      background:
                        "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
                    },
                    "@media (max-width: 768px)": {
                      width: "100%",
                    },
                  }}
                >
                  Guardar
                </Button>
              </label>
            </Grid>
          </Grid>
        </form>
      </Box>
      <ModalLoadingImage isOpen={loadingImage} />
      <ModalSavedData isOpen={loading} />
    </Box>
  );
};


export default EditCorset;

const Img = styled("img")(() => ({
  width: "10rem",
  height: "13rem",
  objectFit: "cover",
  marginBottom: "0px",
  transition: "transform 0.5s ease",
  cursor: "pointer",
  marginRight: "1rem",
  border: "1px solid #000",
  borderRadius: "5px",
}));
