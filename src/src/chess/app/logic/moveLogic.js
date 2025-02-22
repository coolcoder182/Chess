export const handleSquareClick = (state, index) => {
    const {
        selectedIndex,
        setSelectedIndex,
        setAvailableMoves
    } = state;
    if (selectedIndex === null) {
        const newSelected = selectPeice(state, index);
        if (newSelected !== null) {
            updateAvailableMoves(state, index);
        }
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
        setSelectedIndex
    } = state;
    if (gameTurn === 'w' && /[PRNBQK]/.test(board[index])) {
        setSelectedIndex(index);
        return index;
    } else if (gameTurn === 'b' && /[prnbqk]/.test(board[index])) {
        setSelectedIndex(index);
        console.log('here');
        return index;
    }
    return null
}

const selectMove = (state, index) => {
    const {
        selectedIndex,
        setSelectedIndex,
        board,
        setBoard,
        gameTurn,
        setGameTurn,
        setAvailableMoves
    } = state;
    const newBoard = [...board];
    newBoard[index] = board[selectedIndex];
    newBoard[selectedIndex] = '';
    setBoard(newBoard);
    setSelectedIndex(null);
    setGameTurn(gameTurn === 'w' ? 'b' : 'w');
    setAvailableMoves([]);
}

const updateAvailableMoves = (state, index) => {
    const {
        board,
        setAvailableMoves
    } = state;
    let availableMoves = [];
    //TODO get actual move logic
    if (/[PRNBQK]/.test(board[index])) {
        availableMoves.push(0);
    } else {
        availableMoves.push(63);
    }
    setAvailableMoves(availableMoves);
}