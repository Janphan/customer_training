
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import MenuDropdown from "./MenuDropdown";



export default function Appbar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <MenuDropdown/>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Customer training application
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
