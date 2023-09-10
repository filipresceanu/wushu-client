import React from "react";
import MatchView from "./MatchView";

export default function Matches({ matches }) {
  return (
    <div>
      {matches.map((match) => (
        <MatchView match={match} />
      ))}
    </div>
  );
}
