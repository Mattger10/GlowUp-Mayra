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

export interface Corset {
  id: string;
  nombre: string;
  precio: number;
  precioConDescuento: number;
  talles: string[];
  colores: string[];
  descripcion: string;
  imagenes: string[];
  selectedSize?: string;
  descuento?: number; 
  cuotasSinInteres?: number; 
  montoDeCuotas?: number;
}


const useFirestoreCorset = () => {
  const [lista, setLista] = useState<Corset[]>([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Corset"));
        const docs: Corset[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Corset;
          docs.push({ ...data, id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const eliminarCorset = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Corset", id));
      setLista(lista.filter((accesorio) => accesorio.id !== id));
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const actualizarCorset = async (id: string, datosActualizados: Partial<Corset>) => {
    try {
      await updateDoc(doc(db, "Corset", id), datosActualizados); 
      console.log("Porducto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };
  
  return { lista, setLista, eliminarCorset, actualizarCorset };
};



export default useFirestoreCorset;

