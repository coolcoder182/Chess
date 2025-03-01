import { createContext, useContext, useEffect, useState } from "react";

// export const BoardContext = 
export const BoardContext = createContext({});
export const useBoard = () => useContext(BoardContext);
export const ChessProvider = ({
    children,
    fenString
}) => {

    const [board, setBoard] = useState(new Array(64).fill(''));
    const [availableMoves, setAvailableMoves] = useState([])
    const [selectedPeice, setSelectedPeice] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [gameTurn, setGameTurn] = useState('w');
    const [casteling, setCasteling] = useState('-');
    const [fen, setFen] = useState(fenString);
    const [enPessantIndex, setEnPessantIndex] = useState(null);
    const [isPromotionOpen, setIsPromotionOpen] = useState(false);
    const [promotionPosition, setPromotionPosition] = useState({});
    const [promotionIndex, setPromotionIndex] = useState(null);
    const [whitePossibleMoves, setWhitePossibleMoves] = useState([]);
    const [blackPossibleMoves, setBlackPossibleMoves] = useState([]);

    useEffect(() => {
        generateBoardFromFen(fen);
    }, [fen])

    const generateBoardFromFen = (fenString) => {
        const board = new Array(64).fill('');
        let index = 0;
        const fen = fenString.split(' ');
        //board [0]
        fen[0].split('').forEach(char => {
            if (/[a-zA-Z]/.test(char)) {
                board[index] = char;
                index++;
            }
            if (/[0-9]/.test(char)) {
                index += Number(char);
            }
        });
        setBoard(board);
        //turn [1]
        setGameTurn(fen[1]);
        //casteling
        setCasteling(fen[2]);
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
        setGameTurn,
        availableMoves,
        setAvailableMoves,
        casteling,
        setCasteling,
        enPessantIndex,
        setEnPessantIndex,
        isPromotionOpen,
        setIsPromotionOpen,
        promotionPosition,
        setPromotionPosition,
        promotionIndex,
        setPromotionIndex,
        whitePossibleMoves,
        setWhitePossibleMoves,
        blackPossibleMoves,
        setBlackPossibleMoves
    }

    return (
        <BoardContext.Provider value={ChessBoardProviderContextValue}>
            {children}
        </BoardContext.Provider>
    )
}