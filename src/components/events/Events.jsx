import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Events.css';
import axios from 'axios';

export default function Events() {
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Concurs');
  const [newData, setNewData] = useState(Date.now());
  const [error, setError] = useState('');

  const createEvent = async () => {
    axios.put('https://localhost:7230/api/Event/add-event', {
      name: newName,
      date: newData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createEvent();
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <div className='form_event'>
        <Form className='form_style'>
          <div className='flex-fill'>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Denumire</Form.Label>
              <Form.Control
                type='text'
                placeholder='Name'
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicDescrption'>
              <Form.Label>Tipul</Form.Label>
              <Form.Control
                type='text'
                placeholder='Seminar'
                onChange={(event) => {
                  setNewType(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicCity'>
              <Form.Label>Oras</Form.Label>
              <Form.Control type='text' placeholder='Bucuresti' />
            </Form.Group>
          </div>
          <div className='flex-full'>
            <Form.Group className='mb-3' controlId='formBasicStreet'>
              <Form.Label>Strada</Form.Label>
              <Form.Control type='text' placeholder='Ghe Doja nr55' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formDatetimeInceput'>
              <Form.Label>Data de inceput</Form.Label>
              <Form.Control
                type='datetime-local'
                placeholder='10/11/2022'
                onChange={(event) => {
                  setNewData(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formDatetimeFinal'>
              <Form.Label>Data de inchidere</Form.Label>
              <Form.Control type='datetime-local' placeholder=''></Form.Control>
            </Form.Group>
          </div>
        </Form>
        <Button variant='primary' onClick={handleSubmit}>
          Adauga
        </Button>
      </div>
    </div>
  );
}
