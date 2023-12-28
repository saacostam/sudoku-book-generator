import { clear, buildBookDivElement, buildProgressBar } from ".";
import { getListOfSudokus, storeListOfSudokus } from "../data";
import { Config } from "../types";

export const buildControlDivElement = (
    app: HTMLDivElement,
    getConfig: () => Config,
): HTMLDivElement => {
    // UI Elements Composition
    const controlWrapperDivElement = document.createElement('div');
    
    const generateButton = document.createElement('button');
    generateButton.innerText = 'Generate';
    
    const exportButton = document.createElement('button');
    exportButton.innerText = 'Export';

    const [progressElement, updateProgressbar] = buildProgressBar();

    controlWrapperDivElement.append(generateButton);
    controlWrapperDivElement.append(exportButton);
    controlWrapperDivElement.append(progressElement);

    // Event Listeners Handlers
    const exportHandler = () => {
        clear(app);
        const allSudokus = getListOfSudokus();
        buildBookDivElement(app, allSudokus, () => {
            window.print(); 
        });
    }

    const generateHandler = () => {
        const config = getConfig();
        storeListOfSudokus(config, updateProgressbar);
    }

    generateButton.addEventListener('click', generateHandler);
    exportButton.addEventListener('click', exportHandler);

    return controlWrapperDivElement;
}