import { getPeiceColor } from "../utils";

export const generatePawnMoves = (state, selectedPeice, currentIndex, enemyCheck) => {
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
    return getPawnMoves(state, currentIndex, firstMove, direction, peiceColor, enPessantDirection, enemyCheck);
}

const getPawnMoves = (state, currentIndex, firstMove, direction, peiceColor, enPessantDirection, enemyCheck) => {
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
    if (!/[prnbqk]/.test(board[currentIndex + direction].toLowerCase()) && !enemyCheck) {
        availableMoves.push(currentIndex + direction);
    }
    if (firstMove && board[currentIndex + direction] === '' && board[currentIndex + direction * 2] === '' && !enemyCheck) {
        availableMoves.push(currentIndex + (direction * 2));
    }

    //taking left side
    const leftSideIndex = currentIndex + (direction - 1);
    if ((currentIndex % 8 !== 0 && (enemyCheck || getPeiceColor(board[leftSideIndex]) === enemyPeiceColor))) {
        availableMoves.push(leftSideIndex);
    }
    //taking right side
    const rightSideIndex = currentIndex + (direction + 1);
    if (currentIndex % 8 !== 7 && (enemyCheck || getPeiceColor(board[rightSideIndex]) === enemyPeiceColor)) {
        availableMoves.push(rightSideIndex);
    }
    return availableMoves;
}

export const handlePawnPossibleEnPessant = (state, index) => {
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