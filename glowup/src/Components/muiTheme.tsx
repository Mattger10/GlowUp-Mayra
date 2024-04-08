import { createTheme } from "@mui/material/styles";
import Font4 from "../assets/Fonts/Fontspring-DEMO-theseasons-reg.otf";
import Font1 from "../assets/Fonts/Gilas.ttf";
import Font2 from "../assets/Fonts/Montserrat-VariableFont_wght.ttf"

const myFont4 = new FontFace("Font4", `url(${Font4})`);
const myFont1 = new FontFace("Font1", `url(${Font1})`);
const myFont2 = new FontFace("Font2", `url(${Font2})`);

document.fonts.add(myFont4);
document.fonts.add(myFont1);
document.fonts.add(myFont2);

const Theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
  typography: {
    fontFamily: "Font1, Font2, Font4",
  },
});

export default Theme;
