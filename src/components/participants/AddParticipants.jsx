import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import axios from "axios";
import { useCompetition } from "../../context/CompetitionContext";
import { useNavigate } from "react-router-dom";
import CategoryData from "../category/CategoryData";
import "./AddParticipants.css";
import UploadParticipants from "./UploadParticipants";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";

export default function AddParticipants() {
  const { events, selectedEvent, setSelectedEvent } = useCompetition();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [club, setClub] = useState("");
  const [sex, setSex] = useState("");
  const [birthDate, setBirthDate] = useState(Date.now());
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(selectedEvent);
  }, []);

  const addParticipant = async () => {
    axios.put(
      `https://localhost:7230/api/Event/add-in-competition/${selectedEvent}`,
      {
        name: name,
        club: club,
        birthDay: birthDate,
        sex: sex,
        categoryWeight: weight,
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addParticipant();
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <div class="form">
        <div class="title">Inscriere</div>
        <div class="subtitle">Inscriere participant</div>
        <div className="fill-flex">
          <div class="input-container ic1">
            <input
              id="name"
              class="input"
              type="text"
              placeholder="Nume"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div class="input-container ic1">
            <input
              id="club"
              class="input"
              type="text"
              placeholder="Club"
              onChange={(event) => setClub(event.target.value)}
            />
          </div>
          <div class="input-container ic2">
            <input
              id="sex"
              class="input"
              placeholder="Feminin/Masculin"
              onChange={(event) => setSex(event.target.value)}
            />
          </div>
        </div>
        <div className="fill-flex">
          <div class="input-container ic1 full">
            <label className="label">Greutate</label>
            <input
              id="greutate"
              class="input"
              type="number"
              placeholder="50"
              onChange={(event) => setWeight(event.target.value)}
            />
          </div>
          <div className="input-container ic2 full">
            <label className="label">Data Nasterii</label>
            <input
              id="birthDate"
              class="input"
              type="date"
              onfocus="(this.type='date')"
              onblur="(this.type='text')"
              placeholder="14/11/1999"
              onChange={(event) => setBirthDate(event.target.value)}
            />
          </div>
        </div>
        <button type="text" class="submit" onClick={handleSubmit}>
          submit
        </button>
      </div>
      <CategoryData />
    </div>
  );
}
