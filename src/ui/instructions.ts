const buildInstructionListItemElement = (textCopy: string): HTMLLIElement => {
    const instructionListItemElement = document.createElement('li');
    instructionListItemElement.innerText = textCopy;
    return instructionListItemElement;
}

export const buildInstructionsDivElement = (): HTMLDivElement => {
    let ARE_INSTRUCTION_VISIBLE = false;
    
    // UI - Elements
    const instructionDivElement = document.createElement('div');
    instructionDivElement.className = 'instruction';

    const toggleInstructionsVisibilityButtonElement = document.createElement('button');
    toggleInstructionsVisibilityButtonElement.innerText = 'How to use?';
    
    const instructionUnorderedListElement = document.createElement('ul');
    instructionUnorderedListElement.className = 'd-none';
    [
        'Set the difficulty and the number of sudokus for each difficulty, using the select and number input.',
        'The output puzzles with keep the order in which they were defined.',
        'The generate CTA generates and stores the puzzles in the localStorage. Also, the progress is shown in the progress-bar.',
        'The generate process may take some as the puzzles are being generated and solved.',
        'The export CTA generates a pdf file based on the puzzles stored in the localStorage.',
        'The generate CTA should be called before the export CTA (💩-UX).',
    ].map(buildInstructionListItemElement)
    .forEach(instructionListItemElement => instructionUnorderedListElement.append(instructionListItemElement));

    instructionDivElement.append(toggleInstructionsVisibilityButtonElement);
    instructionDivElement.append(instructionUnorderedListElement);

    // Event Listener Handlers
    const handleChangeInstructionVisibility = () => {
        ARE_INSTRUCTION_VISIBLE = !ARE_INSTRUCTION_VISIBLE;
        instructionUnorderedListElement.className = ARE_INSTRUCTION_VISIBLE ? '' : 'd-none';
        toggleInstructionsVisibilityButtonElement.className = ARE_INSTRUCTION_VISIBLE ? 'active' : '';
    };
    toggleInstructionsVisibilityButtonElement.addEventListener('click', handleChangeInstructionVisibility);

    return instructionDivElement;
}
