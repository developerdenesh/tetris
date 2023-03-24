import React from "react";
import Cell from './cell'
import styles from '@/styles/Home.module.css'


const Stage = ({ stage }) => {
    const cells = stage.map(row => {
        return row.map((cell, x) => {
            return <Cell key={x} type={cell[0]} />
        })
    })

    const width = stage[0].length;
    const height = stage.length;
    const maxWidth = "25vw"

    return (
            <div style={{
                // width: width,
                // height: height * 18,
                display: "grid",
                gridGap: "0px",
                maxWidth: `${maxWidth}`,
                minWidth: "10px",
                // maxHeight: "20vh",
                // border: "2px solid #333",
                // background: "#111",
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                gridTemplateRows: `repeat(${height}, calc(${maxWidth}/${width}))`,
                marginLeft: "40vw",
            }}>
                {cells}
            </div>
        

    )

}

export default Stage;