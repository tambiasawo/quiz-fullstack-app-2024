import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";

export default function AccordionExpandDefault() {
  return (
    <ThemeProvider theme={theme}>
        <Accordion defaultExpanded sx={{ backgroundColor: "#37373e" }}>
          <AccordionSummary
            expandIcon={<MdExpandMore color={"white"} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography sx={{ color: "white" }}>
              How Do You Take a Quiz
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "white" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: "#37373e" }}>
          <AccordionSummary
            expandIcon={<MdExpandMore color={"white"} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>How Many Quizzes are There</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<MdExpandMore color={"white"} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>What if I Want More Quizzes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<MdExpandMore color={"white"} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              How Many Questions Are There In Total for Each Category
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<MdExpandMore color={"white"} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              Can I See How I Performed on a Category in Comparison to Other
              Quiz Takers
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
    </ThemeProvider>
  );
}
