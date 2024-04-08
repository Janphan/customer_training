import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
import { getTraining } from "../../customerTrainingAPI";

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
    { field: "date", filter: true, },
    { field: "duration", filter: true },
    { field: "activity", filter: true },
    // { field: "customer", filter: true },
    // {
    //   cellRenderer: (params) => (
    //     <Button
    //       size="small"
    //       color="error"
    //       onClick={() => addTraining()}
    //       //addtraining
    //     >
    //       Delete
    //     </Button>
    //   ),
    //   width: 150,
    // },
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
