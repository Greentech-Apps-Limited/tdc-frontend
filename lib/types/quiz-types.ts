
export type Question = {
    id: number;
    text: string;
    right_answer: string;
    option_2: string;
    option_3: string;
    option_4: string;
    difficulty_level: number;
    categories: number[];
};


export type QuizSubmission = {
    correct_answers_count: number,
    time_in_seconds: number,
    total_questions: number,
    time_per_question: number

}