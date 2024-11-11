import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import JobDetail from './pages/JobDetail';
import Assessment from './pages/Assessment';
import { JobProvider } from './state/jobContext';
import { createGlobalStyle } from 'styled-components';
import JobPosting from './pages/Dashboard';
import CandidateDetail from './components/CandidateDetail';
import CreateAssessment from './components/CreateAssessment';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <JobProvider>
      <Router>
        <GlobalStyle />
        <Sidebar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/jobposting" element={<JobPosting />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/candidate/:id" element={<CandidateDetail />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/create-assessment" element={<CreateAssessment />} />
          </Routes>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;
