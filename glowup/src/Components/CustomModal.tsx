import React from "react";
import { Modal, Button, Typography } from "@mui/material";
import { Producto } from "../Components/Firestore/FirestoreHandler";

interface ModalProps {
  product: Producto | null;
  onClose: () => void;
  open: boolean;
}

const CustomModal: React.FC<ModalProps> = ({ product, onClose, open }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        {product && (
          <div>
            <Typography variant="h6">{product.nombre}</Typography>
            <Typography variant="body1">Descripción: {product.descripcion}</Typography>
            <Typography variant="body1">Precio: ${product.precio}</Typography>
            {/* Mostrar más detalles si es necesario */}
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
