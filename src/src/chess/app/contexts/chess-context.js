import { createContext, useContext, useEffect, useState } from "react";

// export const BoardContext = 
export const BoardContext = createContext({});
export const useBoard = () => useContext(BoardContext);
export const ChessProvider = ({
    children,
    fenString
}) => {

    const [board, setBoard] = useState(new Array(64).fill(''));
    const [selectedPeice, setSelectedPeice] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [gameTurn, setGameTurn] = useState('w');
    const [fen, setFen] = useState(fenString);

    useEffect(() => {
        setBoard(generateBoardFromFen(fen));
    }, [fen])

    const generateBoardFromFen = (fenString) => {
        const board = new Array(64).fill('');
        let index = 0;
        const fen = fenString.split(' ');
        fen[0].split('').forEach(char => {
            if (/[a-zA-Z]/.test(char)) {
                board[index] = char;
                index++;
            }
            if (/[0-9]/.test(char)) {
                index += Number(char);
            }
        });
        return board;
    }

    //return this
    const ChessBoardProviderContextValue = {
        board,
        setBoard,
        children,
        selectedIndex,
        setSelectedIndex,
        selectedPeice,
        setSelectedPeice,
        gameTurn,
        setGameTurn
    }

    return (
        <BoardContext.Provider value={ChessBoardProviderContextValue}>
            {children}
        </BoardContext.Provider>
    )
}