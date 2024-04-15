import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { getCustomers } from "../customerTrainingAPI";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function AddTraining({ addTraining }) {
  const [open, setOpen] = useState(false);
  const [fetchedCustomers, setFetchedCustomers] = useState([]);
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState();

  // useEffect(() => {
  //   fetchCustomer();
  // }, []);

  const fetchCustomer = () => {
    getCustomers()
      .then((data) => setFetchedCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  const handleClickOpen = () => {
    fetchCustomer();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name");
    console.log(name);
    console.log("value");
    console.log(value);
    setSelectedCustomer(value);
    setTraining({ ...training, [name]: value });
  };

  const handleSave = () => {
    addTraining(training);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Add New Training</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add more traing, fill in the training's information in the form
          </DialogContentText>

          <FormControl fullWidth>
            <InputLabel id="customer-select-label">Customer</InputLabel>
            <Select
              labelId="customer-select-label"
              id="customer-select"
              value={selectedCustomer}
              onChange={handleChange}
              name="customer"
            >
              {Array.isArray(fetchedCustomers) &&
                fetchedCustomers.map((customer, index) => (
                  <MenuItem
                    key={index}
                    value={customer.firstname + " " + customer.lastname}
                  >
                    {customer.firstname} {customer.lastname}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              onChange={(newValue) => {
                setTraining({
                  ...training,
                  date: newValue.$d.toISOString(),
                });
              }}
              label="Training Date and Time"
            />
          </LocalizationProvider>

          <TextField
            margin="dense"
            label="Duration"
            name="duration"
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
