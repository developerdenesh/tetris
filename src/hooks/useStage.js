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
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? "merged" : "clear"}`
                        ]
                    }
                })
            })

            return newStage;
        }

        setStage(prev => updateStage(prev))
    }, [player.collided, player.pos.x, player.pos.y, player.tetromino])

    return [stage, setStage]
}