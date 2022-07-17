import { FunctionComponent, useState } from "react";
import { classNames } from "../utilities/classNames";
import React from "react";
import { checkWinner } from "../utilities/checkWinner";

interface Props {
  active: boolean;
  currentPlayer: boolean;
  onMoveDone: (i: number, j: number) => void;
  onWin: (player: boolean) => void;
}

export const TicTacToe: FunctionComponent<Props> = ({
  active,
  currentPlayer,
  onMoveDone,
  onWin,
}) => {
  const [board, setBoard] = useState<boolean[][]>(
    new Array(3).fill(new Array(3).fill(null))
  );

  function onClick(i: number, j: number) {
    if (!active) return;
    const newBoard = [...board];
    newBoard[i] = [...board[i]];
    newBoard[i][j] = currentPlayer;
    setBoard(newBoard);
    onMoveDone(i, j);
    const winner = checkWinner(newBoard);
    if (winner != null) onWin(winner);
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((b, j) => (
            <div
              key={j}
              onClick={() => b == null && onClick(i, j)}
              className={classNames(
                "w-7 h-7 rounded shadow",
                b == null && (active ? "bg-slate-400" : "bg-slate-600"),
                b != null && (b ? "bg-orange-500" : "bg-sky-500"),
                active && b == null && "cursor-pointer"
              )}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
