import React from 'react';
import './Participant.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionContext';

export default function ParticipantView() {
  const { events, selectedEvent, setSelectedEvent } = useCompetition();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    (async () => await getParticipants())();
  }, []);

  async function getParticipants() {
    axios
      .get(
        `https://localhost:7230/api/Event/participants-for-specific/${selectedEvent}`
      )
      .then((response) => {
        setParticipants(response.data);
      });
  }

  const getDateTime = (dateTime) => {
    const temp = new Date(dateTime);
    let dd = String(temp.getDate()).padStart(2, '0');
    let mm = String(temp.getMonth() + 1).padStart(2, '0'); 
    let yyyy = temp.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const getYearsOld = (dateTime) => {
    const yearNow = new Date().getFullYear();
    const userBirthday = new Date(dateTime).getFullYear();
    const yearsOld = yearNow - userBirthday;
    return yearsOld;
  };

  return (
    <div className='table_center'>
      <div className='table-name'>
        <h2>Participanti</h2>
      </div>
      <table className='table table-striped table_color'>
        <thead>
          <tr>
            <th scope='col'>Nume</th>
            <th scope='col'>Club</th>
            <th scope='col'>Sex</th>
            <th scope='col'>Data nasterii</th>
            <th scope='col'>Categoria de Greutate</th>
            <th scope='col'>Varsta</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr className='table_data'>
              <td>{participant.name}</td>
              <td>{participant.club}</td>
              <td>{participant.sex}</td>
              <td>{getDateTime(participant.birthDay)}</td>
              <td>{participant.categoryWeight}</td>
              <td>{getYearsOld(participant.birthDay)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
