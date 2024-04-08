import { FunctionComponent } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface ModalSavedDataProps {
  isOpen: boolean;
}

const ModalSavedData: FunctionComponent<ModalSavedDataProps> = ({
  isOpen,
}) => {
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          borderRadius: "10px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Actualizando datos...
        </Typography>
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    </Modal>
  );
};

export default ModalSavedData;
