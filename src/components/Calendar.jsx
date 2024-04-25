import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment"; // Use moment for localizer
import { getTraining } from "../customerTrainingAPI";
import "../Style.css";

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
        events={calendarEvents}
        startAccessor="start" // Adjust based on event object
        endAccessor="end" // Adjust based on event object
        views={['month', 'week', 'day']}
        style={{ height: 500 }} // Set a height to prevent overflow
        className="custom-calendar event-description event-date event-box"
      />
    </div>
  );
};

export default TrainingCalendar;
