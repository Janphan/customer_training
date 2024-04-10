import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import dayjs from "dayjs";
import { getCustomerTraining, getTraining } from "../customerTrainingAPI";

function Training() {
  const [training, setTraining] = useState([]);
  const [colDefs] = useState([
    {
      headerName: "Date",
      valueGetter: (params) =>
        dayjs(params.data.date).format("DD.MM.YYYY HH:mm"),
      filter: true,
    },
    { field: "duration", filter: true },
    { field: "activity", filter: true },
    {
      headerName: "Customer's name",
      valueGetter: (params) =>
        params.data.customer.firstname + " " + params.data.customer.lastname,
      filter: true,
    },
  ]);

  const fetchTraining = () => {
  getCustomerTraining()
  .then (data => {
    const formattedTrainings = data.map(training => ({
      ...training,
      customer: `${training.firstname} ${training.lastname}`
    }))
    setTraining(formattedTrainings);
  })
  .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchTraining();
  }, []);
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
