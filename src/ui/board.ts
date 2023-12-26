import { Board } from "sudoku-core";

export const buildBoardDivElement = (board: Board): HTMLDivElement => {
  const nBlocks = 3;
  const nCells = 3;

  const boardDivElement = document.createElement('div');
  boardDivElement.className = 'board';

  const createBlockDivElement = (xBlock: number, yBlock: number): HTMLDivElement => {
    const blockDivElement = document.createElement('div');
    blockDivElement.className = 'block';

    const xDelta = xBlock * nCells, yDelta = yBlock * nCells;

    let rowDivElement: HTMLDivElement = document.createElement('div');
    for (let yBlockRow = 0; yBlockRow < nCells; yBlockRow++){
      rowDivElement = document.createElement('div');
      rowDivElement.className = 'row';

      let cellDivElement: HTMLDivElement = document.createElement('div');
      for (let xBlockCol = 0; xBlockCol < nCells; xBlockCol++){
        const x = xDelta + xBlockCol, y = yDelta + yBlockRow;
        const val = board[( nBlocks * nCells * y) + x];

        cellDivElement = document.createElement('div');
        cellDivElement.className = 'cell';
        cellDivElement.innerText = val? `${val}` : " ";

        rowDivElement.append(cellDivElement)
      }

      blockDivElement.append(rowDivElement);
    }

    return blockDivElement;
  }  

  for (let yBlock = 0; yBlock < nBlocks; yBlock++){
    const bandDivElement = document.createElement('div');
    bandDivElement.className = 'band';

    for (let xBlock = 0; xBlock < nBlocks; xBlock++){
      const blockDivElement = createBlockDivElement(xBlock, yBlock);
      bandDivElement.append(blockDivElement);
    }

    boardDivElement.append(bandDivElement);
  }

  return boardDivElement;
}
