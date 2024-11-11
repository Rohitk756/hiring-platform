// src/pages/CandidateDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { JobContext } from '../state/jobContext';

const CandidateDetailContainer = styled.div`
  padding: 20px;
  margin-left: 20%;
`;

const CandidateHeader = styled.h2`
  margin-bottom: 20px;
`;

const CandidateInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
    margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-right: 10px;
`;

const Info = styled.p`
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

const CandidateDetail = () => {
    const { id } = useParams();  // Get the candidate's ID from the URL
    const [candidate, setCandidate] = useState(null);
    const navigate = useNavigate();  // To redirect after status change
    const { state, dispatch } = useContext(JobContext);


    useEffect(() => {
        const filterCandidate = state.candidates.filter(candidate =>
            candidate.id === Number(id)
        )

        console.log(filterCandidate, state.candidates, id);

        if (filterCandidate) {
            setCandidate(filterCandidate[0]);
        }


    }, [id]);

    console.log(candidate);

    const handleStatusChange = (newStatus) => {
        setCandidate(prev => ({
            ...prev,
            status: newStatus
        }));

        dispatch({
            type: 'UPDATE_CANDIDATE_STATUS',
            payload: {
                jobId: candidate.jobId,
                candidateId: Number(id),
                newStatus
            }
        });
        // Optionally redirect to another page after status update
        navigate(`/job/${id}`)
    };

    console.log(candidate);

    if (!candidate) return <div>Loading...</div>;

    return (
        <CandidateDetailContainer>
            <CandidateHeader>{candidate.name}'s Profile</CandidateHeader>
            <CandidateInfo>
                <Label>Email:</Label>
                <Info>{candidate.email}</Info>
            </CandidateInfo>
            <CandidateInfo>
                <Label>Contact:</Label>
                <Info>{candidate.contact}</Info>
            </CandidateInfo>
            <CandidateInfo>
                <Label>Skills:</Label>
                <Info>{candidate.skills}</Info>
            </CandidateInfo>
            <CandidateInfo>
                <Label>Experience:</Label>
                <Info>{candidate.experience}</Info>
            </CandidateInfo>
            <CandidateInfo>
                <Label>Resume:</Label>
                <ResumeLink href={candidate.resumeLink} target="_blank">Download Resume</ResumeLink>
            </CandidateInfo>
            <CandidateInfo>
                <Label>Status:</Label>
                <StatusSelect value={candidate.status} onChange={(e) => handleStatusChange(e.target.value)}>
                    <option value="Under Review">Under Review</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                </StatusSelect>
            </CandidateInfo>
        </CandidateDetailContainer>
    );
};

export default CandidateDetail;
