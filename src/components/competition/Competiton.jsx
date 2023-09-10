import React from "react";
import "./Competition.css";
import { useState, useEffect } from "react";
import register from "../../register-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { useCompetition } from "../../context/CompetitionContext";
import { useAuth } from "../../context/AuthProvider";
const messageLate = "Inscrierile s-au incheiat";
const messageGood = "Inscrieri in curs";

export default function Competiton() {
  const { auth } = useAuth();
  const { events, selectedEvent, setSelectedEvent } = useCompetition();
  const navigate = useNavigate();

  function handlerAddParticipants(id) {
    setSelectedEvent(id);
    navigate("/add_participant");
  }

  function handleGenerateMatches(id) {
    setSelectedEvent(id);
    navigate("/generate-matches");
  }

  function handlerAddCategory(id) {
    setSelectedEvent(id);
    navigate("/add_category");
  }

  const displayStyleDate = (message) => ({
    backgroundColor: message === messageGood ? "#6cd33b" : "#F01010",
  });

  function displayStartMatches(message, id) {
    if (message === messageLate) {
      return (
        <div className="boxStyle" onClick={() => handleGenerateMatches(id)}>
          <div>
            <h5>Generare Meciuri</h5>
          </div>
        </div>
      );
    }
    return <></>;
  }

  function displayAddCategory(dateTime, id) {
    var currentDate = new Date();
    var dateTimeEvent = new Date(dateTime);
    if (dateTimeEvent < currentDate) {
      return;
    }

    return (
      <div className="boxStyle" onClick={() => handlerAddCategory(id)}>
        Adauga Categorie
      </div>
    );
  }

  function displayregisterParticipants(message, id) {
    if (message === messageGood) {
      return (
        <div
          className="status-register"
          onClick={() => handlerAddParticipants(id)}
        >
          <div className="stats">
            <img src={register} alt="register" />
            <h5>Inscrieri</h5>
          </div>
        </div>
      );
    }
    return <div></div>;
  }
  const displayMatchesForRefere = () => {
    return (
      <div className="boxStyle" onClick={() => navigate("/refere_match")}>
        Arbitreaza Meci
      </div>
    );
  };

  const getDateTime = (dateTime) => {
    const temp = new Date(dateTime);
    let dd = String(temp.getDate()).padStart(2, "0");
    let mm = String(temp.getMonth() + 1).padStart(2, "0");
    let yyyy = temp.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const validateDateForCompetition = (dateTime) => {
    var currentDate = new Date();
    var dateTimeEvent = new Date(dateTime);
    if (dateTimeEvent < currentDate) {
      return messageLate;
    } else {
      return messageGood;
    }
  };

  function handleViewParticipants(id) {
    setSelectedEvent(id);
    navigate("/participant_view");
  }

  return (
    <div className="competition">
      {events.map((event) => {
        return (
          <div key={event.id} className="competition-element">
            <div className="country">
              <img
                className="country-img"
                src="images/romania.png"
                alt="country"
              />
              <h5>{getDateTime(event.date)}</h5>
            </div>
            <div className="logo">
              <img
                className="logo-img"
                src="images/logo_wushu.png"
                alt="logo"
              />
            </div>
            <div className="details flex-fill">
              <h5>{event.name}</h5>
              <h6>Competiton</h6>
              <div
                className="status"
                style={displayStyleDate(validateDateForCompetition(event.date))}
              >
                {validateDateForCompetition(event.date)}
              </div>
            </div>
            {displayStartMatches(
              validateDateForCompetition(event.date),
              event.id
            )}
            {displayAddCategory(event.date, event.id)}

            {displayregisterParticipants(
              validateDateForCompetition(event.date),
              event.id
            )}
            {auth && displayMatchesForRefere()}
            <div
              className="view-participanti"
              onClick={() => handleViewParticipants(event.id)}
            >
              Participanti
            </div>
          </div>
        );
      })}
    </div>
  );
}
