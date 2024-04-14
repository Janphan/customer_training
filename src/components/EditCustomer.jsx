import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function EditCustomer({data, editCustomer}){
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: data.firstname,
      lastname: data.lastname,
      streetaddress: data.streetaddress,
      postcode: data.postcode,
      city: data.city,
      email: data.email,
      phone: data.phone,
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    editCustomer(data._links.customer.href ,customer);
    handleClose();
  };
  return (
    <>
      <Button  onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit customer, fill in the customer's information in the form
          </DialogContentText>
          <TextField
            margin="dense"
            name="firstname"
            label="First name"
            value={customer.firstname}
            onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="lastname"
            label="Last name"
            value={customer.lastname}
            onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Street Address"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={(e) => setCustomer({ ...customer, streetaddress: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Postcode"
            name="postcode"
            value={customer.postcode}
            onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
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
