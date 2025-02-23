import { Board } from "./components/Board"
import { ChessProvider } from "./contexts/chess-context"
const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const ChessApp = () => {
    const fenString = '8/1R6/1p6/8/3B4/6P1/8/8';
    return (
        <div 
            style={{
                maxWidth: 'fit-content',
                marginLeft: 'auto',
                marginRight: 'auto'
            }} 
        >
            <ChessProvider
                fenString={fenString}
            >
                <Board />
            </ChessProvider>
        </div>
    )
}
