import React from 'react';

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const InputData = (date) => {
        const [startDate, setStartDate] = date(new Date());
        return (
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={date => setStartDate(date)}
          />
        );
      };
export default InputData;
