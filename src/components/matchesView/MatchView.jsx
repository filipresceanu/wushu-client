import React from "react";
import "./MatchView.css";

export default function MatchView({ match }) {
  return (
    <div className="match-view">
      <div>Meci {match.matchNumber}</div>
      <div>{match.participantFirstName}</div>
      <div>{match.firstParticipantWeight} Kg</div>
      <div>{match.participantSecondName}</div>
      <div>{match.secondParticipantWeight} Kg</div>
      <div>Castigator {match.winnerMatch}</div>
    </div>
  );
}
