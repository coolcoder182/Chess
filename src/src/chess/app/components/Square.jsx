import React, { useContext, useState } from "react";
import { defaultPieces } from "./svgs/peices";
import { BoardContext } from "../contexts/chess-context";

export const Square = ({ peice, index, squareColor, width }) => {
    const {
        selectedPeice,
        selectedIndex
    } = useContext(BoardContext);
    const [bgColor, setBgColor] = useState(squareColor);
    return (
        <div
            onClick={() => {
                if (index !== selectedIndex) {
                    
                    setBgColor('#0000ff80');
                }
            }}
        >
            <div
                style={{ backgroundColor: bgColor, height: width / 8, width: width / 8,}}
            >
                <svg
                    viewBox={"1 1 43 43"}
                    width={width / 8}
                    height={width / 8}
                    style={{ display: "block" }}
                >
                    <g>{defaultPieces[peice]}</g>
                </svg>
            </div>
        </div>
    )
}