import { COLUMNS } from "../consts";
import { defaultPieces } from "./svgs/peices";

export const Squares = () => {

    const width = 700;
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
                            backgroundColor: 'grey',
                        }}
                    >
                        {[...Array(8)].map((_, c) => {
                            const cell = (COLUMNS[c]) + (8 - r);
                            const squareColor = (c + r) % 2 === 0 ? "#F0D9B5" : "#B58863"
                            return (
                                <div
                                    key={r.toString() + c.toString()}
                                    style={{
                                        backgroundColor: squareColor,
                                        height: width / 8,
                                        width: width / 8,
                                    }}
                                >
                                    <svg
                                        viewBox={"1 1 43 43"}
                                        width={width / 8}
                                        height={width / 8}
                                        style={{ display: "block" }}
                                    >
                                        <g>{defaultPieces['wR']}</g>
                                    </svg>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </>
    )
}