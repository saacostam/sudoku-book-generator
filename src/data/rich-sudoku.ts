import { Difficulty, generate, solve } from "sudoku-core";

import { Config, DifficultyAmount, RichSudoku, UpdateProgressBar } from "../types";
import { logProgress } from "../util";

const KEY = 'sudoku';

// TODO: Make test for the following function
export const useQueryRangeDifficulty = (config: Config): (sudokuNumber: number) => Difficulty => {
    const isInputInvalid = config.quantity.some((curr: DifficultyAmount) => curr.amoutnOfSudokus <= 0);

    if (isInputInvalid) {
        const MESSAGE = 'Invalid Input! Please use values higher than 0';
        alert(MESSAGE)
        throw new Error(MESSAGE);
    }

    const prefixSums = config.quantity.reduce((prefixSums: number[], curr: DifficultyAmount, currentIndex) => {
        prefixSums.push( prefixSums[currentIndex] + curr.amoutnOfSudokus );
        return prefixSums;
    }, [0]);
    prefixSums.shift();

    const difficultyByRange: Difficulty[] = config.quantity.map((curr: DifficultyAmount) => curr.difficulty);

    const getDifficulty = (sudokuNumber: number): Difficulty => {
        let rangeIndex = 0;
        while (rangeIndex+1 < prefixSums.length && sudokuNumber > prefixSums[rangeIndex]) rangeIndex++;
        return difficultyByRange[rangeIndex];
    }

    return getDifficulty;
}

export const storeListOfSudokus = (config: Config, logProgressCb?: UpdateProgressBar) => {
    const totalNumberOfSudokus = config.quantity.reduce((total: number, curr: DifficultyAmount) => total + curr.amoutnOfSudokus, 0);
    const getDifficulty = useQueryRangeDifficulty(config);

    const allSudokus: RichSudoku[] = [];
    
    const storeListOfSudokusCb = (iter: number) => {
        if (iter > totalNumberOfSudokus) return localStorage.setItem(KEY, JSON.stringify(allSudokus));

        const difficulty = getDifficulty(iter);
    
        const unsolved = generate(difficulty);
        const solved = solve(unsolved);
        
        if (!solved.board) throw new Error('Unsolvable sudoku');
        
        const rickSudoku: RichSudoku = {
            number: iter,
            difficulty: difficulty,
            unsolved: unsolved,
            solved: solved.board,
        } 
        
        allSudokus.push(rickSudoku);
            
        const ratioCompleted = iter/totalNumberOfSudokus;
        
        const progressHandler = logProgressCb ?? logProgress;
        progressHandler(ratioCompleted);
    
        setTimeout(() => storeListOfSudokusCb(iter+1), 0);
    }
    
    storeListOfSudokusCb(1);
}

export const getListOfSudokus = (): RichSudoku[] => JSON.parse(localStorage.getItem(KEY) || '[]') as unknown as RichSudoku[];

export const getTotalPages = (nTotal: number, pageSize: number) => Math.floor((nTotal - 1)/pageSize) + 1;

export const paginateListOfSudokus = (listOfSudokus: RichSudoku[], pageSize: number): RichSudoku[][] => {
    const paginatedListOfSudokus: RichSudoku[][] = [];

    const totalPages = getTotalPages(listOfSudokus.length, pageSize);
    for (let pageNum = 0; pageNum < totalPages; pageNum++){
        const start = pageSize*pageNum;
        const end = (pageSize*(pageNum + 1)) - 1; // inclusive

        const page: RichSudoku[] = [];
        for (let sudokuIndex = start; sudokuIndex <= end; sudokuIndex++) {
            if (sudokuIndex < listOfSudokus.length) page.push(listOfSudokus[sudokuIndex]);
        };

        paginatedListOfSudokus.push(page);
    }

    return paginatedListOfSudokus;
}
