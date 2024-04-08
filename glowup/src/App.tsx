import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./Components/Details";
import Topsyremeras from "./Components/Topsyremeras";
import TopsDetails from "./Components/TopsyremerasDetails";
import Corset from "./Components/Corset";
import CorsetDetails from "./Components/CorsetDetails";
import NavBar from "./Components/NavBar";
import Ofertas from "./Components/Ofertas";
import Carrusel from "./Components/Carrusel";
import Productos from "./Components/Productos";
import Abajo from "./Components/Abajo";
import Vestidos from "./Components/Vestidos";
import { useState } from "react";
import Accesorios from "./Components/Accesorios";
import AccesoriosDetails from "./Components/AccesoriosDetails";
import Blusas from "./Components/Blusas";
import BlusasDetails from "./Components/BlusasDetails";
import Administrador from "./Components/Administrador/Administrador";
import EditDestacados from "./Components/Administrador/Productos Destacados/EditDestacados";
import AgregarProductosDestacados from "./Components/Administrador/Productos Destacados/AgregarProductosDestacados";
import AdmAccesorios from "./Components/Administrador/Accesorios/Accesorios";
import EditAccesorios from "./Components/Administrador/Accesorios/EditAccesorios";
import AgregarAccesorios from "./Components/Administrador/Accesorios/AgregarAccesorios";
import ComponenteConDescuento from "./Components/Descuentos";
import AdmProductosDestacados from "./Components/Administrador/Productos Destacados/AdmProductosDestacados";
import Contacto from "./Components/Contacto";
import Mercadopago from "./Components/Mercadopago";
import AdmBlusasyCamisas from "./Components/Administrador/Blusas y camisas/AdmBlusasyCamisas";
import Agregarblusasycamisas from "./Components/Administrador/Blusas y camisas/AgregarBlusasyCamisas";
import EditBlusasyCamisas from "./Components/Administrador/Blusas y camisas/EditBlusasyCamisas";
import AdmCorset from "./Components/Administrador/Corset y Body/AdmCorset";
import AgregarCorset from "./Components/Administrador/Corset y Body/AgregarCorset";
import EditCorset from "./Components/Administrador/Corset y Body/EditCorset";
import PantalonesPage from "./Components/Pantalones";
import PantalonesDetails from "./Components/PantalonesDetails";
import AdmPantalones from "./Components/Administrador/Pantalones/AdmiPantalones";
import AgregarPantalones from "./Components/Administrador/Pantalones/AgregarPantalones";
import EditPantalones from "./Components/Administrador/Pantalones/EditPantalones";
import AdmTopsyRemeras from "./Components/Administrador/Tops y remeras/AdmTopsyRemeras";
import AgregarTopsyRemeras from "./Components/Administrador/Tops y remeras/AgregarTopsyRemeras";
import EditTopsyRemeras from "./Components/Administrador/Tops y remeras/EditTopsyRemeras";
import AdmVestidosyEnterizos from "./Components/Administrador/Vestidos y enterizos/AdmVestidosyEnterizos";
import AgregarVestidosyEnterizos from "./Components/Administrador/Vestidos y enterizos/AgregarVestidosyEnterizos";
import EditVestidosyEnterizos from "./Components/Administrador/Vestidos y enterizos/EditVestidosyEnterizos";
import VestidosyEnterizosDetails from "./Components/VestidosDetails";
import { Producto } from "./Components/Firestore/FirestoreHandler";



function App() {
  const imagenes = ["/portada1.jpg", "/portada2.jpg", "/portada3.jpg"];

  const [cartItems, setCartItems] = useState<Producto[]>([]);

  const addToCart = (product: Producto) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (productId: string) => {
    // Filtra los elementos del carrito y elimina el producto correspondiente
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    // Actualiza el estado del carrito llamando a la función proporcionada por el padre
    setCartItems(updatedCartItems);
  };

  return (
    <Router>
      <NavBar cartItems={cartItems} removeFromCart={handleRemoveFromCart} />
      <Routes>
        //Secciones: 

        // Inicio
        <Route path="/" element={ <> <Carrusel images={imagenes} /> <Ofertas /> <Productos addToCart={addToCart} /> </> } />
        <Route path="/details/:id" element={<Details addToCart={addToCart} />} />

        //Accesorios 
        <Route path="/accesorios" element={<Accesorios addToCart={addToCart} />} />
        <Route path="/accesoriosdetails/:id" element={<AccesoriosDetails addToCart={addToCart} />} />
        
        //Blusas y camisas
        <Route path="/blusasdetails/:id" element={<BlusasDetails addToCart={addToCart} />} />
        <Route path="/blusas" element={<Blusas addToCart={addToCart} />} />

        //Corset y Body
        <Route path="/corset" element={<Corset addToCart={addToCart} />} />
        <Route path="/corsetdetails/:id" element={<CorsetDetails addToCart={addToCart} />} />

        //Pantalones 
        <Route  path="/pantalones" element={<PantalonesPage addToCart={addToCart}  />}/>
        <Route path="/pantalonesdetails/:id" element={<PantalonesDetails  addToCart={addToCart}  /> }/>

        //Tops y remeras
        <Route path="/topsyremeras" element={<Topsyremeras addToCart={addToCart} />} />
        <Route path="/topsyremerasdetails/:id" element={<TopsDetails addToCart={addToCart} />} />

        // Vestidos
        <Route path="/vestidosyenterizos" element={<Vestidos addToCart={addToCart} />} />
        <Route path="/vestidosyenterizosdetails/:id" element={<VestidosyEnterizosDetails  addToCart={addToCart} />} />

        <Route path="/contacto" element={<Contacto />} />
        <Route path="/descuentos" element={<ComponenteConDescuento addToCart={addToCart}  />}/>

        //Administrador 
        <Route path="/administrador/*" element={<Administrador />} />

        // Administrador Productos destacados
        <Route path="/administrador/destacados"   element={<AdmProductosDestacados />} />
        <Route path="/administrador/agregarproductosdestacados" element={<AgregarProductosDestacados />} />
        <Route path="/administrador/editdestacados/:id" element={<EditDestacados />} />

       // Administrador Accesorios
        <Route path="/administrador/accesorios" element={<AdmAccesorios />}/>  
        <Route path="/administrador/agregaraccesorios" element={<AgregarAccesorios />} />
        <Route path="/administrador/editaccesorios/:id" element={<EditAccesorios />}/>

        // Administrador Blusas y camisas
        <Route path="/administrador/blusasycamisas" element={<AdmBlusasyCamisas />} />
        <Route path="/administrador/agregarblusasycamisas" element={<Agregarblusasycamisas />} />
        <Route path="/administrador/editblusasycamisas/:id" element ={<EditBlusasyCamisas />} />

        //Administrador Corset y Body
        <Route path="/administrador/corsetybody" element={<AdmCorset />}/>
        <Route path="/administrador/agregarcorsetybody" element={<AgregarCorset />} />
        <Route path="/administrador/editcorsetybody/:id" element={<EditCorset />} />

        //Administrador Pantalones 
        <Route path="/administrador/pantalones" element={<AdmPantalones />}/>
        <Route path="/administrador/agregarpantalones" element={<AgregarPantalones />}/>
        <Route path="/administrador/editpantalones/:id" element={<EditPantalones />} />  

        //Administrador Tops y Remeras 
        <Route path="/administrador/topsyremeras" element={<AdmTopsyRemeras />} />
        <Route path="/administrador/agregartopsyremeras" element={<AgregarTopsyRemeras />} />
        <Route path="/administrador/edittopsyremeras/:id" element={<EditTopsyRemeras />} />

        //Administrador Vestidos y Enterizos
        <Route path="/administrador/vestidosyenterizos" element={<AdmVestidosyEnterizos />} />
        <Route path="/administrador/agregarvestidosyenterizos" element={<AgregarVestidosyEnterizos />} />
        <Route path="/administrador/editvestidosyenterizos/:id" element={<EditVestidosyEnterizos />} />

        // Mercadopago
        <Route path="mercadopago" element={<Mercadopago />} />
        
      </Routes>
      <Abajo />
    </Router>
  );
}

export default App;
