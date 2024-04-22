import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment"; // Use moment for localizer
import Training from "./training";
import { getTraining, getCustomers } from "../customerTrainingAPI";
const localizer = momentLocalizer(moment); // Set localizer

const CalendarComponent = ({ training }) => {
    
  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={training} // Make sure training is an array of event objects
        startAccessor="start" // Adjust based on your event object
        endAccessor="end" // Adjust based on your event object
        style={{ height: 500 }} // Set a height to prevent overflow
      />
    </div>
  );
};

export default CalendarComponent;
