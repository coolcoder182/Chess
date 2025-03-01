import { getPeiceColor } from "../utils";

export const generateKnightMoves = (state, selectedPeice, currentIndex) => {
    const {
        board
    } = state;
    const selectedPeiceColor = getPeiceColor(selectedPeice);
    const availableMoves = [];
    const moves = [
        { move1: -16, move2: 1 }, // Move 2 rows up, then 1 right
        { move1: -16, move2: -1 }, // Move 2 rows up, then 1 left
        { move1: -8, move2: 2 }, // Move 1 row up, then 2 right
        { move1: -8, move2: -2 }, // Move 1 row up, then 2 left
        { move1: 16, move2: 1 }, // Move 2 rows down, then 1 right
        { move1: 16, move2: -1 }, // Move 2 rows down, then 1 left
        { move1: 8, move2: 2 }, // Move 1 row down, then 2 right
        { move1: 8, move2: -2 }, // Move 1 row down, then 2 left
    ];

    for (const move of moves) {
        let firstMove = currentIndex + move.move1;

        if (firstMove >= 0 && firstMove <= 63) {
            let secondMove = firstMove + move.move2;
            if (getPeiceColor(board[secondMove]) === selectedPeiceColor) {
                continue;
            } 
            const isLeftMove = move.move2 < 0;
            if (isLeftMove) {
                if (firstMove % 8 >= Math.abs(move.move2)) {
                    availableMoves.push(secondMove);
                }                
            } else {
                if (7 - (firstMove % 8) >= move.move2) {
                    availableMoves.push(secondMove);
                }
            }
        }
    }
    return availableMoves;
}