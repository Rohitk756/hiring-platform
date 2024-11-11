// src/pages/Dashboard.js
import React, { useState } from 'react';
import JobForm from '../components/JobForm';  // Import the JobForm component
import styled from 'styled-components';
import JobCard from '../components/JobCard';

export const DashboardContainer = styled.div`
margin-left: 20%;
`;

export const AddJobButton = styled.button`
  background-color: #1abc9c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    background-color: #16a085;
  }
`;

const JobPosting = () => {
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Software Engineer', description: 'Develop and maintain web applications', candidates: 5 },
        { id: 2, title: 'Product Manager', description: 'Oversee product development and strategy', candidates: 3 },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    const handleAddJob = (newJob) => {
        setJobs([...jobs, newJob]);
        setShowForm(false);
    };

    const handleEditJob = (jobToEdit) => {
        setEditingJob(jobToEdit);
        setShowForm(true);
    };

    const handleUpdateJob = (updatedJob) => {
        const updatedJobs = jobs.map((job) =>
            job.id === updatedJob.id ? updatedJob : job
        );
        setJobs(updatedJobs);
        setShowForm(false);
        setEditingJob(null);
    };

    const handleDeleteJob = (id) => {
        const filteredJobs = jobs.filter((job) => job.id !== id);
        setJobs(filteredJobs);
    };

    return (
        <DashboardContainer>
            <h2>Job Postings</h2>
            <AddJobButton onClick={() => setShowForm(true)}>Add Job</AddJobButton>

            {/* Render Job Form for Adding or Editing */}
            {showForm && (
                <JobForm
                    job={editingJob}  // Pass the job to be edited (null for adding new job)
                    onSubmit={editingJob ? handleUpdateJob : handleAddJob}  // Determine if it's Add or Edit
                />
            )}

            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    onEdit={() => handleEditJob(job)}  // Pass the job to be edited
                    onDelete={handleDeleteJob}
                />
            ))}
        </DashboardContainer>
    );
};

export default JobPosting;
