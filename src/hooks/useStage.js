import { useState, useEffect } from "react";
import { createStage } from "@/helper/gameHelper";

export const useStage = ({ player, resetPlayer }) => {
    const [ stage, setStage ] = useState(createStage())

    useEffect(() => {
        const updateStage = prevStage => {
            // Flush the stage
            const newStage = prevStage.map(row => {
                return row.map(cell => {
                    return cell[1] === 'clear' ? [0, 'clear'] : cell
                })
            })

            // Draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {

                        const indexX = x + player.pos.x
                        const indexY = y + player.pos.y

                        newStage[indexY][indexX] = [value, merged_status]
                    }
                })
            })

            // Then check if we have collided 

            if (player.collided) {
                resetPlayer();
            }

            return newStage;
        }

        setStage(prev => updateStage(prev))
    }, [player])

    return [stage, setStage]
}