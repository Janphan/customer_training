import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import dayjs from "dayjs";
import { getTraining, getCustomers } from "../customerTrainingAPI";

function Training() {
  const [training, setTraining] = useState([]);
  const [colDefs] = useState([
    {
      headerName: "Date",
      valueGetter: (params) =>
        dayjs(params.data.date).format("DD.MM.YYYY HH:mm"),
      filter: true,
    },
    {
      headerName: "Customer's name",
      valueGetter: (params) =>
        params.data.customer.firstname + " " + params.data.customer.lastname,
      filter: true,
    },
    { field: "activity", filter: true },
    { field: "duration", filter: true },
  ]);

  useEffect(() => {
    fetchTrainingAndCustomer();
  }, []);

  const fetchTrainingAndCustomer = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          customerName: `${item.customer.firstname} ${item.customer.lastname}`,
        }));
        setTraining(formattedData);
      })
      .catch((error) => {
        console.error("Error:", error);
        npm;
      });
  };

  return (
    <div className="ag-theme-material" style={{ height: 600 }}>
      <AgGridReact
        rowData={training}
        columnDefs={colDefs}
        pagination={true}
        paginationAutoPageSize={true}
      />
    </div>
  );
}

export default Training;
