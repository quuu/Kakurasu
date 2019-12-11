


function createGame() {
    document.getElementById('game').innerHTML = ''

    // create underlying representation
    // to keep track of score

    // variable to represent the values currently
    let upToDown = new Array(5)

    let leftToRight = new Array(5)

    // randomly creating the answer grid
    let answer = new Array(5)
    for (let i = 0; i < answer.length; i++){
        answer[i] = new Array(5);
    }
    for (let i = 0; i < answer.length; i++){
        for (let j = 0; j < answer[i].length; j++){
            answer[i][j] = Math.floor(Math.random() * 2)
        }
    }

    // generating the up to down answer
    for (let j = 0; j < answer.length; j++){
        let sum = 0
        for (let k = 0; k < answer[j].length; k++){
            sum+= (k+1)*answer[j][k]
        }
        upToDown[j] = sum
    }

    // generating the left to right answer
    for (let j = 0; j < answer.length; j++) {
        let sum = 0
        for (let k = 0; k < answer[j].length; k++) {
            sum += (k + 1) * answer[k][j]
        }
        leftToRight[j] = sum
    }

    // the game board representation to check for answer
    let gameBoard = new Array(5)
    for (let i = 0; i < gameBoard.length; i++){
        gameBoard[i] = new Array(5)
    }
    for (let i = 0; i < gameBoard.length; i++){
        for (let j = 0; j < gameBoard[i].length; j++){
            gameBoard[i][j] = 0
        }
    }

    let solved = 0

    /*

    @row int

    */
    function checkRow(row, col) {

        // check horizontally

        // get the target answer at that row
        const answer = upToDown[row]

        let sum = 0
        // loop through that row
        for (let i = 0; i < gameBoard[row].length; i++){
            sum = sum + (gameBoard[row][i] * (i + 1 ) )
        }
        if (sum == answer) {
            return true;
        }
        return false;

        
        
    }
    /*

    @col int

    */
    function checkCol(row, col) {

        const answer = leftToRight[col]

        let sum = 0

        for (let i = 0; i < gameBoard.length; i++){
            sum = sum + (gameBoard[i][col] * (i+1))
        }
        if (sum == answer) {
            return true;
        }
        return false;

    }


    function checkWin() {

        console.log(solved)
        if (solved == 10) {
            alert("Solved!")
        }
        
    }

    let grid = clickableGrid(6,6,function(el,row,col,i){
    /*
        console.log("You clicked on element:",el);
        console.log("You clicked on row:",row);
        console.log("You clicked on col:",col);
        console.log("You clicked on item #:",i);

    */
        // if already selected
        if (el.className == 'clicked') {

            // set it to unclicked
            el.className = ''
            gameBoard[row][col] = 0;

            // get sum of across
            if (checkRow(row, col)) {
                // color in that that row is completed
                let x = document.getElementById("grid").rows[row + 1].cells[6]
                x.className = 'clicked' 
                solved+=1
            }
            else {
                // color in that that row is completed
                let x = document.getElementById("grid").rows[row + 1].cells[6]

                // if it is not already unselected, unselect it and remove solved by 1
                if (x.className != '') {
                    x.className = '' 
                    solved-=1
                }
            }
            if (checkCol(row, col)){
                // color in that that column is completed
                let y = document.getElementById("grid").rows[6].cells[col + 1]
                y.className = 'clicked' 
                solved+=1
            } 
            else {
                
                // color in that that column is completed
                let y = document.getElementById("grid").rows[6].cells[col + 1]

                // only lower the solved count and change the classname if not already blank
                if (y.className != '') {
                    y.className = '' 
                    solved-=1
                }
            }
            
            checkWin()


        }

        // if not already selected
        else {
            el.className = 'clicked'
            gameBoard[row][col] = 1;

            // get sum of across
            if (checkRow(row, col)) {
                // color in that that row is completed
                let x = document.getElementById("grid").rows[row + 1].cells[6]
                x.className = 'clicked' 
                solved+=1
            } 
            else {
                // color in that that row is completed
                let x = document.getElementById("grid").rows[row + 1].cells[6]

                // make sure it's not already unselected
                if (x.className != '') {
                    x.className = '' 
                    solved-=1
                }
            }
            if (checkCol(row, col)){
                // color in that that column is completed
                let y = document.getElementById("grid").rows[6].cells[col + 1]
                y.className = 'clicked' 
                solved+=1
            }
            else {
                
                // color in that that column is completed
                let y = document.getElementById("grid").rows[6].cells[col + 1]

                // make sure it's not already unselected
                if (y.className != '') {
                    y.className = '' 
                    solved-=1
                }
            }

            checkWin()

        }

    });


    // add the grid to the page
    document.getElementById('game').appendChild(grid);

    // function tha generates a grid with row x cols size
    function clickableGrid( rows, cols, callback ){
        let i = 0;
        let j = 0;

        // create table
        let grid = document.createElement('table');
        grid.className = 'grid';
        grid.setAttribute("id", "grid")

        // generate rows
        for (let r = 0; r < rows+1; ++r){
            let col = grid.appendChild(document.createElement('col'))
            col.style.width = "100";
            let tr = grid.appendChild(document.createElement('tr'));

            // generate columns
            for (let c=0;c<cols+1;++c){
                let cell = tr.appendChild(document.createElement('td'));
                cell.style.height = "100";
                cell.style.width = "1.2em";

                // if it's either the top row, bottom row
                // left column, right column, don't add click event to it

                // main game pieces to click
                if (r > 0 && r < rows && c > 0 && c < cols) {

                    cell.addEventListener('click',(function(el,r,c,i){
                        return function(){
                            callback(el,r-1,c-1,i);
                        }
                    })(cell,r,c,i),false);
                }
                else {

                    if (r == 0 && i < rows) {
                        cell.innerHTML = i++;
                    }
                    if (c == 0 && j < cols) {
                        cell.innerHTML = j++;
                    }

                    // generates the bottom targets
                    if (r == rows && c > 0 && c < cols) {
                        cell.innerHTML=leftToRight[c-1]
                    }

                    // generates the right targets
                    if (c == cols && r > 0 && r < rows) {
                        cell.innerHTML = upToDown[r-1]
                    }
                }
            }

        }
        return grid;
    }


    console.log("Created new game!")
}

createGame()