import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Round.css";

export default function Round({ round, matchId }) {
  const [firstParticipantPoints, setFirstParticipantPoints] = useState(0);
  const [secondParticipantPoints, setSecondParticipantPoints] = useState(0);
  const [haveWinner, setHaveWinner] = useState(false);
  const [winner, setWinner] = useState("");
  const [error, setError] = useState("");

  const addPoints = async () => {
    axios.put(
      `https://localhost:7230/api/Match/AddPointsRound/${round.roundId}`,
      {
        pointsFirstParticipant: firstParticipantPoints,
        pointsSecondParticipant: secondParticipantPoints,
        matchId: matchId,
      }
    );
  };

  const getWinner = async () => {
    axios
      .get(`https://localhost:7230/api/Match/WinnerRound/${round.roundId}`)
      .then((response) => {
        setWinner(response.data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addPoints();
      setHaveWinner(true);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div key={round.roundNumber} className="roundBox">
      <div className="roundContent">
        Runda {round.roundNumber}
        <div className="roundParticipants">
          <label for="firstParticipant">{round.firstParticipantName}</label>
          <label for="secondParticipant">{round.secondParticipantName}</label>
        </div>
        <div className="roundParticipantsPoint">
          <input
            type="number"
            id="firstParticipant"
            placeholder="0"
            onChange={(event) => {
              setFirstParticipantPoints(event.target.value);
            }}
          />
          <input
            type="number"
            id="secondParticipant"
            placeholder="0"
            onChange={(event) => {
              setSecondParticipantPoints(event.target.value);
            }}
          />
        </div>
        {haveWinner ? (
          <div>Castigator: ${winner.name}</div>
        ) : (
          <Button variant="info" onClick={handleSubmit}>
            Trimite punctajul
          </Button>
        )}
      </div>
    </div>
  );
}
