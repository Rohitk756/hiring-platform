import React, { createContext, useReducer } from 'react';
import jobReducer from './jobReducer';

const initJobs = [
    {
        id: 1,
        title: 'Software Engineer',
        description: 'We are looking for a software engineer to join our team.',
    },
    {
        id: 2,
        title: 'Frontend Developer',
        description: 'We are looking for a frontend developer to join our team.',
    },
    {
        id: 3,
        title: 'Backend Developer',
        description: 'We are looking for a backend developer to join our team.',
    },
]

const candidateData = [
    {
        id: 1,
        name: 'John Doe',
        applicationDate: '2024-11-05',
        resumeLink: '/path/to/resume1.pdf',
        status: 'Under Review',
        email: 'john.doe@example.com',
        contact: '555-1234',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: '5 years'
    },
    {
        id: 2,
        name: 'Jane Smith',
        applicationDate: '2024-11-06',
        resumeLink: '/path/to/resume2.pdf',
        status: 'Interview Scheduled',
        email: 'jane.smith@example.com',
        contact: '555-5678',
        skills: ['HTML', 'CSS', 'Redux'],
        experience: '3 years'
    },
];

const initialState = {
    jobs: initJobs,  // List of jobs
    assessments: {},  // Store assessments for each job,
    candidates: candidateData,  // List of candidates
};

export const JobContext = createContext(initialState);

export const JobProvider = ({ children }) => {
    const [state, dispatch] = useReducer(jobReducer, initialState);

    return (
        <JobContext.Provider value={{ state, dispatch }}>
            {children}
        </JobContext.Provider>
    );
};
