import { useCallback, useState } from "react";
import { TETROMINOS } from "@/helper/tetrominos";
import { STAGE_WIDTH } from "@/helper/gameHelper";

export const usePlayer = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)]
    const tetro = TETROMINOS[randTetromino];
    const shape = tetro.shape
    
    const [player, setPlayer] = useState({
        pos: {
            x: 0, 
            y: 0
        },
        tetromino: shape,
        collided: false
    })

    const updatePlayerPos = ({x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetrominos().shape(),
            collided: false
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer]
}