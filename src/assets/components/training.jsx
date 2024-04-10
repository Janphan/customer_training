import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
import { getTraining } from "../../customerTrainingAPI";
import dayjs from "dayjs";

function Training() {
  const [training, setTraining] = useState([]);

  useEffect(() => {
    fetchTraining();
  }, []);

  const fetchTraining = () => {
    getTraining()
      .then((data) => setTraining(data._embedded.trainings))
      .catch((err) => console.error(err));
  };

  const [colDefs, setColDefs] = useState([
    { field: "customer", filter: true },
    { field: "date", filter: true, valueFormatter: (params) =>
    dayjs(params.value).format("DD.MM.YYYY HH:mm") },
    { field: "duration", filter: true },
    { field: "activity", filter: true },
    {
      cellRenderer: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => addTraining()}
          //addtraining
        >
          Add
        </Button>
      ),
      width: 150,
    },
    {
      cellRenderer: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => updateTraining()}
          //updatetraining
        >
          Update
        </Button>
      ),
      width: 150,
    },
    {
      cellRenderer: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteTraining()}
          //delete training
        >
          Delete
        </Button>
      ),
      width: 150,
    },
  ]);
  return (
    <>
      <div className="ag-theme-material" style={{ height: 600 }}>
        <AgGridReact
          rowData={training}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default Training;
