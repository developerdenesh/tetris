import React, { useState, useEffect, useRef } from "react";

// import Components
import Stage from "./stage";
import Display from "./Display";
import StartButton from "./startButton";

// This is the font
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// Icons
import { RepeatIcon, AddIcon, Warnin, RepeatIcongIcon, TriangleDownIcon } from '@chakra-ui/icons'

// Custom hooks
import { useStage } from "@/hooks/useStage";
import { usePlayer } from "@/hooks/usePlayer";
import { useInterval } from "@/hooks/useInterval";
import { useGameStatus } from "@/hooks/useGameStatus";


// Createstage helper
import { createStage, checkCollision, STAGE_WIDTH } from "@/helper/gameHelper";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, setPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage({ player, resetPlayer });
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

    const inputreference = useRef(null)


    const move = (e) => {
        if (!gameOver) {
            e.preventDefault()
            if (e.keyCode === 37) {
                movePlayer(-0.5);
            } else if (e.keyCode === 39) {
                movePlayer(+0.5);
            } else if (e.keyCode === 40) {
                dropPlayer();
            } else if (e.keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    // This is effectively component did mount
    useEffect(() => {
        startGame();
        inputreference.current.focus();
    }, []);

    const movePlayer = (dir) => {
        if (gameOver) {
            return;
        }

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
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        // Increase level when player has cleared 10 rows
        if (rows > (level + 1) + 10) {
            setLevel(prev => prev + 1);

            // Also increase speed
            setDropTime(1000 / (level + 1) + 200)
        }

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

        if (!gameOver) {
            drop();
        }
    }

    useInterval(() => {
        drop();
    }, dropTime)

    return (
        <>
            <div 
                ref={inputreference} 
                role={"button"} 
                tabIndex={0} 
                onKeyDown={e => move(e)}
                style={{outline: "none"}}
            >
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                    }}
                >

                    <button
                        className={inter.className}
                        style={{
                            fontSize: "4vw",
                            marginLeft: "45vw"

                        }}
                        onClick={() => movePlayer(-0.5)}>
                        <span>&lt;-</span>
                    </button>


                    <button
                        style={{
                            fontSize: "4vw",
                        }}
                        onClick={() => dropPlayer()}><TriangleDownIcon /></button>
                    <button
                        className={inter.className}
                        style={{
                            fontSize: "4vw",
                        }}
                        onClick={() => movePlayer(+0.5)}>
                        <span>-&gt;</span>
                    </button>
                    <button
                        style={{
                            fontSize: "4vw",
                        }}
                        onClick={() => playerRotate(stage, 1)}><RepeatIcon /></button>

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
                                        <Display text={`score: ${score}`} />
                                        <Display text={`rows: ${rows}`} />
                                        <Display text={`level: ${level}`} />
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
