import React from "react";
import { TETROMINOS } from "@/helper/tetrominos";

const Cell = ({ type }) => {
    return (
        <div style={{
            background: `rgba(${TETROMINOS[type].color}, 0.8)`,
            width: "auto",
            border: `rgba(${type === 0 ? '0px solid' : '4px solid'}, 0.3)`,
            borderLeftColor: `rgba(${TETROMINOS[type].color}, 0.3)`,
            borderRightColor: `rgba(${TETROMINOS[type].color}, 1.0)`,
            borderTopColor: `rgba(${TETROMINOS[type].color}, 1.0)`,
            borderBottomColor: `rgba(${TETROMINOS[type].color}, 0.1)`,
        }}>
            
        </div>
    )
}

export default Cell;
