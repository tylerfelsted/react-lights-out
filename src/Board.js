import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let i = 0; i < nrows; i++) {
      let row = [];
      for(let j = 0; j < ncols; j++) {
        if(Math.random() <= chanceLightStartsOn) row.push(true);
        else row.push(false);
      }
      initialBoard.push(row);
    }
    // TODO-Completed: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    return board.every(r => {
      return r.every(c => c);
    });
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = JSON.parse(JSON.stringify(oldBoard));
      // TODO - completed: Make a (deep) copy of the oldBoard
      flipCell(y, x, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y+1, x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y, x+1, boardCopy);
      // TODO: in the copy, flip this cell and the cells around it
      return boardCopy;
      // TODO: return the copy
    });
  }

  if(hasWon()) {
    return <h1>You Win!</h1>
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO

  return (
    <table>
      <tbody>
      {board.map((r, i) => (
        <tr> 
          {
            r.map((c, j) => (
              <Cell flipCellsAroundMe={() => flipCellsAround(`${i}-${j}`)} isLit={c}/>  
            ))
          }
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Board;
