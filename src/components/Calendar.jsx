import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment"; // Use moment for localizer
import Training from "./training";
import { getTraining, getCustomers } from "../customerTrainingAPI";

const localizer = momentLocalizer(moment); // Set localizer

function TrainingCalendar () {
    const [trainingData, setTrainingData] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);

    const mapToCalendar = (trainings) => {
        return trainings.map((training) => ({
          title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname} `,
          start: new Date(training.date),
          end: moment(training.date)
            .add(training.duration, 'minutes')
            .toDate(),
        }))
      }

    useEffect(() => {
        getTraining()
      .then(data => {
        setTrainingData(data)
        setCalendarEvents(mapToCalendar(data))
      })
      .catch(error => console.error('Failed fetching trainings:', error))
  }, [])

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={calendarEvents} // Make sure training is an array of event objects
        startAccessor="start" // Adjust based on your event object
        endAccessor="end" // Adjust based on your event object
        views={['month', 'week', 'day']}
        style={{ height: 500 }} // Set a height to prevent overflow
      />
    </div>
  );
};

export default TrainingCalendar;
