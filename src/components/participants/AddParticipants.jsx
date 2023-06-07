import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function AddParticipants() {
  const [name, setName] = useState('');
  const [newType, setNewType] = useState('Concurs');
  const [newData, setNewData] = useState(Date.now());
  const [error, setError] = useState('');

  const createEvent = async () => {};

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
              <Form.Label>Nume</Form.Label>
              <Form.Control type='text' placeholder='Nume' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicClub'>
              <Form.Label>Club</Form.Label>
              <Form.Control type='text' placeholder='Club' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicSex'>
              <Form.Label>Sex</Form.Label>
              <Form.Control type='text' placeholder='Feminin/Masculin' />
            </Form.Group>
          </div>
          <div className='flex-full'>
            <Form.Group className='mb-3' controlId='formBasicWeight'>
              <Form.Label>Categoria de greutate</Form.Label>
              <Form.Control type='number' placeholder='74' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBirthDaty'>
              <Form.Label>Data nasterii</Form.Label>
              <Form.Control type='date' placeholder='14/11/199'></Form.Control>
            </Form.Group>
          </div>
        </Form>
        <Button variant='primary'>Adauga</Button>
      </div>
    </div>
  );
}
