import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/navigation/Header";
import HomePage from "./components/home/HomePage";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import NavBar from "./components/navigation/NavBar";
import Competiton from "./components/competition/Competiton";
import Events from "./components/events/Events";
import AddParticipants from "./components/participants/AddParticipants";
import ParticipantView from "./components/participantsView/ParticipantView";
import Category from "./components/category/Category";
import { CompetitionContextProvider } from "./context/CompetitionContext";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import RefereeMatch from "./components/referee/RefereeMatch";
import ViewAllMatches from "./components/matchesView/ViewAllMatches";

function App() {
  return (
    <AuthProvider>
      <CompetitionContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<HomePage />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="competition" element={<Competiton />} />
              <Route path="add_events" element={<Events />} />
              <Route path="participant_view" element={<ParticipantView />} />
              <Route path="add_participant" element={<AddParticipants />} />
              <Route path="add_category" element={<Category />} />
              <Route path="refere_match" element={<RefereeMatch />} />
              <Route path="view-matches" element={<ViewAllMatches />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CompetitionContextProvider>
    </AuthProvider>
  );
  ///competiti
}

export default App;
