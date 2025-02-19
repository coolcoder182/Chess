import { Board } from "./components/Board"
import { BoardContext } from "./contexts/chess-context"
const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const ChessApp = () => {
    const board = generateBoardFromFen();
    return (
        <div 
            style={{
                maxWidth: 'fit-content',
                marginLeft: 'auto',
                marginRight: 'auto'
            }} 
        >
            <BoardContext.Provider value={board}>
                <Board />
            </BoardContext.Provider>
        </div>
    )
}

const generateBoardFromFen = (fenString = '') => {
    const board = new Array(64).fill('');
    board[19] = 'P';
    board[30] = 'k';
    board[0] = 'R';
    board[2] = 'K';
    board[40] = 'q';
    return board;
}