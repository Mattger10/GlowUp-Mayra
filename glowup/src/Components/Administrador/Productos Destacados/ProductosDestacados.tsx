import React, { useEffect, useState } from "react";
import appFirebase from "../../../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Tooltip, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AddIcon from "@mui/icons-material/Add";
import Administrador from "../Administrador";

const db = getFirestore(appFirebase);

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  talles: string[];
  colores: string[];
  descripcion: string;
  imagenes: string[]; // Actualizado para incluir el array de imágenes
  descuento: string;
  cuotasSinInteres: string;
  montoDeCuotas: number;
}

const ProductosDestacados: React.FC = () => {
  const [lista, setLista] = useState<Producto[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProductName, setEditingProductName] = useState<string>("");
  const [editingProductPrice, setEditingProductPrice] = useState<number>(0);
  const [editingProductImages, setEditingProductImages] = useState<string[]>(
    []
  );
  const [uploadingImage, setUploadingImage] = useState<string>("");
  const [editingProductSizes, setEditingProductSizes] = useState<string[]>([]);
  const [editingProductColors, setEditingProductColors] = useState<string[]>(
    []
  );
  const [editingProductDescription, setEditingProductDescription] =
    useState<string>("");
  const [editingProductDescuento, setEditingProductDescuento] =
    useState<string>("");
  const [editingProductCuotasSinInteres, setEditingProductCuotasSinInteres] =
    useState<string>("");
  const [editingProductMontoDeCuotas, setEditingProductMontoDeCuotas] =
    useState<number>(0);

  const editarProducto = (
    id: string,
    nombre: string,
    precio: number,
    imagenes: string[],
    talles: string[],
    colores: string[],
    descripcion: string,
    descuento: string,
    cuotasSinInteres: string,
    montoDeCuotas: number
  ) => {
    setEditingProductId(id);
    setEditingProductName(nombre);
    setEditingProductPrice(precio);
    setEditingProductImages(imagenes);
    setEditingProductSizes(talles);
    setEditingProductColors(colores);
    setEditingProductDescription(descripcion);
    setEditingProductDescuento(descuento);
    setEditingProductCuotasSinInteres(cuotasSinInteres);
    setEditingProductMontoDeCuotas(montoDeCuotas);
  };

  const guardarCambios = async () => {
    try {
      await updateDoc(doc(db, "productos", editingProductId || ""), {
        nombre: editingProductName,
        precio: editingProductPrice,
        imagenes: editingProductImages,
        talles: editingProductSizes,
        colores: editingProductColors,
        descripcion: editingProductDescription,
        descuento: editingProductDescuento,
        cuotasSinInteres: editingProductCuotasSinInteres,
        montoDeCuotas: editingProductMontoDeCuotas,
      });
      console.log("Producto actualizado correctamente");
      setEditingProductId(null);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const docs: Producto[] = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...(doc.data() as Producto), id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const confirmarEliminarProducto = async (id: string) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      await eliminarProducto(id);
    }
  };

  const eliminarProducto = async (id: string) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setLista(lista.filter((producto) => producto.id !== id));
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...editingProductImages];
    updatedImages.splice(index, 1);
    setEditingProductImages(updatedImages);
  };

  const uploadImageToFirestore = async (file: File): Promise<string> => {
    const storage = getStorage(appFirebase);
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(file.name);

      try {
        const imageURL = await uploadImageToFirestore(file);
        setEditingProductImages([...editingProductImages, imageURL]);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }

      setUploadingImage("");
    }
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
      <TableContainer component={Paper}>
        <Box
          sx={{
            width: "30%",
            marginBottom: "1rem",
            marginTop: "-2rem",
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Administrador />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <h1>component productos destacados</h1>
          <Link to="/agregarproductosdestacados">
            <Button
              sx={{
                color: "white",
                width: "100%",
                marginTop: "3rem",
                marginBottom: "1rem",
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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Imágenes
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Título
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Precio
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Talles
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Colores
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Descripción
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Descuento
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Cuotas
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Monto de cuotas
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid black" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: "1px solid black" }}>
            {lista.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="center" sx={{ border: "1px solid black" }}>
                  {editingProductId === product.id ? (
                    <>
                      {editingProductImages.map((image, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Img src={image} alt="" />
                          <Button
                            onClick={() => handleImageDelete(index)}
                            sx={{
                              color: "white",
                              width: "10%",
                              marginBottom: "1rem",
                              background:
                                "linear-gradient(to bottom, #6d6d6d, #000000)", // Degradado de gris a negro
                              "&:hover": {
                                background:
                                  "linear-gradient(to bottom, #5d5d5d, #000000)", // Puedes cambiar el color que desees para el hover
                              },
                            }}
                          >
                            X
                          </Button>
                        </Box>
                      ))}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        id={`upload-image-${product.id}`}
                      />
                      <label htmlFor={`upload-image-${product.id}`}>
                        <CloudUploadIcon style={{ cursor: "pointer" }} />
                      </label>
                      {uploadingImage && uploadingImage === product.id && (
                        <span>Uploading...</span>
                      )}
                    </>
                  ) : (
                    product.imagenes &&
                    product.imagenes.map((image, index) => (
                      <Img key={index} src={image} alt="" />
                    ))
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ verticalAlign: "center", border: "1px solid black" }}
                >
                  {editingProductId === product.id ? (
                    <TextField
                      type="text"
                      value={editingProductName}
                      onChange={(e) => setEditingProductName(e.target.value)}
                    />
                  ) : (
                    <Typography>{product.nombre} </Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ verticalAlign: "center", border: "1px solid black" }}
                >
                  {editingProductId === product.id ? (
                    <TextField
                      type="number"
                      value={editingProductPrice}
                      onChange={(e) =>
                        setEditingProductPrice(parseFloat(e.target.value))
                      }
                    />
                  ) : (
                    <Typography>${product.precio}</Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ verticalAlign: "center", border: "1px solid black" }}
                >
                  {editingProductId === product.id ? (
                    <TextField
                      type="text"
                      value={editingProductSizes.join(",")}
                      onChange={(e) =>
                        setEditingProductSizes(e.target.value.split(","))
                      }
                    />
                  ) : (
                    <Typography> {product.talles?.join(", ")}</Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ verticalAlign: "center", border: "1px solid black" }}
                >
                  {editingProductId === product.id ? (
                    <TextField
                      type="text"
                      value={editingProductColors.join(",")}
                      onChange={(e) =>
                        setEditingProductColors(e.target.value.split(","))
                      }
                    />
                  ) : (
                    <Typography>{product.colores?.join(", ")} </Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    verticalAlign: "center",
                    width: "20%",
                    textAlign: "left",
                    border: "1px solid black",
                  }}
                >
                  {editingProductId === product.id ? (
                    <TextareaAutosize
                      aria-label="textarea"
                      placeholder="Descripción"
                      defaultValue="Contenido inicial"
                      value={editingProductDescription}
                      onChange={(e) =>
                        setEditingProductDescription(e.target.value)
                      }
                      style={{ height: "auto", width: "100%" }}
                    />
                  ) : (
                    // <TextField
                    //   type="text"
                    //   value={editingProductDescription}
                    //   onChange={(e) =>
                    //     setEditingProductDescription(e.target.value)
                    //   }
                    // />
                    <Typography>{product.descripcion} </Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    verticalAlign: "center",
                    width: "10%",
                    textAlign: "center",
                    border: "1px solid black",
                  }}
                >
                  {editingProductId === product.id ? (
                    <TextField
                      type="text"
                      value={editingProductDescuento}
                      onChange={(e) =>
                        setEditingProductDescuento(e.target.value)
                      }
                    />
                  ) : (
                    <Typography>{product.descuento} %</Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    verticalAlign: "center",
                    width: "10%",
                    textAlign: "center",
                    border: "1px solid black",
                  }}
                >
                  {editingProductId === product.id ? (
                    <TextField
                      type="text"
                      value={editingProductCuotasSinInteres}
                      onChange={(e) =>
                        setEditingProductCuotasSinInteres(e.target.value)
                      }
                    />
                  ) : (
                    <Typography>
                      {product.cuotasSinInteres} cuotas sin interés
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ verticalAlign: "center", border: "1px solid black" }}
                >
                  {editingProductId === product.id ? (
                    <TextField
                      type="number"
                      value={editingProductMontoDeCuotas}
                      onChange={(e) =>
                        setEditingProductMontoDeCuotas(
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  ) : (
                    <Typography>${product.montoDeCuotas}</Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    verticalAlign: "center",
                    border: "1px solid black",
                    width: "7%",
                  }}
                >
                  {editingProductId === product.id ? (
                    <Button onClick={guardarCambios}>Guardar</Button>
                  ) : (
                    <>
                      <Tooltip title="Editar">
                        <EditIcon
                          onClick={() =>
                            editarProducto(
                              product.id,
                              product.nombre,
                              product.precio,
                              product.imagenes,
                              product.talles,
                              product.colores,
                              product.descripcion,
                              product.descuento,
                              product.cuotasSinInteres,
                              product.montoDeCuotas
                            )
                          }
                          sx={{ marginRight: "0rem", cursor: "pointer" }}
                        />
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <DeleteIcon
                          onClick={() => confirmarEliminarProducto(product.id)}
                          sx={{ cursor: "pointer", marginLeft: "1rem" }}
                        />
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductosDestacados;

const Img = styled("img")(() => ({
  width: "100%",
  maxWidth: "70px",
  height: "70px",
  objectFit: "cover",
  marginBottom: "0px",
  transition: "transform 0.5s ease",
  cursor: "pointer",
  marginRight: "1rem",
}));
