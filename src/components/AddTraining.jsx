import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';



export default function AddTraining(props) {
  const [open, setOpen] = useState(false);

  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: props.customer._links.customer.href,
  });

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

  const handleSave = () => {
    const newTrainingCustomer = {
      ...training,
      customer: props.customer._links.customer.href,
    };
    props.addTraining(newTrainingCustomer);
    handleClose();
  };

  return (
    <>
      <IconButton  size="small" onClick={handleClickOpen}>
        <AddIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add more traing, fill in the training's information in the form
          </DialogContentText>

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
