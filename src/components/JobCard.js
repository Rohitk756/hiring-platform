// src/components/JobCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const JobCard = ({ job, onEdit, onDelete }) => {
    return (
        <JobCardContainer >
            <Link to={`/job/${job.id}`}>
                <JobTitle>{job.title}</JobTitle>
            </Link>
            <JobDescription>{job.description}</JobDescription>
            <CandidatesCount>{job.candidates} Candidates Applied</CandidatesCount>
            <Button onClick={() => onEdit(job.id)}>Edit</Button>
            <Button onClick={() => onDelete(job.id)}>Delete</Button>
        </JobCardContainer>
    );
};

export default JobCard;

export const JobCardContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const JobTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

export const JobDescription = styled.p`
  margin: 10px 0;
  font-size: 14px;
  color: #555;
`;

export const CandidatesCount = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  color: #888;
`;

export const Button = styled.button`
  background-color: #1abc9c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #16a085;
  }
`;
