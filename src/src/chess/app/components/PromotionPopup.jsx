import { useContext, useState } from "react";
import { BoardContext } from "../contexts/chess-context";
import { defaultPieces } from "./svgs/peices";

export const PromotionPopup = () => {
    const {
        isPromotionOpen,
        setIsPromotionOpen,
        promotionPosition,
        gameTurn,
        board,
        setBoard,
        promotionIndex,
        setPromotionIndex
    } = useContext(BoardContext);

    const [bgColor, setBgColor] = useState('');

    const handleMouseOver = (p) => {
        setBgColor(p); // Change background color on hover
    };
    
    const handleMouseOut = () => {
        setBgColor(''); // Reset background color when mouse leaves
    };

    const handleOnClick = (p) => {
        setIsPromotionOpen(false);
        const newBoard = [...board];
        newBoard[promotionIndex] = p;
        setBoard(newBoard);
        setPromotionIndex(null);
    }

    const peices = ['q', 'r', 'b', 'n'].map(peice => {
        return gameTurn === 'b' ? peice.toUpperCase() : peice;
    });

    return (
        <>
            {isPromotionOpen && <div id="popup" style={{
                position: 'absolute',
                width: 700/8 + 'px',
                height: (700/8) * 4 + 'px',
                left: promotionPosition.x + 'px',
                top: promotionPosition.y + 'px',
                color: 'white',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#333',
                borderRadius: '5px',
            }}>
                {peices.map(p => {
                 return (
                    <div
                        key={p}
                        style={{
                            backgroundColor: p === bgColor ? '#444444' : '',
                        }}
                        onMouseOver={() => handleMouseOver(p)}
                        onMouseOut={handleMouseOut}
                        onClick={() => handleOnClick(p)}
                    >
                        <svg
                            viewBox={"1 1 43 43"}
                            width={700 / 8}
                            height={700 / 8}
                            style={{ display: "block", zIndex: '0' }}
                        >
                            <g>{defaultPieces[p]}</g>
                        </svg>
                    </div>
                    )})}
            </div>}
        </>
    );
}