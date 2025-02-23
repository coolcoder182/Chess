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
            onClick={() => handleSquareClick(state, index)}
        >
            <div
                style={{ 
                    backgroundColor: index === selectedIndex ? '#0000ff50' : squareColor,
                    height: width / 8,
                    width: width / 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {defaultPieces[peice] && <svg
                    viewBox={"1 1 43 43"}
                    width={width / 8}
                    height={width / 8}
                    style={{ display: "block", zIndex: '0' }}
                >
                    <g style={{ zIndex:'0'}}>{defaultPieces[peice]}</g>
                </svg>}
                {availableMoves.includes(index) && <span style={{
                    height: '25px',
                    width: '25px',
                    backgroundColor: '#bbb',
                    borderRadius: '50%',
                    zIndex: '1',
                    position: 'relative'
                }}></span>}
            </div>
        </div>
    )
}