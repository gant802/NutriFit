import React, { useState} from "react";
import Calendar from 'react-calendar';
import SelectedDayContainer from "../components/selectedDayContainer";

function CalendarPage(){
    const [date, setDate] = useState(new Date())

    const onChange = (date) => {
        setDate(date)
        console.log(date)
        
    }
    return(
        <div>
            <Calendar onChange={onChange} value={date}/>
            <SelectedDayContainer date={date}/>
        </div>
    )
}

export default CalendarPage