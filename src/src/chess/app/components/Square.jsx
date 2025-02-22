import React, { useContext, useEffect, useState } from "react";
import { defaultPieces } from "./svgs/peices";
import { BoardContext } from "../contexts/chess-context";
import { handleSquareClick } from "../logic/moveLogic";

export const Square = ({ peice, index, squareColor, width }) => {
    const state = useContext(BoardContext);
    const { selectedIndex } = state;

    return (
        <div
            onClick={() => handleSquareClick(state, index)}
        >
            <div
                style={{ backgroundColor: index === selectedIndex ? '#0000ff50' : squareColor, height: width / 8, width: width / 8,}}
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