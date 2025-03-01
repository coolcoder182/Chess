import { getPeiceColor } from "../utils";

export const generateSlidingMoves = (state, selectedPeice, currentIndex) => {
    let availableMoves = [];
    //bishop
    if (/[b]/.test(selectedPeice.toLowerCase())) {
        availableMoves.push(...getDiagonalMoves(state, currentIndex, selectedPeice));
    }
    //rook
    if (/[r]/.test(selectedPeice.toLowerCase())) {
        availableMoves.push(...getHorizontalMoves(state, currentIndex, selectedPeice));
    }
    //queen
    if (/[q]/.test(selectedPeice.toLowerCase())) {
        availableMoves.push(...getHorizontalMoves(state, currentIndex, selectedPeice));
        availableMoves.push(...getDiagonalMoves(state, currentIndex, selectedPeice));
    }
    return availableMoves;
}


const getHorizontalMoves = (state, currentIndex, selectedPeice) => {
    const {
        board
    } = state;
    const moves = [];
    let temp = currentIndex;
    const peiceColor = selectedPeice.toLowerCase() === selectedPeice ? 'b' : 'w';
    const enemyPeiceColor = peiceColor === 'w' ? 'b' : 'w';
    while (temp - 1 >= 0 && temp % 8 !== 0) {
        temp -= 1;
        if (getPeiceColor(board[temp]) === peiceColor) {
            break;
        } 
        if (getPeiceColor(board[temp]) === enemyPeiceColor) {
            moves.push(temp);
            break;
        }
        moves.push(temp);
    }

    temp = currentIndex;
    while (temp + 1 < 64 && temp % 8 !== 7) {
        temp += 1;
        if (getPeiceColor(board[temp]) === peiceColor) {
            break;
        } 
        if (getPeiceColor(board[temp]) === enemyPeiceColor) {
            moves.push(temp);
            break;
        }
        moves.push(temp);
    }

    temp = currentIndex;
    while (temp - 8 >= 0) {
        temp -= 8;
        if (getPeiceColor(board[temp]) === peiceColor) {
            break;
        } 
        if (getPeiceColor(board[temp]) === enemyPeiceColor) {
            moves.push(temp);
            break;
        }
        moves.push(temp);
    }

    temp = currentIndex;
    while (temp + 8 < 64) {
        temp += 8;
        if (getPeiceColor(board[temp]) === peiceColor) {
            break;
        } 
        if (getPeiceColor(board[temp]) === enemyPeiceColor) {
            moves.push(temp);
            break;
        }
        moves.push(temp);
    }
    return moves;
}

const getDiagonalMoves = (state, currentIndex, selectedPeice) => {
    const {
        board
    } = state;
    const availableMoves = [];
    const peiceColor = selectedPeice.toLowerCase() === selectedPeice ? 'b' : 'w';
    const enemyPeiceColor = peiceColor === 'w' ? 'b' : 'w';
    let temp = currentIndex;
    while (temp - 9 >= 0 && temp % 8 != 0) {
        temp -= 9;
        if (getPeiceColor(board[temp]) === peiceColor) {
            break;
        } 
        if (getPeiceColor(board[temp]) === enemyPeiceColor) {
            availableMoves.push(temp);
            break;
        }
        availableMoves.push(temp);
    }
    temp = currentIndex;
    while (temp - 7 >= 0 && temp % 8 != 7) {
        temp -= 7
        if (getPeiceColor(board[temp]) === peiceColor) {
            break;
        } 
        if (getPeiceColor(board[temp]) === enemyPeiceColor) {
            availableMoves.push(temp);
            break;
        }
        availableMoves.push(temp);
    }

    temp = currentIndex;
    while (temp + 7 < 64 && temp % 8 != 0) {
        temp += 7
        if (getPeiceColor(board[temp]) === peiceColor) {
            break;
        } 
        if (getPeiceColor(board[temp]) === enemyPeiceColor) {
            availableMoves.push(temp);
            break;
        }
        availableMoves.push(temp);
    }

    temp = currentIndex;
    while (temp + 9 < 64 && temp % 8 != 7) {
        temp += 9
        if (getPeiceColor(board[temp]) === peiceColor) {
            break;
        } 
        if (getPeiceColor(board[temp]) === enemyPeiceColor) {
            availableMoves.push(temp);
            break;
        }
        availableMoves.push(temp);
    }
    return availableMoves;
}

export const handleRookMoveCancelCastle = (state) => {
    const {
        selectedIndex,
        casteling,
        setCasteling
    } = state;
    let newCasteling = casteling;
    switch (selectedIndex) {
        case 0:
            newCasteling = newCasteling.replace('q', '');
        case 7:
            newCasteling = newCasteling.replace('k', '');
        case 56:
            newCasteling = newCasteling.replace('Q', '');
        case 63:
            newCasteling = newCasteling.replace('K', '');
        default:
    }
    if (newCasteling === '') {
        newCasteling = '-';
    } 
    setCasteling(newCasteling)
}