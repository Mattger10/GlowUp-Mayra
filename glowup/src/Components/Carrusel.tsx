import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface CarruselProps {
  images: string[];
}

const Carrusel: FunctionComponent<CarruselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  return (
    <CarruselContainer>
      <Carrusel1>
        <KeyboardArrowLeftIcon
          onClick={goToPrevSlide}
          sx={{
            position: "absolute",
            left: "1rem",
            color: "#828282",
            fontSize: "40px",
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "100%",
            "&:hover": {
              color: "black",
            },
          }}
        >
          &lt;{" "}
        </KeyboardArrowLeftIcon>
        <CarruselImageContainer>
          <CarruselImage
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
          />
        </CarruselImageContainer>
        <KeyboardArrowRightIcon
          onClick={goToNextSlide}
          sx={{
            position: "absolute",
            right: "1rem",
            color: "#828282",
            fontSize: "40px",
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "100%",
            "&:hover": {
              color: "black",
            },
          }}
        >
          &gt;
        </KeyboardArrowRightIcon>
      </Carrusel1>
    </CarruselContainer>
  );
};

export default Carrusel;

const Carrusel1 = styled("div")(() => ({
  position: "relative",
  maxWidth: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  top: "1rem",
}));

const CarruselImageContainer = styled("div")(() => ({
  width: "75rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "400px", // Ajusta la altura deseada aquí
  "@media (max-width: 560px)": {
    height: "200px", // Ajustar el relleno para dispositivos más pequeños
  },
}));

const CarruselImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
}));

const CarruselContainer = styled.div`
  position: relative;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 1rem;
`;
