import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import SelectedDayContainer from "../components/selectedDayContainer";
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
    const [date, setDate] = useState(new Date())

    const onChange = (date) => {
        setDate(date)
    }

    return (
        <div id="calendarCont">

            <div>
                <Calendar onChange={onChange} value={date} />
            </div>

            <SelectedDayContainer date={date} />

        </div>
    )
}

export default CalendarPage