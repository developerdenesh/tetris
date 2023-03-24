import React, { useState, useEffect } from "react";

// import Components
import Stage from "./stage";
import Display from "./Display";
import StartButton from "./startButton";

// Custom hooks
import { useStage } from "@/hooks/useStage";
import { usePlayer } from "@/hooks/usePlayer";
import { useInterval } from "@/hooks/useInterval";


// Createstage helper
import { createStage, checkCollision, STAGE_WIDTH } from "@/helper/gameHelper";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, setPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage({ player, resetPlayer });
    let something = 8;


    const move = (e) => {
        e.preventDefault()

        console.log(something)

        if (!gameOver) {
            if (e.keyCode === 37) {
                movePlayer(-0.5);
            } else if (e.keyCode === 39) {
                movePlayer(+0.5);
            } else if (e.keyCode === 40) {
                dropPlayer();
            }
        }
    }

    useEffect(() => {
        // window.addEventListener('keydown', move);

        startGame();

        // return () => {
        //   window.removeEventListener('keydown', move);
        // }
      }, []);

    const movePlayer = (dir) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
        // reset everything
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 0.5, collided: false });
        } else {
            if (player.pos.y < 1) {
                console.log("GAME OVER")
                setGameOver(true);
                setDropTime(null)
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const dropPlayer = () => {
        drop();
    }


    const handle = () => {
        console.log("called to ahndle")
    }

    useInterval(() => {
        drop();
    }, dropTime)

    return (
        <>
            <div>
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                    }}
                >

                    <button
                        style={{
                            fontSize: "4vw",
                            marginLeft: "35vw"

                        }}
                        onClick={() => movePlayer(-0.5)}>Left</button>
                    <button
                        style={{
                            fontSize: "4vw",
                        }}
                        onClick={() => dropPlayer()}>Down</button>
                    <button
                        style={{
                            fontSize: "4vw",
                        }}
                        onClick={() => movePlayer(+0.5)}>Right</button>
                    <button
                        style={{
                            fontSize: "4vw",
                        }}
                        onClick={() => playerRotate(stage, 1)}>Rotate</button>

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
