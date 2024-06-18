import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          // Add your custom styles here
          backgroundColor: "#37373e",
          borderTop: "1px solid #e0e0e0",
          boxShadow: "none",

          "&:not(:last-child)": {
            borderBottom: 0,
          },

          "&:before": {
            display: "none",
          },
          "&$expanded": {
            margin: "auto",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: "#37373e",
          borderBottom: "1px solid rgba(0, 0, 0, .125)",
          marginBottom: -1,
          color: "#fff",
          minHeight: 56,
          "&$expanded": {
            minHeight: 56,
          },
        },
        content: {
          "&$expanded": {
            margin: "12px 0",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
          color: "#fff",
        },
      },
    },
  },
});

export default theme;
