import { Difficulty } from "sudoku-core";

import { DIFFICULTIES } from "../constants";
import { Config, DifficultyAmount } from "../types";

type BuildDifficultyControlDivElementOptions = {
    label?: string;
}

const buildDifficultyControlDivElement = (options?: BuildDifficultyControlDivElementOptions) => {
    const difficultyControlDivElement = document.createElement('div');
    difficultyControlDivElement.className = 'diff-control';

    // Label
    const labelLabelElement = document.createElement('label');
    labelLabelElement.className = 'label';
    labelLabelElement.innerText = options?.label ? options.label : '◾️';
    difficultyControlDivElement.append(labelLabelElement);

    // Select - Difficulty
    const difficultySelectElement = document.createElement('select');
    for (const DIFFICULTY of DIFFICULTIES){
        const difficultyOptionElement = new Option(DIFFICULTY, DIFFICULTY);
        difficultySelectElement.append(difficultyOptionElement);
    }
    difficultyControlDivElement.append(difficultySelectElement);

    // Input - Amount
    const amountInputElement = document.createElement('input');
    amountInputElement.type = 'number';
    amountInputElement.value = '1';
    amountInputElement.min = '1';
    difficultyControlDivElement.append(amountInputElement);

    // Button4Delete
    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.type = 'button';
    deleteButtonElement.innerText = 'Delete';
    difficultyControlDivElement.append(deleteButtonElement);

    // Listeners
    deleteButtonElement.addEventListener('click', () => difficultyControlDivElement.remove());

    return difficultyControlDivElement;
}

export const buildConfigDivElement = (): [HTMLDivElement, () => Config] => {
    const configDivElement = document.createElement('div');
    configDivElement.className = 'config';

    const header = document.createElement('h1');
    header.innerText = '① Sudoku Book Generator ⑨';
    configDivElement.append(header);

    const getConfig = () => {
        const config: Config = {
            quantity: [],
        };

        configDivElement.childNodes.forEach(
            childNode => {
                if (childNode instanceof HTMLElement && childNode.classList.contains('diff-control')){
                    const difficultyAmount: DifficultyAmount = {
                        difficulty: 'easy',
                        amoutnOfSudokus: 0,
                    };

                    // Select - Difficulty
                    const selectNode = childNode.querySelector<HTMLSelectElement>('select');
                    if (selectNode) difficultyAmount.difficulty = (selectNode.value as unknown as Difficulty);

                    // Input - Amount
                    const inputNode = childNode.querySelector<HTMLInputElement>('input');
                    if (inputNode) difficultyAmount.amoutnOfSudokus = +inputNode.value;

                    config.quantity.push(difficultyAmount);
                }
            }
        )

        return config;
    }

    // DifficultyControl - DEFAULT: 1
    const testDifficultyControlDivElement = buildDifficultyControlDivElement();
    configDivElement.append(testDifficultyControlDivElement);

    // Add button
    const addButtonElement = document.createElement('button');
    addButtonElement.innerText = 'New Difficulty';

    const handleAddDifficultyControlDivElement = () => {
        const testDifficultyControlDivElement = buildDifficultyControlDivElement();
        configDivElement.insertBefore(testDifficultyControlDivElement, addButtonElement);
    }
    addButtonElement.addEventListener('click', handleAddDifficultyControlDivElement);
    configDivElement.append(addButtonElement);

    return [configDivElement, getConfig];
}
