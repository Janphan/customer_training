import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Container from "@mui/material/Container";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Card, Tab } from "@mui/material";
import Customerlist from "./components/customerlist";
import Training from "./components/training";
import BasicTabs from "./BasicTabs";
import DropdownMenu from "./DropdownMenu";

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
        
        {/* <BasicTabs/> */}
        <DropdownMenu/>
      </Container>
    </>
  );
}

export default App;
