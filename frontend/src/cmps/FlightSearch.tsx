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
            placeholder="Search by flight num / takeoff / landing airport"
            value={query}
            onChange={handleSearch}
        />
      <span className="material-symbols-outlined">
        search
      </span>
    </section>
  )  
})

export default FlightSearch