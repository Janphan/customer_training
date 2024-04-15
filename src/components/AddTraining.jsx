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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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
    fetchCustomers(); // Call the fetchCustomers function here
  }, []);

  const fetchCustomers = async () => {
    try {
      const customerData = await getCustomers();
      setCustomers(customerData._embedded.customers);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraining({ ...training, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    addTraining(training);
    setTraining({
      date: "",
      activity: "",
      duration: "",
      customerId: "",
    });
    handleClose();
  };
  return (
    <>
      <Button onClick={handleClickOpen}>Add New Training</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Traing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add more traing, fill in the training's information in the form
          </DialogContentText>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              onChange={(value) => {
                setTraining({
                  ...training,
                  date: value.$d.toISOString(),
                });
              }}
              label="Training Date and Time"
            />
          </LocalizationProvider>

          <TextField
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="duration"
            name="Duration"
            value={training.duration}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
