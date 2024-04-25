import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import dayjs from "dayjs";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { StyledHeading } from "./style";
function Training() {
  const [training, setTraining] = useState([]);

  const [colDefs] = useState([
    {
      headerName: "Date",
      valueGetter: (params) =>
        dayjs(params.data.date).format("DD.MM.YYYY HH:mm"),
      filter: true,  floatingFilter: true 
    },
    {
      headerName: "Customer's name",
      valueGetter: (params) =>
        params.data.customer.firstname + " " + params.data.customer.lastname,
      filter: true, floatingFilter: true
    },
    { field: "activity", filter: true, floatingFilter: true },
    { field: "duration", filter: true , floatingFilter: true},
    { headerName: "Actions",
      cellRenderer: (params) => (
        <IconButton 
          size="small"
          color="error"
          onClick={() => deleteTraining(params.data.id)}
        >
         < DeleteIcon/>
        </IconButton>
      ),
      width: 150,
    },
  ]);

  useEffect(() => {
    fetchTrainingAndCustomer();
  }, []);

  const fetchTrainingAndCustomer = () => {
    fetch(import.meta.env.VITE_API_URL + "/gettrainings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          customer: item.customer ? item.customer : {},
          customerName: item.customer 
          ? `${item.customer.firstname} ${item.customer.lastname}`
          : '',
        }));
        setTraining(formattedData);
      })
      .catch((error) => {
        console.error("Error:", error);
        npm;
      });
  };

  const addTraining = (newTraining) => {
    fetch(import.meta.env.VITE_API_URL + "/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newTraining),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error when adding traing");
        return response.json();
      })
      .then(() => fetchTrainingAndCustomer())
      .catch((err) => console.error(err));
  };

  //delete training
  const deleteTraining = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      fetch(import.meta.env.VITE_API_URL+ "/api/trainings/"+ id, {method: 'DELETE'})
      .then(response => {
          if (!response.ok) {
              throw new Error("Error in deletion: " + response.statusText);
          }
          return response.json();
      })
        .then(() => fetchTrainingAndCustomer())
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
    <StyledHeading>Training List</StyledHeading>
    <div className="ag-theme-material" style={{ height: 600 }}>
      <AgGridReact
        rowData={training}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        onFirstDataRendered={(params) => {
          params.api.sizeColumnsToFit();
        }}
      />
    </div>
    </>
  );
}

export default Training;
