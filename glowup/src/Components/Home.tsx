import React from "react";
import styled from "styled-components";



interface HomeGlowProps {}

const HomeGlow: React.FC<HomeGlowProps> = () => {
  // const imagenes = [
  //   "/portada1.jpg",
  //   "/portada2.jpg",
  //   "/portada3.jpg",
  //   // Agrega más rutas de imágenes según sea necesario
  // ];

  return (
    
    <Contenedor>
      {/* <NavBar />
      <Carrusel images={imagenes} />
      <Ofertas />
      <Productos />
      <Abajo /> */}
    </Contenedor>
  );
};

export default HomeGlow;

const Contenedor = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
