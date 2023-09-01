import React, { useState, useEffect } from "react";
import "./Match.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Round from "./Round";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#262640",
  },
};

export default function Match({ match }) {
  let subtitle;
  const [error, setError] = useState("");
  const [winner, setWinner] = useState("");
  const [winnerRoundFirst, setWinnerRoundFirst] = useState({});
  const [winnerRoundSecond, setWinnerRoundSecond] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const setWinnerMatchEqal = async () => {
    try {
      axios.put(
        `https://localhost:7230/api/Match/SetWinnerMatch/${match.matchId}`
      );
    } catch (e) {
      setError(e);
    }
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const setWinnerMatch = async () => {
    var firstWinner = "";
    await axios
      .get(
        `https://localhost:7230/api/Match/WinnerRound/${match.roundsRefere[0].roundId}`
      )
      .then((response) => {
        firstWinner = response.data;
      });

    var secondWinner = "";
    await axios
      .get(
        `https://localhost:7230/api/Match/WinnerRound/${match.roundsRefere[1].roundId}`
      )
      .then((response) => {
        secondWinner = response.data;
      });

    if (firstWinner.id == secondWinner.id) {
      await setWinnerMatchEqal();
      await getWinner();
    } else {
      setWinnerRoundFirst(firstWinner);
      setWinnerRoundSecond(secondWinner);
      setModalIsOpen(true);
    }
  };

  const getWinner = async () => {
    try {
      axios
        .get(`https://localhost:7230/api/Match/WinnerMatch/${match.matchId}`)
        .then((response) => {
          setWinner(response.data);
        });
    } catch (e) {
      setError(e);
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    await setWinnerMatch();
  };

  const handleWinner = async (e) => {
    e.preventDefault();
    setWinner(e.target.value);
  };

  const handleDecideWinner = async (e) => {
    try {
      axios.put(
        `https://localhost:7230/api/Match/SetWinnerMatch/${match.matchId}?winnerId=${winner}`
      );
      setModalIsOpen(false);
      setShowButton(false);
      await getWinner();
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div key={match.matchNumber} className="matchBox">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 className="modal-title">Alege castigatorul</h3>
        <div className="modal-box">
          <label class="container">
            {winnerRoundSecond.name}
            <input
              type="radio"
              checked="checked"
              name="radio"
              value={winnerRoundSecond.id}
              onChange={handleWinner}
            />
            <span class="checkmark"></span>
          </label>
          <label class="container">
            {winnerRoundFirst.name}
            <input
              type="radio"
              name="radio"
              value={winnerRoundFirst.id}
              onChange={handleWinner}
            />
            <span class="checkmark"></span>
          </label>
        </div>
        <Button variant="success" onClick={handleDecideWinner}>
          OK
        </Button>
      </Modal>
      <div className="matchWinner">
        <div className="matchNumber">Meciul {match.matchNumber}</div>
        {showButton && (
          <Button variant="success" onClick={handleCalculate}>
            Calculeaza Castigatorul
          </Button>
        )}
      </div>
      <div className="winner">Castigator {winner.name}</div>
      {match.roundsRefere.map((round) => {
        return <Round round={round} matchId={match.matchId} />;
      })}
    </div>
  );
}
