export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createState = () => {

    // Create a new 2 by 2 array with a number and a state
    // the default state is 'clear'
    Array.from(Array(STAGE_HEIGHT), () => {
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    })
}