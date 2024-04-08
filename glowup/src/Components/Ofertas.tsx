import { FunctionComponent } from "react";
import oferta from "../../public/pruebaslider.png";
import oferta2 from "../../public/pruebaslider2.png";
import oferta3 from "../../public/pruebaslider3.png"
import styled from "styled-components";

interface OfertasProps {}

const Ofertas: FunctionComponent<OfertasProps> = () => {
  return (
    <FlexContainer>
      <Img src={oferta3} alt="" />
      <Img src={oferta} alt="" />
      <Img src={oferta2} alt="" />
    </FlexContainer>
  );
};

export default Ofertas;



const FlexContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 100%; /* Esto hace que el contenedor sea responsive */
`;

const Img = styled("img")(() => ({
  width: "385px",
  height: "385px",
  objectFit: "cover",

  
  marginBottom: "0px", // Espaciado entre imágenes
}));
