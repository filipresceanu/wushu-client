import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddParticipants() {
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
              <Form.Control type='text' placeholder='Bucuresti' />
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
