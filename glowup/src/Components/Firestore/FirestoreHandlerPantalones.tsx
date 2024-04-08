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

export interface Pantalones {
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


const useFirestorePantalones = () => {
  const [lista, setLista] = useState<Pantalones[]>([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Pantalones"));
        const docs: Pantalones[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Pantalones;
          docs.push({ ...data, id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const eliminarPantalones = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Pantalones", id));
      setLista(lista.filter((accesorio) => accesorio.id !== id));
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const actualizarPantalones = async (id: string, datosActualizados: Partial<Pantalones>) => {
    try {
      await updateDoc(doc(db, "Pantalones", id), datosActualizados); 
      console.log("Porducto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };
  
  
  return { lista, setLista, eliminarPantalones, actualizarPantalones };
};



export default useFirestorePantalones;

