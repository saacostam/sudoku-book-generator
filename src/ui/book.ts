import { batchBuildSudokus, batchBuildSolutionPageDivElement } from '.';
import {paginateListOfSudokus} from '../data';
import { IndependentCallback, RichSudoku } from '../types';

export const buildBookDivElement = (app: HTMLDivElement, allSudokus: RichSudoku[], onSuccess: IndependentCallback) => {
    batchBuildSudokus(allSudokus, (el) => app.append(el));

    const paginatedListOfSudokus = paginateListOfSudokus(allSudokus, 6);
    batchBuildSolutionPageDivElement(paginatedListOfSudokus, (el) => app.append(el), onSuccess);
}
