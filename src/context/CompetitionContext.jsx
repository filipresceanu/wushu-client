import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CompetitionContext = React.createContext({});

export default function CompetitionContextProvider({ children }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => await getEvents())();
  }, []);

  async function getEvents() {
    axios.get('https://localhost:7230/api/Event/get-event').then((response) => {
      setEvents(response.data);
    });
  }

  return (
    <CompetitionContext.Provider
      value={{ selectedEvent, setSelectedEvent, events }}
    >
      {children}
    </CompetitionContext.Provider>
  );
}

export const useCompetition = () => useContext(CompetitionContext);
