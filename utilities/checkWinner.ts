import { range } from 'lodash';


export function checkWinner(board: (boolean | null)[][]): boolean | null {
  for (let i in range(3)) {
    const row = board.map(b => b[i]);
    const col = board[i];
    if (row.every(r => r === true)) return true;
    if (row.every(r => r === false)) return false;
    if (col.every(r => r === true)) return true;
    if (col.every(r => r === false)) return false;
  }
  const diag1 = board.map((b, i) => b[i]);
  if (diag1.every(r => r === true)) return true;
  if (diag1.every(r => r === false)) return false;
  const diag2 = board.map((b, i) => b[2 - i]);
  if (diag2.every(r => r === true)) return true;
  if (diag2.every(r => r === false)) return false;
  return null;
}