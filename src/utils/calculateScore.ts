import { Question, Result } from "../types/assessmentTypes";

export const calculateScore = (questions: Question[]): number => {
   return questions.reduce((total, question) => {
    const score = question.options[0].score || 0;
    return total + score;
   }, 0);
};

export const getMaturityLevel = (score: number, results: Result[]): Result => {
    const result: Result[] = results.filter((result) => {
        return score >= result.range[0] && score <= result.range[1];
    })
    return result[0];
};