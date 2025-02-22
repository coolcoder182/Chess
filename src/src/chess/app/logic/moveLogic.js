export const handleSquareClick = (state, index) => {
    const {
        selectedIndex,
        setSelectedIndex,
    } = state;
    if (selectedIndex === null) {
        selectPeice(state, index);
    } else if (selectedIndex === index) {
        setSelectedIndex(null);
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
    if (board[index] === '') {
        return;
    } else if (gameTurn === 'w' && /[PRNBQK]/.test(board[index])) {
        setSelectedIndex(index);
        return;
    } else if (gameTurn === 'b' && /[prnbqk]/.test(board[index])) {
        setSelectedIndex(index);
    }
}

const selectMove = (state, index) => {
    const {
        selectedIndex,
        setSelectedIndex,
        board,
        setBoard,
        gameTurn,
        setGameTurn
    } = state;
        const newBoard = [...board];
        newBoard[index] = board[selectedIndex];
        newBoard[selectedIndex] = '';
        setBoard(newBoard);
        setSelectedIndex(null);
        setGameTurn(gameTurn === 'w' ? 'b' : 'w');
}