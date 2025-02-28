export const handleSquareClick = (state, index, e) => {
    const {
        selectedIndex,
        setSelectedIndex,
        setAvailableMoves,
        board,
        gameTurn,
        isPromotionOpen
    } = state;
    if (!isPromotionOpen) {
        if (selectedIndex === index) {
            setSelectedIndex(null);
            setAvailableMoves([]);
        } else if (selectedIndex === null || getPeiceColor(board[index]) === gameTurn) {
            const newSelectedIndex = selectPeice(state, index);
            setSelectedIndex(newSelectedIndex);
            updateAvailableMoves(state, newSelectedIndex);
        } else {
            selectMove(state, index, e.clientX, e.clientY);
        }
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
    setAvailableMoves(availableMoves);
}

const selectMove = (state, index, x, y) => {
    const {
        selectedIndex,
        setSelectedIndex,
        board,
        setBoard,
        gameTurn,
        setGameTurn,
        availableMoves,
        setAvailableMoves,
        enPessantIndex,
        setEnPessantIndex,
        setIsPromotionOpen,
        setPromotionPosition,
        setPromotionIndex
    } = state;
    if (!availableMoves.includes(index)) {
        return;
    }
    const newBoard = [...board];
    if (board[selectedIndex] === 'K' || board[selectedIndex] === 'k') {
        handleCastleMove(state, newBoard, index); 
    }
    if ([0, 7, 56, 63].includes(selectedIndex) && board[selectedIndex] === 'R' || board[selectedIndex] === 'r') {
        handleRookMoveCancelCastle(state);
    }
    setEnPessantIndex(null);
    if (board[selectedIndex].toLowerCase() === 'p') {
        handlePawnPossibleEnPessant(state, index);
        const direction = gameTurn === 'w' ? 8 : -8;
        if (index === enPessantIndex) {
            newBoard[index + direction] = '';
        }
        if ((index >= 0 && index <= 8) || (index >= 56 && index <= 63)) {
            setIsPromotionOpen(true);
            setPromotionPosition({x, y});
            setPromotionIndex(index);
        }
    }
    newBoard[index] = board[selectedIndex];
    newBoard[selectedIndex] = '';
    setBoard(newBoard);
    setSelectedIndex(null);
    setGameTurn(gameTurn === 'w' ? 'b' : 'w');
    setAvailableMoves([]);
}

const handlePawnPossibleEnPessant = (state, index) => {
    const {
        setEnPessantIndex,
        selectedIndex,
        board,
        gameTurn
    } = state;
    const enemyPawn = gameTurn === 'w' ? 'p' : 'P';
    let newEPIndex = null;
    if (Math.abs(index - selectedIndex) === 16) {
        if (selectedIndex % 8 === 0 && board[index+1] === enemyPawn) {
            newEPIndex = gameTurn === 'w' ? index + 8 : index - 8;
        } else if (selectedIndex % 8 === 7 && board[index - 1] === enemyPawn) {
            newEPIndex = gameTurn === 'w' ? index + 8 : index - 8;
        } else if (board[index - 1] === enemyPawn || board[index + 1] === enemyPawn){
            newEPIndex = gameTurn === 'w' ? index + 8 : index - 8;
        }
    }
    setEnPessantIndex(newEPIndex)
}

const handleRookMoveCancelCastle = (state) => {
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

const handleCastleMove = (state, newBoard, index) => {
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

const generateMoves = (state, index) => {
    const {
        board
    } = state;
    const peice = board[index];
    if (/[rbq]/.test(peice.toLowerCase())) {
        return generateSlidingMoves(state, peice, index);
    } else if (/[p]/.test(peice.toLowerCase())) {
        return generatePawnMoves(state, peice, index);
    } else if (/[k]/.test(peice.toLowerCase())) {
        return generateKingMoves(state, peice, index);
    } else if (/[n]/.test(peice.toLowerCase())) {
        return generateKnightMoves(state, peice, index); 
    } else {
        console.log('something went wrong in generate moves');
        return [];
    }
}

const generateKingMoves = (state, peice, index) => {
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

const generateKnightMoves = (state, selectedPeice, currentIndex) => {
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

const generatePawnMoves = (state, selectedPeice, currentIndex) => {
    const peiceColor = selectedPeice.toLowerCase() === selectedPeice ? 'b' : 'w';
    let firstMove = true;
    let direction = -8;
    let enPessantDirection = -1;
    if (peiceColor === 'w') {
         if (currentIndex < 48) {
            firstMove = false;
         }
    } else {
        if (currentIndex > 15) {
            firstMove = false;
        }
        direction = 8;
        enPessantDirection = 1;
    }
    return getPawnMoves(state, currentIndex, firstMove, direction, peiceColor, enPessantDirection);
}

const getPawnMoves = (state, currentIndex, firstMove, direction, peiceColor, enPessantDirection) => {
    const {
        board,
        enPessantIndex,
    } = state;
    // alert('need to implment en pessant')
    const enemyPeiceColor = peiceColor === 'w' ? 'b' : 'w';
    const availableMoves = [];
    if ((currentIndex + direction) < 0 || (currentIndex + direction > 63)) {
        alert('this will be promoted dont handle ALSO REMOVE THIS ALERT');
        return availableMoves;
    }
    if (
        enPessantIndex
        && (enPessantIndex === currentIndex + (enPessantDirection * 7)
        || enPessantIndex === currentIndex + (enPessantDirection * 9))
    ) {
        availableMoves.push(enPessantIndex);
    }
    //basic move
    if (!/[prnbqk]/.test(board[currentIndex + direction].toLowerCase())) {
        availableMoves.push(currentIndex + direction);
    }
    if (firstMove && board[currentIndex + direction] === '' && board[currentIndex + direction * 2] === '') {
        availableMoves.push(currentIndex + (direction * 2));
    }

    //taking left side
    const leftSideIndex = currentIndex + (direction - 1);
    if (currentIndex % 8 !== 0 && getPeiceColor(board[leftSideIndex]) === enemyPeiceColor) {
        availableMoves.push(leftSideIndex);
    }
    //taking right side
    const rightSideIndex = currentIndex + (direction + 1);
    if (currentIndex % 8 !== 7 && getPeiceColor(board[rightSideIndex]) === enemyPeiceColor) {
        availableMoves.push(rightSideIndex);
    }
    return availableMoves;
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
