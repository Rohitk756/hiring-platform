// src/components/AssessmentForm.js
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AssessmentForm = ({ job }) => {
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''] }]);

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''] }]);
    };

    const handleQuestionChange = (index, e) => {
        const newQuestions = questions.map((q, i) => i === index ? { ...q, question: e.target.value } : q);
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, e) => {
        const newQuestions = questions.map((q, i) => i === qIndex ? {
            ...q,
            options: q.options.map((opt, j) => j === oIndex ? e.target.value : opt)
        } : q);
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save assessment to the job
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Typography variant="h5">Create Assessment for {job.title}</Typography>
            {questions.map((q, qIndex) => (
                <div key={qIndex}>
                    <TextField
                        label={`Question ${qIndex + 1}`}
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, e)}
                        fullWidth
                        required
                    />
                    {q.options.map((opt, oIndex) => (
                        <TextField
                            key={oIndex}
                            label={`Option ${oIndex + 1}`}
                            value={opt}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                            fullWidth
                            required
                        />
                    ))}
                </div>
            ))}
            <Button variant="contained" color="primary" onClick={addQuestion}>Add Question</Button>
            <Button type="submit" variant="contained" color="primary">Save Assessment</Button>
        </Form>
    );
};

export default AssessmentForm;
