import { Answers } from "./answers";

export class Question {
    id: number;
    description: string;
    questionPicture: string;
    answers: Answers[];
}
