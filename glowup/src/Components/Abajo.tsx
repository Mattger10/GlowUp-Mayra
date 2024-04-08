import { Box, Typography, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../Components/muiTheme";
import instagram from "../assets/glowup/icons8-instagram-240.svg";
import { Link } from "react-router-dom";
import whatsapp from "../assets/glowup/icons8-whatsapp-240.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

interface AbajoProps {}

const Abajo: FunctionComponent<AbajoProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
       
        sx={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          width: "auto",
          backgroundColor: "#eeeeee",
          padding: "20px",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 20 }}
          sx={{ width: "auto" }}
        >
          <Box sx={{ textAlign: "left", padding: "20px" }}>
            <Typography
              sx={{ fontFamily: "Font2", fontWeight: "bold", fontSize: "14px", margin: "10px 0px 5px" }}
            >
              CONTACTANOS
            </Typography>
            <Link to="https://www.whatsapp.com/catalog/5493794256091/?app_absent=0">
              {" "}
              <LogoWpp src={whatsapp} alt="WhatsApp" />{" "}
            </Link>
            <Link
              to="https://www.whatsapp.com/catalog/5493794256091/?app_absent=0"
              style={{ textDecoration: "none" }}
            >
              <Typography sx={{ marginLeft: "2rem", color: "black", fontFamily: "Font2", fontSize: "14px" }}>
                379 4 256091
              </Typography>
            </Link>
            <Link
              to="https://www.google.com.ar/maps/place/Belleza+Integral+ML/@-27.3694265,-58.5128452,145m/data=!3m1!1e3!4m15!1m8!3m7!1s0x944537d5ba592ba5:0x743b4a8b43ad1b1e!2sJuan+Ram%C3%B3n+Valenzuela+%26+Elena+Osuna,+San+Cosme,+Corrientes!3b1!8m2!3d-27.369678!4d-58.5124421!16s%2Fg%2F11f30622fp!3m5!1s0x9445377f180c893d:0x8493156c808ac528!8m2!3d-27.3696371!4d-58.5126053!16s%2Fg%2F11lm0b6vjn?entry=ttu"
              style={{ textDecoration: "none" }}
            >
              <LocationOnOutlinedIcon
                sx={{
                  position: "absolute",
                  marginLeft: "0rem",
                  color: "black",
                  fontSize: "20px"
                }}
              />{" "}
              <Typography sx={{ marginLeft: "2rem", color: "black", fontFamily: "Font2", fontSize: "14px" }}>
                Elena Osuna y J.R. Valenzuela
              </Typography>
            </Link>
            <AccessTimeOutlinedIcon
              sx={{ marginLeft: "0rem", position: "absolute", fontSize: "20px" }}
            />
            <Typography sx={{ marginLeft: "2rem", color: "black", fontFamily: "Font2", fontSize: "14px" }}>
              Horarios: 9:30 a 12:30 y de 17 a 21{" "}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left", padding: "20px" }}>
            <Typography
             sx={{ fontFamily: "Font2", fontWeight: "bold", fontSize: "14px", margin: "10px 0px 5px" }}
            >
              MEDIOS DE PAGO
            </Typography>
            <Typography sx={{ marginLeft: "0rem", color: "black", fontFamily: "Font2", fontSize: "14px"}}>Efectivo</Typography>
            <Typography sx={{ marginLeft: "0rem", color: "black", fontFamily: "Font2", fontSize: "14px"}}>Transferencias</Typography>
            <Typography sx={{ marginLeft: "0rem", color: "black", fontFamily: "Font2", fontSize: "14px"}}>Tarjetas de crédito y débito</Typography>
          </Box>
          <Box sx={{ textAlign: "left", padding: "20px" }}>
            <Typography
              sx={{ fontFamily: "Font2", fontWeight: "bold", fontSize: "14px", margin: "10px 0px 5px" }}
            >
              REDES SOCIALES
            </Typography>
            <Link to="https://www.instagram.com/glowup.oficial.mec/">
              <Logo src={instagram} alt="" />{" "}
            </Link>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Abajo;

const Logo = styled("img")(() => ({
  width: "25px",
  height: "auto",
  marginLeft: "-0.2rem",
}));

const LogoWpp = styled("img")(() => ({
  position: "absolute",
  width: "25px",
  height: "auto",
  marginLeft: "-0.1rem",
  marginTop: "-0.2rem",
}));
