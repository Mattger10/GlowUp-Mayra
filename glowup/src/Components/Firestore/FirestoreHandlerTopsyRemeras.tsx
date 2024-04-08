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

export interface TopsyRemeras {
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


const useFirestoreTopsyRemeras = () => {
  const [lista, setLista] = useState<TopsyRemeras[]>([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Tops y remeras"));
        const docs: TopsyRemeras[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as TopsyRemeras;
          docs.push({ ...data, id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const eliminarTopsyRemeras = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Tops y remeras", id));
      setLista(lista.filter((accesorio) => accesorio.id !== id));
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const actualizarTopsyRemeras = async (id: string, datosActualizados: Partial<TopsyRemeras>) => {
    try {
      await updateDoc(doc(db, "Tops y remeras", id), datosActualizados); 
      console.log("Porducto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };
  
  
  return { lista, setLista, eliminarTopsyRemeras, actualizarTopsyRemeras };
};



export default useFirestoreTopsyRemeras;

