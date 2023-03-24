import React from "react";

const StartButton = ({ callback }) => {
    return (
        <div style={{
            margin: "0 0 20px 0",
            padding: "20px",
            border: "4px solid #333",
            minHeight: "30px",
            width: "100%",
            borderRadius: "50px",
            background: "#001",
            color: "white",
            alignItems: "center",
            textAlign: "center"
        }}
        
        onClick={callback}
        >
            START GAME
        </div>
    )
}

export default StartButton;