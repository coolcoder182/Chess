import { getPeiceColor } from "../utils";

export const generateKingMoves = (state, peice, index) => {
    const {
        board,
        casteling
    } = state;
    let canCastleQueen = false;
    let canCastleKing = false;
    const selectedPeiceColor = getPeiceColor(peice);
    const availableMoves = [];
    const possibleDirections = [
        -9, -8, -7, -1, 1, 7, 8, 9
    ];

    if (selectedPeiceColor === 'w') {
        canCastleKing = casteling.includes('K');
        canCastleQueen = casteling.includes('Q');
    } else {
        canCastleKing = casteling.includes('k');
        canCastleQueen = casteling.includes('q');
    }

    if (canCastleKing) {
        possibleDirections.push(2);
    }
    if (canCastleQueen) {
        possibleDirections.push(-2);
    }

    possibleDirections.forEach(possibleDirection => {
        const possibleIndex = index + possibleDirection;
        if (possibleDirection === 2 && board[index + 1] !== '') {
            return;
        }
        if (possibleDirection === -2 && (board[index - 1] !== '' || board[index - 3] !== '')) {
            return;
        }
        if (possibleIndex <= 63 && possibleIndex >=0) {
            //check left side
            if (index % 8 === 0 && (possibleDirection === -9 || possibleDirection === -1 || possibleDirection === 7)) {
                return;
            }
            // check right side
            if (index % 8 === 7 && (possibleDirection === -7 || possibleDirection === 1 || possibleDirection === 9)) {
                return;
            }
            if (getPeiceColor(board[possibleIndex]) !== selectedPeiceColor) {
                availableMoves.push(possibleIndex);
            }
        }
    });

    return availableMoves;
}


export const handleCastleMove = (state, newBoard, index) => {
    const {
        board,
        casteling,
        setCasteling,
        selectedIndex
    } = state;
    if(board[selectedIndex] === 'K') {
        if (casteling.includes('K') && index === 62) {
            newBoard[63] = '';
            newBoard[61] = 'R';
        } else if (casteling.includes('Q') && index === 58) {
            newBoard[56] = '';
            newBoard[59] = 'R';
        }
        let newCasteling = casteling.replace('K', '');
        newCasteling = newCasteling.replace('Q', '');
        if (newCasteling === '') {
            newCasteling = '-'
        }
        setCasteling(newCasteling);
    } else if (board[selectedIndex] === 'k') {
        if (casteling.includes('k') && index === 6) {
            newBoard[7] = '';
            newBoard[5] = 'r';
        } else if (casteling.includes('q') && index === 2) {
            newBoard[0] = '';
            newBoard[3] = 'r';
        }
        let newCasteling = casteling.replace('k', '');
        newCasteling = newCasteling.replace('q', '');
        if (newCasteling === '') {
            newCasteling = '-'
        }
        setCasteling(newCasteling);
    }
    return newBoard;
}