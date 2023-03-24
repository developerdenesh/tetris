import React from "react";

// import Components
import Stage from "./stage";
import Display from "./Display";
import StartButton from "./startButton";

const Tetris = () => {
    return (
        <>
            <Stage />
            <div>
                <Display text={"score"} />
                <Display text={"rows"} />
                <Display text={"level"} />
            </div>
            <StartButton />
        </>

    )



}

export default Tetris;