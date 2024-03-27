import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";

function Customerlist() {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomer();
  }, []);
  const fetchCustomer = () => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers"
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Error in fetch" + response.statusText);

        return response.json();
      })
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
          onClick={() => deleteCar(params.data._links.car.href)}
        >
          Delete
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
        />
      </div>
    </>
  );
}

export default Customerlist;
