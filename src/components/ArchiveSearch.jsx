import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ArchiveSearch () {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="bg-gray-500 absolute top-0 right-0">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
    )
}