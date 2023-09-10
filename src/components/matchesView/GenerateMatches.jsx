import React, { useState, useEffect } from "react";
import { useCompetition } from "../../context/CompetitionContext";
import axios from "axios";
import CategoryMatches from "./CategoryMatches";

export default function GenerateMatches() {
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

  return (
    <div>
      {matches.map((match) => (
        <CategoryMatches category={match} />
      ))}
    </div>
  );
}
