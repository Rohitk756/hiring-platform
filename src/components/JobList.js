// src/components/JobList.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../state/jobContext';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import styled from 'styled-components';

const JobItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`;

const JobList = ({ jobs }) => {
    const { dispatch } = useContext(JobContext);

    const deleteJob = (id) => {
        dispatch({ type: 'DELETE_JOB', payload: id });
    };

    return (
        <List>
            {jobs.map(job => (
                <JobItem key={job.id}>
                    <ListItemText
                        primary={job.title}
                        secondary={`${job.description.substring(0, 50)}...`}
                    />
                    <div>
                        <Button onClick={() => deleteJob(job.id)} color="secondary">Delete</Button>
                        <Button component={Link} to={`/job/${job.id}`} color="primary">View</Button>
                    </div>
                </JobItem>
            ))}
        </List>
    );
};

export default JobList;
