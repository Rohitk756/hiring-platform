// src/components/CandidateList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the candidate list
const CandidateCard = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CandidateDetails = styled.div`
  flex-grow: 1;
`;

const CandidateName = styled.h4`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const CandidateStatus = styled.span`
  background-color: ${props => (props.status === 'Under Review' ? '#f39c12' : '#27ae60')};
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;

const ResumeLink = styled.a`
  color: #1abc9c;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StatusSelect = styled.select`
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const CandidateList = ({ job, candidates, onStatusChange }) => {
  console.log(candidates);
  return (
    <div style={{ marginLeft: "20%" }} >
      <h3>Candidates for {job.title}</h3>
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id}>
          <CandidateDetails>
            <Link to={`/candidate/${candidate.id}`}>
              <CandidateName>{candidate.name}</CandidateName>
            </Link>
            <div>Application Date: {candidate.applicationDate}</div>
            <div>
              Resume: <ResumeLink href={candidate.resumeLink} target="_blank">Download</ResumeLink>
            </div>
          </CandidateDetails>
          <div>
            <CandidateStatus status={candidate.status}>{candidate.status}</CandidateStatus>
            <StatusSelect value={candidate.status} onChange={(e) => onStatusChange(candidate.id, e.target.value)}>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </StatusSelect>
          </div>
        </CandidateCard>
      ))}
    </div>
  );
};

export default CandidateList;
