import { Board, Difficulty } from "sudoku-core";

export type RichSudoku = {
    number: number;
    difficulty: Difficulty
    unsolved: Board;
    solved: Board;
}

export type DifficultyAmount = {
    difficulty: Difficulty;
    amoutnOfSudokus: number;
}

export type Config = {
    quantity: DifficultyAmount[];
}

export type UpdateProgressBar = (newProgressValue: number) => void;
export type IndependentCallback = () => void;
