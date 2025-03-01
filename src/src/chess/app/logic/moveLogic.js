import { generateSlidingMoves, handleRookMoveCancelCastle } from "./slidingPeiceLogic";
import { generateKingMoves, handleCastleMove } from "./kingLogic";
import { generateKnightMoves } from "./knightLogic";
import { generatePawnMoves, handlePawnPossibleEnPessant } from "./pawnLogic";
import { getPeiceColor } from "../utils";

export const handleSquareClick = (state, index, e) => {
    const {
        selectedIndex,
        setSelectedIndex,
        setAvailableMoves,
        board,
        gameTurn,
        isPromotionOpen,
        setWhitePossibleMoves,
        setGameTurn,
        setBoard,
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

const getAllPossibleMoves = (board, gameTurn) => {
    // const {
    //     board,
    //     gameTurn,
    // } = state;
    let allEnemyMoves = [];
    board.forEach((element, index) => {
        if (getPeiceColor(element) === gameTurn) {
            allEnemyMoves = allEnemyMoves.concat(generateMoves(state, index, true));
        }
    });
    return allEnemyMoves;
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
        setPromotionIndex,
        setWhitePossibleMoves
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
    // setGameTurn(gameTurn === 'w' ? 'b' : 'w');
    setAvailableMoves([]);
}




const generateMoves = (state, index, enemyCheck = false) => {
    const {
        board
    } = state;
    const peice = board[index];
    if (/[rbq]/.test(peice.toLowerCase())) {
        return generateSlidingMoves(state, peice, index);
    } else if (/[p]/.test(peice.toLowerCase())) {
        return generatePawnMoves(state, peice, index, enemyCheck);
    } else if (/[k]/.test(peice.toLowerCase())) {
        return generateKingMoves(state, peice, index);
    } else if (/[n]/.test(peice.toLowerCase())) {
        return generateKnightMoves(state, peice, index); 
    } else {
        console.log('something went wrong in generate moves');
        return [];
    }
}
