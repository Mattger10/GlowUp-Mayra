import { Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "styled-components";
import theme from "../Components/muiTheme";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import RoomIcon from "@mui/icons-material/Room";

interface Marker {
  id: number;
  name: string;
  position: { lat: number; lng: number };
}

const markers: Marker[] = [
  {
    id: 1,
    name: "Qobustan",
    position: { lat: -27.36966896057129, lng: -58.51259231567383 },
  },
];

function Contacto() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB_zKK1PIO_GX_TwUcOLxfYbf7BfIp42Y8",
  });

  const [activeMarker, setActiveMarker] = useState<Marker | null>(null);

  const handleActiveMarker = (marker: Marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Font2",
            fontWeight: "bold",
            fontSize: "28px",
            marginTop: "2rem",
            marginBottom: "2rem",
            color: "#333333",
            textDecoration: "underline",
          }}
        >
          {" "}
          CONTACTO{" "}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box
            className="container"
            sx={{
              width: "60%",
              "@media screen and (max-width: 768px)": {
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Font2",
                  fontWeight: "bold",
                  fontSize: "18px",
                  margin: "10px 0px",
                }}
              >
                CONTACTANOS
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333333",
                  margin: "0px 0px 20px",
                }}
              >
                {" "}
                <LocalPhoneIcon
                  sx={{
                    fontSize: "20px",
                    margin: "0px 5px -5px 0px",
                    color: "#333333",
                  }}
                />
                +54 0 379 4 256091
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Font2",

                  fontSize: "14px",
                  color: "#333333",
                  margin: "0px 0px 20px",
                }}
              >
                <EmailIcon
                  sx={{
                    fontSize: "20px",
                    margin: "0px 5px -5px 0px",
                    color: "#333333",
                  }}
                />
                glowup@outlook.com
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Font2",

                  fontSize: "14px",
                  color: "#333333",
                  margin: "0px 0px 20px",
                }}
              >
                <RoomIcon
                  sx={{
                    fontSize: "20px",
                    margin: "0px 5px -5px 0px",
                    color: "#333333",
                  }}
                />
                Elena Osuna y J. R. Valenzuela
              </Typography>
              {isLoaded ? (
                <GoogleMap
                  center={{ lat: -27.36966896057129, lng: -58.51259231567383 }}
                  zoom={17}
                  onClick={() => setActiveMarker(null)}
                  mapContainerStyle={{
                    width: "100%",
                    height: "50vh",
                    marginTop: "1rem",
                    border: "1px solid #333333"
                  }}
                >
                  {markers.map(({ id, name, position }) => (
                    <MarkerF
                      key={id}
                      position={position}
                      onClick={() => handleActiveMarker({ id, name, position })}
                    >
                      {activeMarker && activeMarker.id === id ? (
                        <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                          <div>
                            <p>{name}</p>
                          </div>
                        </InfoWindowF>
                      ) : null}
                    </MarkerF>
                  ))}
                </GoogleMap>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Fragment>
    </ThemeProvider>
  );
}

export default Contacto;
