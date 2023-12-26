import { buildBoardDivElement } from ".";
import { RichSudoku } from "../types";
import { logProgress } from "../util";

export type BuildSudokuDivElementOptions = {
    classNames?: string[];
}
  
export const buildSudokuDivElement = (richSudoku: RichSudoku, options?: BuildSudokuDivElementOptions): HTMLDivElement => {
    const {number, difficulty} = richSudoku;

    const sudokuDivElement = document.createElement('div');
    sudokuDivElement.className = `sudoku${
        options?.classNames
        ? options.classNames.reduce((accumm, className) => accumm+` ${className}`, '')
        : ''
    }`;

    const header = document.createElement('h1');
    header.innerText = `${number}: ${
        difficulty === 'easy'
        ? 'Fácil'
        : difficulty === 'medium'
        ? 'Media'
        : difficulty === 'hard'
        ? 'Difícil'
        : difficulty === 'expert'
        ? 'Experto'
        : difficulty === 'master'
        ? 'Maestro'
        : 'Indefinido'
    }`;
    sudokuDivElement.append(header);

    const boardDivElement = buildBoardDivElement(richSudoku.unsolved);
    sudokuDivElement.append(boardDivElement);

    return sudokuDivElement;
}

type buildSudokuDivElementCbOnBuild = (sudokuDivElement: HTMLDivElement) => void;

const buildSudokuDivElementCb = (
    richSudokuIndex: number, 
    allSudokus: RichSudoku[],
    onBuilt: buildSudokuDivElementCbOnBuild
) => {
    if (richSudokuIndex >= allSudokus.length) return;
  
    logProgress((richSudokuIndex+1)/allSudokus.length);
  
    const richSudoku = allSudokus[richSudokuIndex];
    const sudokuDivElement = buildSudokuDivElement(richSudoku, {classNames: ['break']});
    onBuilt(sudokuDivElement);
  
    buildSudokuDivElementCb(richSudokuIndex+1, allSudokus, onBuilt);
}
  
export const batchBuildSudokus = (allSudokus: RichSudoku[], onBuilt: buildSudokuDivElementCbOnBuild) => buildSudokuDivElementCb(0, allSudokus, onBuilt);
