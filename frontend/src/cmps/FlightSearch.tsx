import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import FlightStore from "../stores/FlightStore";

const FlightSearch = observer(() => {
    const [query, setQuery] = useState("")
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        FlightStore.fetchFlights(value);
    };

  return (
    <section className="text-con">
        <input 
            className="text-input"
            type="text" 
            placeholder="Search by..."
            value={query}
            onChange={handleSearch}
        />
    </section>
  )  
})

export default FlightSearch