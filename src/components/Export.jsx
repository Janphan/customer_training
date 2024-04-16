import React from "react";
import { Button } from "@mui/material";


export default function ExportCustomer({ customers }) {
    const exportToCSV = () => {
      const header = Object.keys(customers[0]).filter(
        (key) => key !== "_links" && key !== "id"
      );
      const csvData = [
        header.join(","),
        ...customers.map((customer) =>
          header.map((fieldName) => JSON.stringify(customer[fieldName])).join(",")
        ),
      ].join("\n");
  
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "customers.csv");
    };
  
    return <Button onClick={exportToCSV}>Export to CSV</Button>;
  }