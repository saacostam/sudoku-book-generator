import { buildBoardDivElement } from ".";
import { IndependentCallback, RichSudoku } from "../types";

export const buildSolutionPageDivElement = (richSudokus: RichSudoku[]): HTMLDivElement => {
    if (richSudokus.length > 9) throw new Error('Trying to render more than 9 solutions in solution page');

    const solutionPageDivElement = document.createElement('div');
    solutionPageDivElement.className = 'solution-page break';

    const mainHeader = document.createElement('h1');
    mainHeader.innerText = 'Soluciones';
    solutionPageDivElement.append(mainHeader);

    const solutionBundleDivElement = document.createElement('div');
    solutionBundleDivElement.className = 'solution-bundle';
    solutionPageDivElement.append(solutionBundleDivElement);

    for (let i = 0; i < richSudokus.length; i++){
        const {solved: solvedBoard, number} = richSudokus[i];

        const solutionCardDivElement = document.createElement('div');
        solutionCardDivElement.className = 'solution-card';

        const header = document.createElement('h2');
        header.innerText = `#${number}`;
        solutionCardDivElement.append(header);

        const sudokuDivElement = buildBoardDivElement(solvedBoard);
        solutionCardDivElement.append(sudokuDivElement);

        solutionBundleDivElement.append(solutionCardDivElement);
    }

    return solutionPageDivElement;
}

type buildSolutionPageDivCbOnBuild = (sudokuDivElement: HTMLDivElement) => void;

const buildSolutionPageDivElementCb = (
    solutionPageIndex: number,
    pagesOfSudokus: RichSudoku[][],
    onBuilt: buildSolutionPageDivCbOnBuild,
    onSuccess: IndependentCallback,
) => {
    if (solutionPageIndex >= pagesOfSudokus.length) {
        onSuccess();
        return;
    };

    const solutionPage = pagesOfSudokus[solutionPageIndex];
    const solutionPageDivElement = buildSolutionPageDivElement(solutionPage);
    onBuilt(solutionPageDivElement);

    setTimeout(
        () => buildSolutionPageDivElementCb(solutionPageIndex+1, pagesOfSudokus, onBuilt, onSuccess),
        0,
    );
}

export const batchBuildSolutionPageDivElement = (pagesOfSudokus: RichSudoku[][], onBuilt: buildSolutionPageDivCbOnBuild, onSuccess: IndependentCallback) => buildSolutionPageDivElementCb(0, pagesOfSudokus, onBuilt, onSuccess);
