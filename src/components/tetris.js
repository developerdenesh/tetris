import React from "react";

// import Components
import Stage from "./stage";
import Display from "./Display";
import StartButton from "./startButton";
import { createStage } from '../helper/gameHelper'

const Tetris = () => {

    const callback = () => {
        console.log("not implemented")
    }
    return (
        <>
            <div>
                <div style={{
                    width: "100vw",
                    height: "100vh"
                }}>
                    <Stage stage={createStage()} />
                    <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "40px",
                        margin: "0 auto",
                        maxWidth: "900px"
                    }}>
                        <div style={{
                            width: "100%",
                            maxWidth: "200px",
                            display: "block",
                            padding: "0 20px"
                        }}>
                            <Display text={"score"} />
                            <Display text={"rows"} />
                            <Display text={"level"} />
                        </div>
                        <StartButton callback={callback}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tetris;
