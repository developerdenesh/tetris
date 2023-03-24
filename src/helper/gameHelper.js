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