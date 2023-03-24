import React from "react";
import Cell from './cell'

const Stage = ({ stage }) => {
    const cells = stage.map(row => {
        return row.map((cell, x) => {
            return <Cell key={x} type={cell[0]} />
        })
    })

    const width = stage[0].length;
    const height = stage.length;

    return (
        <div style={{
            width: width,
            height: height * 18,
            display: "grid",
            gridGap: "1px",
            // maxWidth: "25vw",
            width: "100%",
            border: "2px solid #333",
            // background: "#111",
            gridTemplateColumns: `repeat(${width}, 1fr)`,
            gridTemplateRows: `repeat(${height}, calc(25vw/${width}))`

        }}>
            {cells}
        </div>
    )

}

export default Stage;