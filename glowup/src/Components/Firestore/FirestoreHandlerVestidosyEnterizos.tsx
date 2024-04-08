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

export interface VestidosyEnterizos {
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


const useFirestoreVestidosyEnterizos = () => {
  const [lista, setLista] = useState<VestidosyEnterizos[]>([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Vestidos y enterizos"));
        const docs: VestidosyEnterizos[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as VestidosyEnterizos;
          docs.push({ ...data, id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const eliminarVestidosyEnterizos = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Vestidos y enterizos", id));
      setLista(lista.filter((accesorio) => accesorio.id !== id));
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const actualizarVestidosyEnterizos = async (id: string, datosActualizados: Partial<VestidosyEnterizos>) => {
    try {
      await updateDoc(doc(db, "Vestidos y enterizos", id), datosActualizados); 
      console.log("Porducto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };
  
  
  return { lista, setLista, eliminarVestidosyEnterizos, actualizarVestidosyEnterizos };
};



export default useFirestoreVestidosyEnterizos;

