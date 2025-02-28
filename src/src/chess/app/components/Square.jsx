import React, { useContext, useEffect, useState } from "react";
import { defaultPieces } from "./svgs/peices";
import { BoardContext } from "../contexts/chess-context";
import { handleSquareClick } from "../logic/moveLogic";

export const Square = ({ peice, index, squareColor, width }) => {
    const state = useContext(BoardContext);
    const {
        selectedIndex,
        availableMoves
    } = state;

    return (
        <div
            onClick={(e) => handleSquareClick(state, index, e)}
        >
            <div
                style={{ 
                    backgroundColor: index === selectedIndex ? '#0000ff50' : squareColor,
                    height: width / 8,
                    width: width / 8,
                    position: 'relative'
                }}
            >
                <span style={{
                    position: 'absolute',
                }}>{index}</span>
                {defaultPieces[peice] && <svg
                    viewBox={"1 1 43 43"}
                    width={width / 8}
                    height={width / 8}
                    style={{ display: "block", zIndex: '0' }}
                >
                    <g>{defaultPieces[peice]}</g>
                </svg>}
                {availableMoves.includes(index) && <span style={{
                    height: '25px',
                    width: '25px',
                    backgroundColor: 'rgba(187, 187, 187, 0.6)',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12.5px',
                    marginLeft: '-12.5px'
                }}></span>}
            </div>
        </div>
    )
}