import React from "react";

const Display = ({ gameOver, text}) => {
    return (
        <div style={{
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            margin: "0 0 20px 0",
            padding: "20px",
            border: "4px solid #333",
            minHeight: "30px",
            width: "100%",
            borderRadius: "20px",
            background: "#001",
            color: `${gameOver ? 'red' : '#999'}`,
            fontFamily: "Pixel, Arial"

        }}>
            { text }
        </div>
    )
}

export default Display;
