import React from 'react';
import './Competition.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import register from '../../register-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionContext';

export default function Competiton() {
  const [event, setEvent] = useState([]);
  var messageLate = 'Inscrierile s-au incheiat';
  var messageGood = 'Inscrieri in curs';
  const navigate = useNavigate();

  useEffect(() => {
    (async () => await getEvents())();
  }, []);

  async function getEvents() {
    axios.get('https://localhost:7230/api/Event/get-event').then((response) => {
      setEvent(response.data);
    });
  }

  function handlerAddParticipants(name) {
    navigate('/add_participant');
  }

  const displayStyleDate = (message) => ({
    backgroundColor: message === messageGood ? '#6cd33b' : '#F01010',
  });

  function displayregisterParticipants(message, name) {
    if (message === messageGood) {
      return (
        <div
          className='status-register '
          onClick={() => handlerAddParticipants(name)}
        >
          <div className='stats'>
            <img src={register} alt='register' />
            <h5>Inscrieri</h5>
          </div>
        </div>
      );
    }
    return <div></div>;
  }

  const getDateTime = (dateTime) => {
    const temp = new Date(dateTime);
    let dd = String(temp.getDate()).padStart(2, '0');
    let mm = String(temp.getMonth() + 1).padStart(2, '0'); //janvier = 0
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

  return (
    <div className='competition'>
      {event.map((event) => {
        return (
          <div key={event.id} className='competition-element'>
            <div className='country'>
              <img
                className='country-img'
                src='images/romania.png'
                alt='country'
              />
              <h5>{getDateTime(event.date)}</h5>
            </div>
            <div className='logo'>
              <img
                className='logo-img'
                src='images/logo_wushu.png'
                alt='logo'
              />
            </div>
            <div className='details flex-fill'>
              <h5>{event.name}</h5>
              <h6>Competiton</h6>
              <div
                className='status'
                style={displayStyleDate(validateDateForCompetition(event.date))}
              >
                {validateDateForCompetition(event.date)}
              </div>
            </div>

            {displayregisterParticipants(
              validateDateForCompetition(event.date),
              event.name
            )}
          </div>
        );
      })}
    </div>
  );
}
