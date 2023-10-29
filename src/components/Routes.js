import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import SignIn from './SignIn/SignIn';
import MainChat from './MainChat/MainChat';
import EventForm from './Forms/EventForm';
import CalendarLogin from "./Calendar/CalendarLogin";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/chat" element={<MainChat />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/event-check" element={<CalendarLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
