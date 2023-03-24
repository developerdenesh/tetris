import React from "react";

const StartButton = ({ callback }) => {
    return (
        <div style={{
            boxSizing: "border-box",
            margin: "0 0 20px 0",
            padding: "20px",
            minHeight: "30px",
            width: "100%",
            borderRadius: "20px",
            border: "none",
            color: "white",
            background: "#333",
            fontSize: "1rem",
            outline: "none",
            cursor: "pointer",
            textAlign: "center"
        }}
        
        onClick={callback}
        >
            START GAME
        </div>
    )
}

export default StartButton;