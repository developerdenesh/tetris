import React from "react";

const Display = ({ gameOver, text}) => {
    return (
        <div style={{
            margin: "0 0 20px 0",
            padding: "20px",
            border: "4px solid #333",
            minHeight: "30px",
            width: "100%",
            borderRadius: "50px",
            background: "#001",
            color: `${gameOver ? 'red' : '#999'}`,
            alignItems: "center",
            textAlign: "center"
        }}>
            { text }
        </div>
    )
}

export default Display;
