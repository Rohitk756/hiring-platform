// src/components/JobForm.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #1abc9c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #16a085;
  }
`;

const JobForm = ({ job, onSubmit }) => {
    const [jobTitle, setJobTitle] = useState(job ? job.title : '');
    const [jobDescription, setJobDescription] = useState(job ? job.description : '');

    useEffect(() => {
        if (job) {
            setJobTitle(job.title);
            setJobDescription(job.description);
        }
    }, [job]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (jobTitle && jobDescription) {
            const newJob = {
                id: job ? job.id : Math.random(),
                title: jobTitle,
                description: jobDescription,
                candidates: job ? job.candidates : 0,
            };
            onSubmit(newJob);
            setJobTitle('');
            setJobDescription('');
        } else {
            alert('Please fill in both fields');
        }
    };

    return (
        <FormContainer>
            <h3>{job ? 'Edit Job' : 'Create New Job'}</h3>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <Label>Job Title</Label>
                    <Input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Enter job title"
                    />
                </FormField>
                <FormField>
                    <Label>Job Description</Label>
                    <Textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Enter job description"
                        rows="4"
                    />
                </FormField>
                <Button type="submit">{job ? 'Update Job' : 'Create Job'}</Button>
            </form>
        </FormContainer>
    );
};

export default JobForm;
