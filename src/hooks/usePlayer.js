import { useCallback, useState } from "react";
import { randomTetrominos, TETROMINOS } from "@/helper/tetrominos";
import { checkCollision, STAGE_WIDTH } from "@/helper/gameHelper";

export const usePlayer = () => {
    
    const [player, setPlayer] = useState({
        pos: {
            x: 0, 
            y: 0
        },
        tetromino: TETROMINOS[0].shape,
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
            tetromino: randomTetrominos().shape,
            collided: false
        })
    }, [player])

    const rotate = (matrix, dir) => {
        // Make the rows become columns
        const rotatedTetro = matrix.map((_, index) => {
            return matrix.map(col => col[index]);
        })

        // Reverse each row to get a rotated matrix
        if (dir > 0) {
            return rotatedTetro.map(row => row.reverse())
        }

        return rotatedTetro.reverse();
    }

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;

        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0})) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0) ? 1 : -1);

            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir)
                clonedPlayer.pos.x = pos;
            }
        }

        setPlayer(clonedPlayer)
    }
    
    return [player, updatePlayerPos, resetPlayer, setPlayer, playerRotate]
}