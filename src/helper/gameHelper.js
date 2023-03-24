export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {

    // Create a new 2 by 2 array with a number and a state
    // the default state is 'clear'
    const return_array = Array.from(Array(STAGE_HEIGHT), () => {
        return new Array(STAGE_WIDTH).fill([0, 'clear'])
    })

    return return_array;
}

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {

    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            // 1. check that we are on an actual teromino cell 
            if (player.tetromino[y][x] === 0) {
                continue;
            }


            // 2. Check that the move is inside the game height
            if (!stage[y + player.pos.y + moveY]) {
                return true;
            }

            // 3. Check that the move is inside the game width
            const indexY = y + player.pos.y + moveY
            const indexX = x + player.pos.x + moveX

            if (!stage[indexY][Math.floor(indexX)] || !stage[indexY][Math.ceil(indexX)]) {
                return true;
            }

            // 4. Check that the cell we are moving to is not "clear"
            if (stage[indexY][Math.floor(indexX)][1] !== "clear") {
                return true;
            }
        }
    }
}
