import  { useEffect, useState } from "react";
import appFirebase from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore(appFirebase);

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  precioConDescuento: number;
  talles: string[];
  colores: string[];
  descripcion: string;
  imagenes: string[];
  selectedSize?: string;
  color?: string;
  descuento?: number; // Porcentaje de descuento (ej. 10 para 10% de descuento)
  cuotasSinInteres?: number; // Número de cuotas sin interés (ej. 3 para 3 cuotas sin interés)
  montoDeCuotas?: number;
}


const useFirestoreProductos = () => {
  const [lista, setLista] = useState<Producto[]>([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const docs: Producto[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Producto;
          docs.push({ ...data, id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const eliminarProducto = async (id: string) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setLista(lista.filter((producto) => producto.id !== id));
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const actualizarProducto = async (id: string, datosActualizados: Partial<Producto>) => {
    try {
      await updateDoc(doc(db, "productos", id), datosActualizados);
      console.log("Producto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return { lista, setLista, eliminarProducto, actualizarProducto };
};

export default useFirestoreProductos;

