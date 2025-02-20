import { useContext } from "react";
import { COLUMNS } from "../consts";
import { BoardContext } from "../contexts/chess-context";
import { Square } from "./Square";

export const Squares = () => {

    const board = useContext(BoardContext).board;
    const width = 700;
    let index = -1;
    return (
        <>
            {[...Array(8)].map((_, r) => {
                return(
                    <div
                        key={r.toString()}
                        style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            width: width,
                        }}
                    >
                        {[...Array(8)].map((_, c) => {
                            const cell = (COLUMNS[c]) + (8 - r);
                            const squareColor = (c + r) % 2 === 0 ? "#F0D9B5" : "#B58863"
                            index++;
                            const p = board[index];
                            return (
                                <Square key={index} peice={p} index={index} squareColor={squareColor} width={width}/>
                            )
                        })}
                    </div>
                )
            })}
        </>
    )
}