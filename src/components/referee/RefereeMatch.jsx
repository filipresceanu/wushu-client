import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import Match from "./Match";
import "./RefereeMatch.css";

export default function RefereeMatch() {
  const [matches, setMatches] = useState([]);
  const { auth, setAuth } = useAuth();
  const userID = auth.userId.toString();

  useEffect(() => {
    (async () => await getMatches())();
  }, []);

  async function getMatches() {
    axios
      .get(`https://localhost:7230/api/Match/GetMatchesReferee/${userID}`)
      .then((response) => {
        console.log(response.data);
        setMatches(response.data);
      });
  }

  if (matches.length == 0) {
    return <div className="no-matches">Nu exista meciuri de jurizat</div>;
  }

  console.log(`matches ${matches}`);

  return (
    <div>
      {matches.map((match) => {
        return <Match match={match} />;
      })}
    </div>
  );
}
