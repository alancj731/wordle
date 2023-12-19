import {writable} from "svelte/store"

export const words_list = ['APPLE', 'CANDY', 'REACT', 'SWIFT', 'SVELTE', 'AZURE', 'CLOUD', 'WATER', 'EARTH', 'MUSIC', 'HAPPY', 'SMILE', 'QUICK', 'BROWN', 'LUCKY', 'GOOSE', 'NOISE'];

export function createGrid(){
    const grid = [];
    // create a 6 x 5 gird
    for (let row =0; row <6; row++){
        grid.push([]);
        for (let col=0; col<5; col++) grid[row].push("");
    }
    return grid;
}

export const board = writable(createGrid());
export const gameInfo = writable({
    // column index
    colindex: 0,
    // row index
    rowindex: 0
});

export const gameOver = writable(false);
export const GAME_WORD = writable(words_list[Math.floor(Math.random() * words_list.length)]);
export const guess = writable([]);
export const status = writable(createGrid());

