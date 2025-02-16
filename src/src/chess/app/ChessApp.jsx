import { Board } from "./components/Board"

export const ChessApp = () => {
    return (
        <div 
            style={{
                maxWidth: 'fit-content',
                marginLeft: 'auto',
                marginRight: 'auto'
            }} 
        >
            <Board />
        </div>
    )
}