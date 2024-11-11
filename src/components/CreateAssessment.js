import React, { useState, useContext } from 'react';
import { JobContext } from '../state/jobContext';
import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  margin-left: 7%;
  display: flex;
  padding : 20px;
  flex-direction: column;
`;

const AssessmentContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin: 5px 0;
`;

const Textarea = styled.textarea`
  padding: 8px;
  margin: 5px 0;
  min-height: 100px;
`;

const Button = styled.button`
  width: fit-content;
  padding: 10px 20px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #16a085;
  }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;


const QuestionCard = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
`;

const OptionInput = styled.input`
  margin-top: 5px;
`;

const QuestionList = styled.div`
  margin-top: 15px;
  margin-left: 150px;
`;

const Select = styled.select`
    padding: 8px;
    margin: 5px 0;
`;


const CreateAssessment = () => {
    const { state, dispatch } = useContext(JobContext);
    const [selectedJob, setSelectedJob] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [error, setError] = useState('');

    const handleJobChange = (e) => {
        setSelectedJob(e.target.value);
    };

    const handleAddOption = () => {
        if (options.length >= 4) {
            setError('A question can have a maximum of 4 options.');
            return;
        }
        setOptions([...options, '']);
        setError('');
    };

    // Handle changing the value of an option
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    // Handle adding a question to the assessment
    const handleAddQuestion = () => {
        if (!question || options.length < 2 || !answer) {
            setError('Please provide a question, at least two options, and an answer.');
            return;
        }
        const newQuestion = { question, options, answer };

        if (editingIndex !== null) {
            // If we are editing a question, update it in the state
            dispatch({
                type: 'UPDATE_QUESTION',
                payload: { jobId: selectedJob, questionId: editingIndex, updatedQuestion: newQuestion },
            });
            setEditingIndex(null);  // Reset editing state
        } else {
            // If it's a new question, add it to the state
            dispatch({
                type: 'ADD_QUESTION',
                payload: { jobId: selectedJob, question: newQuestion },
            });
        }

        setQuestion('');
        setOptions([]);
        setAnswer('');
        setError('');
    };

    // Handle editing a question
    const handleEditQuestion = (index) => {
        const questionToEdit = state.assessments[selectedJob][index];
        setQuestion(questionToEdit.question);
        setOptions(questionToEdit.options);
        setAnswer(questionToEdit.answer);
        setEditingIndex(index);
    };

    const handleDeleteQuestion = (index) => {
        dispatch({
            type: 'DELETE_QUESTION',
            payload: { jobId: selectedJob, questionId: index },
        });
    };

    const handleSubmit = () => {
        if (!selectedJob) {
            setError('Please select a job.');
            return;
        }
        if (!state.assessments[selectedJob] || state.assessments[selectedJob].length === 0) {
            setError('Please add at least one question.');
            return;
        }
        setError('');
        console.log(`Saving assessment for job: ${selectedJob} `);

        // Dispatch SAVE_ASSESSMENT action to save the questions to the store
        dispatch({
            type: 'SAVE_ASSESSMENT',
            payload: { jobId: selectedJob, questions: state.assessments[selectedJob] },
        });

        // Reset state or show success message
        alert('Assessment saved successfully!');
    };

    return (
        <Container>
            <AssessmentContainer>
                <Title>Create or Edit Assessment</Title>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Form>
                    <Label>Choose Job</Label>
                    <Select value={selectedJob} onChange={handleJobChange}>
                        <option value="">Select a job</option>
                        {state.jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                                {job.title}
                            </option>
                        ))}
                    </Select>

                    <Label>Question</Label>
                    <Textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter the question"
                    />

                    <Label>Options</Label>
                    {options.map((option, index) => (
                        <OptionInput
                            key={index}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1} `}
                        />
                    ))}
                    <Button type="button" onClick={handleAddOption}>
                        Add Option
                    </Button>

                    <Label>Answer</Label>
                    <Input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter the correct answer"
                    />

                    <Button type="button" onClick={handleAddQuestion}>
                        {editingIndex !== null ? 'Update Question' : 'Add Question'}
                    </Button>

                </Form>
                <Button type="button" onClick={handleSubmit}>
                    Save Assessment
                </Button>
            </AssessmentContainer>

            <QuestionList>
                {state.assessments[selectedJob]?.map((q, index) => (
                    <QuestionCard key={index}>
                        <h3>Question {index + 1}: {q.question}</h3>
                        <p>Options:</p>
                        <ul>
                            {q.options.map((opt, idx) => (
                                <li key={idx}>{opt}</li>
                            ))}
                        </ul>
                        <p>Answer: {q.answer}</p>
                        <ButtonContainer>
                            <Button type="button" onClick={() => handleEditQuestion(index)}>
                                Edit Question
                            </Button>
                            <Button type="button" onClick={() => handleDeleteQuestion(index)}>
                                Delete Question
                            </Button>
                        </ButtonContainer>
                    </QuestionCard>
                ))}
            </QuestionList>


        </Container>
    );
};

export default CreateAssessment;
