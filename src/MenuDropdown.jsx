import * as React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function MenuDropdown() {
  const [open, setOpen] = React.useState(false);

  // Define icons
  const icons = {
    Customer: <GroupIcon />,
    Training: <DirectionsRunIcon />,
    Calendar: <CalendarMonthIcon />,
    Statistics: <BarChartIcon />,
  };

  // Define list items with corresponding icons and routes
  const listItems = [
    { text: "Customer", icon: icons.Customer, route: "/customerlist" },
    { text: "Training", icon: icons.Training, route: "/training" },
    { text: "Calendar", icon: icons.Calendar, route: "/Calendar" },
    { text: "Statistics", icon: icons.Statistics, route: "/AnalysisTraining" },
  ];

  // Create the Drawer content with List and navigation links
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {listItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link
              to={item.route}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              {/* Link to route */}
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
