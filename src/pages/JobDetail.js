// src/pages/JobDetail.js
import React, { useState, useEffect, useContext } from 'react';
import CandidateList from '../components/CandidateList';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { JobContext } from '../state/jobContext';

const JobDetailContainer = styled.div`
  padding: 20px;
  margin-left: 1;
`;

const JobDetailHeader = styled.h2`
  margin-bottom: 20px;
`;

const JobDetailDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

const JobDetail = () => {
    const { id } = useParams();  // Get the job ID from the URL
    const [job, setJob] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const { state, dispatch } = useContext(JobContext);

    useEffect(() => {
        setCandidates(state.candidates);
        setJob(state.jobs);
    }, [id]);

    const handleStatusChange = (candidateId, newStatus) => {
        const updatedCandidates = candidates.map((candidate) =>
            candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
        );
        setCandidates(updatedCandidates);
        dispatch({ type: 'UPDATE_CANDIDATE_STATUS', payload: { candidateId, newStatus } });
    };

    return (
        <JobDetailContainer>
            {job ? (
                <>
                    <JobDetailHeader>{job.title}</JobDetailHeader>
                    <JobDetailDescription>{job.description}</JobDetailDescription>
                    <CandidateList candidates={candidates} job={job} onStatusChange={handleStatusChange} />
                    <Link to="/create-assessment">
                        <button>Create Job Assessment</button>
                    </Link>
                </>
            ) : (
                <p>Loading job details...</p>
            )}
        </JobDetailContainer>
    );
};

export default JobDetail;
