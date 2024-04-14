import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { getCustomers } from "../customerTrainingAPI";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddTraining({ addTraining }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: null,
    activity: "",
    duration: "",
    customerId: "",
  });
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data._embedded.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addTraining(training);
    handleClose();
  };
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button onClick={handleClickOpen}>Add New Training</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Traing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add more traing, fill in the training's information in the form
          </DialogContentText>

          <DatePicker
            label="Date"
            value={training.date}
            onChange={(newValue) => setTraining({ ...training, date: newValue })}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />

       
          <TextField
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="duration"
            name="duration"
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel id="customer-select-label">Customer</InputLabel>
            <Select
              labelId="customer-select-label"
              value={training.customerId}
              onChange={(e) =>
                setTraining({ ...training, customerId: e.target.value })
              }
              fullWidth
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.firstname} {customer.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      </LocalizationProvider>
    </>
  );
}
