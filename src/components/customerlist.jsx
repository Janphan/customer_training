import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { getCustomers } from "../customerTrainingAPI";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddTraining from "./AddTraining";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { CSVLink } from "react-csv";
import CustomerListExport from "./CustomerListExport";
import '../Style.css';

function Customerlist() {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = () => {
    getCustomers()
      .then((data) => setCustomer(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  const [colDefs, setColDefs] = useState([
    { field: "firstname", filter: true, width: 150 },
    { field: "lastname", filter: true, width: 150 },
    { field: "streetaddress", filter: true },
    { field: "postcode", filter: true, width: 100 },
    { field: "city", filter: true, width: 150 },
    { field: "email", filter: true },
    { field: "phone", filter: true },

    {
      cellRenderer: (params) => (
        <AddTraining addTraining={addTraining} customer={params.data} />
      ),
      width: 150,
    },
    {
      cellRenderer: (params) => (
        <EditCustomer data={params.data} editCustomer={editCustomer} />
      ),
      width: 150,
    },
    {
      cellRenderer: (params) => (
        <IconButton
          size="small"
          color="error"
          onClick={() => deleteCustomer(params.data._links.customer.href)}
        >
          <DeleteIcon />
        </IconButton>
      ),
      width: 150,
    },
  ]);
  //delete customer
  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure to delete this customer?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (!response.ok)
            throw new Error("Error in deletion: " + response.statusText);

          return response.json();
        })
        .then(() => fetchCustomer())
        .catch((err) => console.error(err));
    }
  };
  //add customer
  const addCustomer = (newCustomer) => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newCustomer),
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Error when adding customer");
        return response.json();
      })
      .then(() => fetchCustomer())
      .catch((err) => console.error(err));
  };
  //edit customer
  const editCustomer = (url, editedCustomer) => {
    fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedCustomer),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error when updating customer");
        return response.json();
      })
      .then(() => fetchCustomer())
      .catch((err) => console.error(err));
  };
  //add training
  const addTraining = (trainingData) => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trainingData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Error when adding a Training: " + response.statusText
          );
        }
        return response.json();
      })
      .then(() => fetchCustomer())
      .catch((err) => console.error(err));
  };

  return (
    <>
      <AddCustomer addCustomer={addCustomer} />
    
      {/* Include the CustomerListExport component */}
      <Button><CustomerListExport customer={customer} /></Button>
      <div className="ag-theme-material" style={{ height: 600 }}>
        <AgGridReact
          rowData={customer}
          columnDefs={colDefs}
          pagination={true}
          // paginationAutoPageSize={true}
          domLayout="autoHeight"
          onFirstDataRendered={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />
      </div>
    </>
  );
}

export default Customerlist;
