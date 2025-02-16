import { COLUMNS } from "../consts";

// import * from "../../../../public"
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
                                        <g>
                                        <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="45"
      height="45"
    >
      <path
        d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"
        style={{
          opacity: "1",
          fill: "#ffffff",
          fillOpacity: "1",
          fillRule: "nonzero",
          stroke: "#000000",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "miter",
          strokeMiterlimit: "4",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
      />
    </svg>
                                        </g>
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