import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventsProvider } from './context/EventsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import RSVPConfirmation from './pages/RSVPConfirmation';

function App() {
  return (
    <EventsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/rsvp-confirmation/:id" element={<RSVPConfirmation />} />
          </Routes>
        </Layout>
      </Router>
    </EventsProvider>
  );
}

export default App;
