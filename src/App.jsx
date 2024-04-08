import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Container from "@mui/material/Container";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Card, Tab } from "@mui/material";
import Customerlist from "./assets/components/customerlist";
import BasicTabs from "./BasicTabs";
import Training from "./assets/components/training";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Customer training application</Typography>
          </Toolbar>
        </AppBar>
        <BasicTabs/>
      </Container>
    </>
  );
}

export default App;
