import { useState, useEffect } from "react";
import { createStage } from "@/helper/gameHelper";

export const useStage = ({ player, resetPlayer }) => {
    const [ stage, setStage ] = useState(createStage())
    const [rowsCleared, setRowsCleared] = useState(0)

    useEffect(() => {
        setRowsCleared(0)

        const sweepRows = (newStage) => {
            return newStage.reduce((ack, row) => {
                if (row.findIndex((cell) => {
                    return (cell[0] === 0);
                }) === -1) {
                    setRowsCleared(prev => prev + 1);
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }

                ack.push(row);
                return ack;
            }, [])
        }

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
                        const merged_status = `${player.collided ? "merged" : "clear"}`
                        const indexX = x + player.pos.x
                        const indexY = y + player.pos.y
                        const floored_index_x = Math.floor(indexX)
                        const floored_index_y = Math.floor(indexY)

                        newStage[floored_index_y][floored_index_x] = [value, merged_status]
                    }
                })
            })

            // Then check if we have collided 

            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        }

        setStage(prev => updateStage(prev))
    }, [player])

    return [stage, setStage, rowsCleared]
}