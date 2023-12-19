<script>
    import Key from "./Key.svelte"
    import { board, gameInfo, status, guess, GAME_WORD, gameOver } from "../store"

    const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const row3 = ["ENTER", 'z', 'x', 'c', 'v', 'b', 'n', 'm', "DEL"];

    const handelDelete = (rowindex, colindex) =>{

        if (colindex == 0) return;
        
        // adjust colindex
        colindex --;
        // clear the character in previous position
        board.update((prevBoard)=>{
        const newBoard = prevBoard;
        newBoard[rowindex][colindex] = "";
        return newBoard;
        })

        // updata gameInfo
        gameInfo.set({colindex, rowindex});
    }
    const handelEnter = (rowindex, colindex) =>{
        // console.log('GAME_WORD:' + $GAME_WORD)
        if (colindex != 5) return;

        // get current status grid
        const newStatus = $status;
        var letterInGameWord = $GAME_WORD.split('');
        var correctIndex = [];
        // console.log('initial letterInGameWord:' + letterInGameWord);

        // check input characters and update color
        let correctCountDown = 5;
        for (var index=0; index < 5; index ++){
            if ($board[rowindex][index] == $GAME_WORD[index]){
                // console.log( index +" is correct")
                newStatus[rowindex][index] = "correct";
                // correct count down by one
                correctCountDown --;
                // add correct index into list
                correctIndex.push(index);
                // console.log('correctIndex:' + correctIndex)
                // remove current letter from list
                var targetIndex = letterInGameWord.indexOf($board[rowindex][index]);
                letterInGameWord.splice(targetIndex, 1)
                // console.log('correct, letterInGameWord:' + letterInGameWord);
            }
        }

        for (var index=0; index < 5; index ++){
            // bypass the correct index got in previous loop
            if (correctIndex.includes(index)) {
                // console.log(index + " is in " + correctIndex )
                continue;
            }
            // check if the letter in current index in letterInGameWord
            var targetIndex = letterInGameWord.indexOf($board[rowindex][index]);
            if ( targetIndex != -1) {
                newStatus[rowindex][index] = "in";
                // remove current letter from list
                letterInGameWord.splice(targetIndex,1)
                // console.log('in, letterInGameWord:' + letterInGameWord);
            }
            else{
                newStatus[rowindex][index] = "wrong"
            }
        }
        // update status grid
        status.set(newStatus);

        // updata guess
        guess.update((prev) => {
            const newGuess = prev;
            const currentGuess = $board[rowindex].join('');
            // console.log("current guess:" + currentGuess);
            newGuess.push(currentGuess);
            // console.log("guess:" + newGuess);
            return newGuess;
        })
        

        // check if the whole word is correct
        if (correctCountDown == 0 || rowindex == 5){
            gameOver.set(true);
        }
        else {    
            // start a new row
            rowindex ++;
            // colindex set to the beginning of a row
            colindex = 0;
            // update rowindex and colindex value in gameInfo
            gameInfo.set({colindex, rowindex});
        }
    }

    const keyPressed = (key = "")=>{
        // console.log(key + " pressed");
        let {colindex, rowindex} = $gameInfo;
        // handel delete
        if (key == "DEL"){
            handelDelete(rowindex, colindex);
            return;
        }
        else if (key == "ENTER") {
            handelEnter(rowindex, colindex);
            return;
        }

        // colindex is out of range of current row
        if (colindex > 4) return;

        board.update((prevBoard)=>{
            const newBoard = prevBoard;
            newBoard[rowindex][colindex] = key;
            return newBoard;
        })

        // adjust colindex and rowindex
        colindex ++;
        // console.log("colindex: " + colindex);

        gameInfo.set({colindex, rowindex})
    }
</script>

<div class="keyboard">
    <div class="keyboardrow">
        {#each row1 as char}
            <Key {char} {keyPressed}/>
        {/each}
    </div>
    <div class="keyboardrow">
        {#each row2 as char}
            <Key {char} {keyPressed}/>
        {/each}
    </div>
    <div class="keyboardrow">
        {#each row3 as char}
            <Key {char} {keyPressed}/>
        {/each}
    </div>
</div>

<style>
    .keyboard {
        position: fixed;
        width: fit-content;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0%);
    }
    .keyboardrow {
        display: flex;
        align-items: center;
        justify-content: center;

    }
</style>