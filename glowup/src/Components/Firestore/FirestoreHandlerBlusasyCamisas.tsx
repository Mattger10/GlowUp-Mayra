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

export interface BlusasyCamisas {
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


const useFirestoreBlusasyCamisas = () => {
  const [lista, setLista] = useState<BlusasyCamisas[]>([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Blusas y camisas"));
        const docs: BlusasyCamisas[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as BlusasyCamisas;
          docs.push({ ...data, id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const eliminarBlusasyCamisas = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Blusas y camisas", id));
      setLista(lista.filter((accesorio) => accesorio.id !== id));
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const actualizarBlusasyCamisas = async (id: string, datosActualizados: Partial<BlusasyCamisas>) => {
    try {
      await updateDoc(doc(db, "Blusas y camisas", id), datosActualizados); 
      console.log("Porducto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };
  
  return { lista, setLista, eliminarBlusasyCamisas, actualizarBlusasyCamisas };
};



export default useFirestoreBlusasyCamisas;

