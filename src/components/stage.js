import React from "react";
import Cell from './cell'

const Stage = ({ stage }) => {
    const cells = stage.map(row => {
        return row.map((cell, x) => {
            return <Cell key={x} type={cell[0]} />
        })
    })

    return (
        <>
            {cells}
        </>
    )

}

export default Stage;