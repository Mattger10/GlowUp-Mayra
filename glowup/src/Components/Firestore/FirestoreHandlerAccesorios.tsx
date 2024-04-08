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

export interface Accesorios {
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


const useFirestoreAccesorios = () => {
  const [lista, setLista] = useState<Accesorios[]>([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accesorios"));
        const docs: Accesorios[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Accesorios;
          docs.push({ ...data, id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const eliminarAccesorio = async (id: string) => {
    try {
      await deleteDoc(doc(db, "accesorios", id));
      setLista(lista.filter((accesorio) => accesorio.id !== id));
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const actualizarAccesorio = async (id: string, datosActualizados: Partial<Accesorios>) => {
    try {
      await updateDoc(doc(db, "accesorios", id), datosActualizados); 
      console.log("Accesorio actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el accesorio:", error);
    }
  };
  
  return { lista, setLista, eliminarAccesorio, actualizarAccesorio };
};

export default useFirestoreAccesorios;

