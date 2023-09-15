import React, { useState, useEffect } from "react";
import { useCompetition } from "../../context/CompetitionContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import CategoryMatches from "./CategoryMatches";

export default function ViewAllMatches() {
  const { selectedEvent } = useCompetition();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    (async () => await getMatches())();
  }, []);

  async function getMatches() {
    axios
      .get(
        `https://localhost:7230/api/Match/GetMatchesForEvent/${selectedEvent}`
      )
      .then((response) => {
        setMatches(response.data);
        console.log(response.data);
      });
  }

  async function updateMatches() {
    axios
      .put(`https://localhost:7230/api/Match/Generate-Matches/${selectedEvent}`)
      .then((response) => {
        setMatches(response.data);
        console.log(response.data);
      });
  }

  return (
    <div>
      <Button variant="success" onClick={updateMatches}>
        Etapa Urmatoare
      </Button>
      {matches.map((match) => (
        <CategoryMatches category={match} />
      ))}
    </div>
  );
}
