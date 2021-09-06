import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },

  palette: {
    primary: {
      light: "#af52bf",
      main: "#9c27b0",
      dark: "#6d1b7b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#d7a8df",
      main: "#ce93d8",
      dark: "#906697",
      contrastText: "#000",
    },
  },
});

export default theme;
