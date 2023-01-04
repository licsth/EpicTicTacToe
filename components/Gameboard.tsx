import { FunctionComponent, useState } from "react";
import { range, isEqual, times } from "lodash";
import { TicTacToe } from "./TicTacToe";
import React from "react";
import { classNames } from "../utilities/classNames";
import { checkWinner } from "../utilities/checkWinner";

export const Gameboard: FunctionComponent = ({}) => {
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [currentBoard, setCurrentBoard] = useState<number[] | null>(null);
  const [winner, setWinner] = useState<boolean | null>(null);

  const [board, setBoard] = useState<(boolean | null)[][]>(
    times(3, () => times(3, () => null))
  );

  function onWin(i: number, j: number, winner: boolean) {
    if (board[i][j] != null) return;
    const newBoard = [...board];
    newBoard[i] = [...board[i]];
    newBoard[i][j] = winner;
    setBoard(newBoard);
    setWinner(checkWinner(newBoard));
  }

  return (
    <div className="grid justify-center content-center h-screen bg-slate-800">
      <h1 className="absolute text-center text-2xl w-full text-white top-10 font-mono">
        {winner == null && (
          <p>
            It&apos;s{" "}
            <span
              className={currentPlayer ? "text-orange-400" : "text-sky-400"}
            >
              {currentPlayer ? "orange's" : "blue's"}
            </span>{" "}
            turn.
          </p>
        )}
        {winner != null && (
          <p>
            <span className={winner ? "text-orange-400" : "text-sky-400"}>
              {winner ? "Orange" : "Blue"}
            </span>{" "}
            won!
          </p>
        )}
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {range(3).map((i) => (
          <React.Fragment key={i}>
            {range(3).map((j) => (
              <div
                className={classNames(
                  "p-2 rounded",
                  board[i][j] != null &&
                    (board[i][j] ? "bg-orange-700" : "bg-sky-700")
                )}
                key={j}
              >
                <TicTacToe
                  currentPlayer={currentPlayer}
                  onWin={(w) => onWin(i, j, w)}
                  active={
                    winner == null &&
                    (isEqual([i, j], currentBoard) || currentBoard === null)
                  }
                  onMoveDone={(i, j) => {
                    setCurrentPlayer(!currentPlayer);
                    setCurrentBoard([i, j]);
                  }}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
