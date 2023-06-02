import React from 'react';
import './Competition.css';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function Competiton() {
  const [events, setEvents] = useState([]);
  const eventsCollectionRef = collection(db, 'events');
  var messageLate = 'Inscrierile s-au incheiat';
  var messageGood = 'Inscrieri in curs';
  useEffect(() => {
    const getEvent = async () => {
      const data = await getDocs(eventsCollectionRef);
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getEvent();
  }, []);

  const displayStyleDate = (message) => ({
    backgroundColor: message === messageGood ? '#6cd33b' : '#F01010',
  });

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
      {events.map((event) => {
        return (
          <div key={event.id} className='competition-element'>
            <div className='country'>
              <img
                className='country-img'
                src='images/romania.png'
                alt='country'
              />
              <h5>{getDateTime(event.Data)}</h5>
            </div>
            <div className='logo'>
              <img
                className='logo-img'
                src='images/logo_wushu.png'
                alt='logo'
              />
            </div>
            <div className='details flex-fill'>
              <h5>{event.Name}</h5>
              <h6>{event.Type}</h6>
              <div
                className='status'
                style={displayStyleDate(validateDateForCompetition(event.Data))}
              >
                {validateDateForCompetition(event.Data)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
