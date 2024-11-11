// src/pages/Assessment.js
import React, { useContext } from 'react';
import { JobContext } from '../state/jobContext';
import AssessmentForm from '../components/AssessmentForm';
import { Container, Typography } from '@material-ui/core';
import styled from 'styled-components';

const AssessmentContainer = styled(Container)`
  padding: 20px;
`;

const Assessment = () => {
    const { state } = useContext(JobContext);

    return (
        <AssessmentContainer>
            <Typography variant="h4">Create Assessments</Typography>
            {state.jobs.map(job => (
                <AssessmentForm key={job.id} job={job} />
            ))}
        </AssessmentContainer>
    );
};

export default Assessment;
