import * as React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function MenuDropdown() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Define icons
  const icons = {
    Customer: <GroupIcon />,
    Training: <DirectionsRunIcon />,
    Calendar: <CalendarMonthIcon />,
    Statistics: <BarChartIcon />
  };

  // Define list items with corresponding icons and routes
  const listItems = [
    { text: 'Customer', icon: icons.Customer, route: '/customerlist' },
    { text: 'Training', icon: icons.Training, route: '/training' },
    { text: 'Calendar', icon: icons.Calendar, route: '/Calendar' },
    { text: 'Statistics', icon: icons.Statistics, route: '/AnaylysisTraining' },
  ];

  // Create the Drawer content with List and navigation links
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {listItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link to={item.route} style={{ textDecoration: 'none', color: 'inherit' }}>  {/* Link to route */}
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
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
