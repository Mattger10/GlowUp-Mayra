import { FunctionComponent, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

interface MercadopagoProps {}

const Mercadopago: FunctionComponent<MercadopagoProps> = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("YOUR_PUBLIC_KEY", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5173/create_reference",
        {
          title: "Producto",
          quantity: 1,
          price: 100,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div>
      <div>
        <h3>Mercadopago</h3>
        <p>$100</p>
        <button onClick={handleBuy}>Comprar</button>
        {preferenceId && (
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        )}
      </div>
    </div>
  );
};

export default Mercadopago;
