import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
import { getCustomers } from "../customerTrainingAPI";

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
        <Button
          size="small"
          color="error"
          onClick={() => deleteCustomer(params.data._links.customer.href)}
        >
          Delete
        </Button>
      ),
      width: 150,
    },
    {
      cellRenderer: (params) => (
        <Button size="small" onClick={() => addCustomer()}>
          Add
        </Button>
      ),
      width: 150,
    },
    {
      cellRenderer: (params) => (
        <Button size="small" onClick={() => editCustomer()}>
          Edit
        </Button>
      ),
      width: 150,
    },
  ]);

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
  return (
    <>
      <div className="ag-theme-material" style={{ height: 600 }}>
        <AgGridReact
          rowData={customer}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
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
