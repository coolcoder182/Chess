import { Board } from "./components/Board"
import { ChessProvider } from "./contexts/chess-context"
const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1';
// const STARTING_TEST_FEN = 'rnbqkbnr/pp6/8/8/8/8/1P6/RNBQKBNR w KQkq - 0 1';

export const ChessApp = () => {
    const fenString = STARTING_FEN;
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
