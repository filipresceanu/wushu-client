import React from 'react';
import './Participant.css';

export default function ParticipantView() {
  return (
    <div className='table_center'>
      <div className=''>Participanti</div>
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
          <tr className='table_data'>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr className='table_data'>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr className='table_data'>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
