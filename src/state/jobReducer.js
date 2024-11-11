export default (state, action) => {
    console.log(action, state);
    switch (action.type) {
        case 'ADD_JOB':
            return { ...state, jobs: [...state.jobs, action.payload] };

        case 'ADD_QUESTION': {
            const { jobId, question } = action.payload;
            const jobAssessments = state.assessments[jobId] || [];
            return {
                ...state,
                assessments: {
                    ...state.assessments,
                    [jobId]: [...jobAssessments, question],
                },
            };
        }

        case 'UPDATE_QUESTION': {
            const { jobId, questionId, updatedQuestion } = action.payload;
            const jobAssessments = state.assessments[jobId].map((question, index) =>
                index === questionId ? updatedQuestion : question
            );
            return {
                ...state,
                assessments: {
                    ...state.assessments,
                    [jobId]: jobAssessments,
                },
            };
        }

        case 'DELETE_QUESTION': {
            const { jobId, questionId } = action.payload;
            const updatedAssessments = state.assessments[jobId].filter((_, index) => index !== questionId);
            return {
                ...state,
                assessments: {
                    ...state.assessments,
                    [jobId]: updatedAssessments,
                },
            };
        }

        // New action to save the entire assessment for a job
        case 'SAVE_ASSESSMENT': {
            const { jobId, questions } = action.payload;
            return {
                ...state,
                assessments: {
                    ...state.assessments,
                    [jobId]: questions,
                },
            };
        }

        case 'UPDATE_CANDIDATE_STATUS':
            return {
                ...state,
                candidates: state.candidates.map(candidate =>
                    candidate.id === action.payload.id
                        ? { ...candidate, status: action.payload.status }
                        : candidate
                ),
            };

        default:
            return state;
    }
};
