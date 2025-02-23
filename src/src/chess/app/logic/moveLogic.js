export const handleSquareClick = (state, index) => {
    const {
        selectedIndex,
        setSelectedIndex,
        setAvailableMoves,
    } = state;
    if (selectedIndex === null /* TODO or player chosing different peice */) {
        const newSelectedIndex = selectPeice(state, index);
        setSelectedIndex(newSelectedIndex);
        updateAvailableMoves(state, newSelectedIndex);
    } else if (selectedIndex === index) {
        setSelectedIndex(null);
        setAvailableMoves([]);
    } else {
        selectMove(state, index);
    }
}

const selectPeice = (state, index) => {
    const {
        gameTurn,
        board,
    } = state;
    if (gameTurn === 'w' && /[PRNBQK]/.test(board[index])) {
        return index;
    } else if (gameTurn === 'b' && /[prnbqk]/.test(board[index])) {
        return index;
    }
    return null
}

const updateAvailableMoves = (state, index) => {
    const {
        board,
        setAvailableMoves,
    } = state;
    if (!index && index !== 0) {
        return;
    }
    let availableMoves = [];
    if (/[PRNBQK]/.test(board[index])) {
        availableMoves = generateMoves(state, index);
    } else {
        availableMoves = generateMoves(state, index);
    }
    if (availableMoves.length > 0) {
        setAvailableMoves(availableMoves);
    }
}

const selectMove = (state, index) => {
    const {
        selectedIndex,
        setSelectedIndex,
        board,
        setBoard,
        gameTurn,
        setGameTurn,
        availableMoves,
        setAvailableMoves
    } = state;
    if (!availableMoves.includes(index)) {
        return;
    }
    const newBoard = [...board];
    newBoard[index] = board[selectedIndex];
    newBoard[selectedIndex] = '';
    setBoard(newBoard);
    setSelectedIndex(null);
    setGameTurn(gameTurn === 'w' ? 'b' : 'w');
    setAvailableMoves([]);
}

const generateMoves = (state, index) => {
    const {
        board
    } = state;
    const peice = board[index];
    if (/[rbq]/.test(peice.toLowerCase())) {
        return generateSlidingMoves(state, peice, index);
    } else if (/[p]/.test(peice.toLowerCase())) {
        console.log('need to implement generate pawn moves');
        return [];
    } else if (/[k]/.test(peice.toLowerCase())) {
        console.log('need to implement generate king moves');
        return [];
    } else {
        console.log('something went wrong in generate moves');
        return [];
    }
}

const generateSlidingMoves = (state, selectedPeice, currentIndex) => {
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

const getPeiceColor = (peice) => {
    if (peice === '') {
        return '';  
    }
    return peice.toLowerCase() === peice ? 'b' : 'w';
}
