import React, { useState } from "react";

// import Components
import Stage from "./stage";
import Display from "./Display";
import StartButton from "./startButton";

// Custom hooks
import { useStage } from "@/hooks/useStage";
import { usePlayer } from "@/hooks/usePlayer";

// Createstage helper
import { createStage } from "@/helper/gameHelper";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage({ player, resetPlayer });

    const movePlayer = (dir) => {
        updatePlayerPos({ x: dir, y: 0 });
    }

    const startGame = () => {
        // reset everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false});
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }
    }

    return (
        <>
            <div>
                <div style={{
                    width: "100vw",
                    height: "100vh",
                }}>
                    <Stage stage={stage} />
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
                            {gameOver ?
                                (<Display gameOver={gameOver} text={"gameover"} />)
                                : (
                                    <>
                                        <Display text={"score"} />
                                        <Display text={"rows"} />
                                        <Display text={"level"} />
                                    </>
                                )}
                        </div>
                        <StartButton callback={startGame} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tetris;
