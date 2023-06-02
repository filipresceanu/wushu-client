import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/navigation/Header';
import HomePage from './components/home/HomePage';
import Signup from './components/Signup';
import NavBar from './components/navigation/NavBar';
import Competiton from './components/competition/Competiton';
import Events from './components/events/Events';
import AddParticipants from './components/participants/AddParticipants';
import ParticipantView from './components/participantsView/ParticipantView';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<Signup />} />
          <Route path='competition' element={<Competiton />} />
          <Route path='add_events' element={<Events />} />
          <Route path='participant_view' element={<ParticipantView />} />
          <Route path='add_participant' element={<AddParticipants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  ///competiti
}

export default App;
