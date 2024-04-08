import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "../../public/glow up.png";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "-5rem",
        width: "100%",
        height: "70vh",
      }}
    >
      <img src={logo} alt="" width={"300px"} />
      <CircularProgress sx={{ color: "black", marginTop: "-5rem" }} />
    </Box>
  );
};

export default Loading;
