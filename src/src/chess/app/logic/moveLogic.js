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
    if (!index) {
        return;
    }
    let availableMoves = [];
    if (/[PRNBQK]/.test(board[index])) {
        availableMoves = generateMoves(state, index);
    } else {
        availableMoves.push(63);
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
    // setGameTurn(gameTurn === 'w' ? 'b' : 'w');
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
    const {
        board
    } = state;
    const availableMoves = [];
    let temp = currentIndex;
    const peiceColor = selectedPeice.toLowerCase() === selectedPeice ? 'b' : 'w';
    const enemyPeiceColor = peiceColor === 'w' ? 'b' : 'w';
    //bishop
    if (/[b]/.test(selectedPeice.toLowerCase)) {
    }
    //rook
    if (/[r]/.test(selectedPeice.toLowerCase())) {
        // do {}
        for (let i = temp; i <= 63; i+=8) {
            if (getPeiceColor(board[i]) === peiceColor) {
                continue;
            } 
            if (getPeiceColor(board[i]) === enemyPeiceColor) {
                availableMoves.push(i);
                console.log(getPeiceColor(board[i]), ' ', i);
                continue;
            }
            if (i === temp + 8) {
                temp = i;
                availableMoves.push(i);
            }
        }
        temp = currentIndex;
        for (let i = temp; i >= 0; i-=8) {
            if (getPeiceColor(board[i]) === peiceColor) {
                continue;
            } 
            if (getPeiceColor(board[i]) === enemyPeiceColor) {
                availableMoves.push(i);
                console.log(getPeiceColor(board[i]), ' ', i);
                continue;
            }
            if (i === temp - 8) {
                temp = i;
                availableMoves.push(i);
            }
        }
        temp = currentIndex;
        for (let i = temp; i <= 31; i++) {
            if (getPeiceColor(board[i]) === peiceColor) {
                continue;
            } 
            if (getPeiceColor(board[i]) === enemyPeiceColor) {
                availableMoves.push(i);
                console.log(getPeiceColor(board[i]), ' ', i);
                continue;
            }
            if (i === temp + 1) {
                temp = i;
                availableMoves.push(i);
            }
        }
        temp = currentIndex;
        for (let i = temp; i >= 24; i--) {
            if (getPeiceColor(board[i]) === peiceColor) {
                continue;
            } 
            if (getPeiceColor(board[i]) === enemyPeiceColor) {
                availableMoves.push(i);
                console.log(getPeiceColor(board[i]), ' ', i);
                continue;
            }
            if (i === temp - 1) {
                temp = i;
                availableMoves.push(i);
            }
        }
    }
    //queen
    if (/[q]/.test(selectedPeice.toLowerCase())) {
    }
    return availableMoves;
}

const getPeiceColor = (peice) => {
    if (peice === '') {
        return '';  
    }
    return peice.toLowerCase() === peice ? 'b' : 'w';
}