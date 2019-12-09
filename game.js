
// create underlying representation
// to keep track of score

// variable to represent the values currently
let UpToDown = new Array(5)

let LeftToRight = new Array(5)

// randomly creating the Answer grid
let Answer = new Array(5)
for (let i = 0; i < Answer.length; i++){
    Answer[i] = new Array(5);
}
for (let i = 0; i < Answer.length; i++){
    for (let j = 0; j < Answer[i].length; j++){
        Answer[i][j] = Math.floor(Math.random() * 2)
    }
}

// generating the up to down Answer
for (let j = 0; j < Answer.length; j++){
    let sum = 0
    for (let k = 0; k < Answer[j].length; k++){
        sum+= (k+1)*Answer[j][k]
    }
    UpToDown[j] = sum
}

// generating the left to right Answer
for (let j = 0; j < Answer.length; j++) {
    let sum = 0
    for (let k = 0; k < Answer[j].length; k++) {
        sum += (k + 1) * Answer[k][j]
    }
    LeftToRight[j] = sum
}

// the game board representation to check for Answer
let GameBoard = new Array(5)
for (let i = 0; i < GameBoard.length; i++){
    GameBoard[i] = new Array(5)
}
for (let i = 0; i < GameBoard.length; i++){
    for (let j = 0; j < GameBoard[i].length; j++){
        GameBoard[i][j] = 0
    }
}

let solved = 0

/*

@row int

*/
function CheckRow(row, col) {

    // check horizontally

    // get the target Answer at that row
    const Answer = UpToDown[row]

    let sum = 0
    // loop through that row
    for (let i = 0; i < GameBoard[row].length; i++){
        sum = sum + (GameBoard[row][i] * (i + 1 ) )
    }
    if (sum == Answer) {
        return true;
    }
    return false;

    
    
}
/*

@col int

*/
function CheckCol(row, col) {

    const Answer = LeftToRight[col]

    let sum = 0

    for (let i = 0; i < GameBoard.length; i++){
        sum = sum + (GameBoard[i][col] * (i+1))
    }
    if (sum == Answer) {
        return true;
    }
    return false;

}


function CheckWin() {

    console.log(solved)
    if (solved == 10) {
        alert("gottem")
    }
    
}

let grid = ClickableGrid(6,6,function(el,row,col,i){
  /*
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

*/
    // if already selected
    if (el.className == 'clicked') {
        el.className = ''
        GameBoard[row][col] = 0;

        // get sum of across
        if (CheckRow(row, col)) {

            // color in that that row is completed
            let x = document.getElementById("grid").rows[row + 1].cells[6]
            x.className = 'clicked' 
            solved+=1
        }
        else {
            // color in that that row is completed
            let x = document.getElementById("grid").rows[row + 1].cells[6]
            x.className = '' 
            solved-=1
        }
        if (CheckCol(row, col)){
            // color in that that column is completed
        
            let y = document.getElementById("grid").rows[6].cells[col + 1]
            y.className = 'clicked' 
            solved+=1
        } 
        else {
            
            // color in that that column is completed
            let y = document.getElementById("grid").rows[6].cells[col + 1]
            y.className = '' 
            solved-=1
        }
        
        CheckWin()


    }

    // if not already selected
    else {
        el.className = 'clicked'
        GameBoard[row][col] = 1;

        // get sum of across
        if (CheckRow(row, col)) {

            // color in that that row is completed
            let x = document.getElementById("grid").rows[row + 1].cells[6]
            x.className = 'clicked' 
            solved+=1
        } 
        else {
            
            // color in that that row is completed
            let x = document.getElementById("grid").rows[row + 1].cells[6]
            x.className = '' 
            solved-=1
        }
        if (CheckCol(row, col)){
            // color in that that column is completed
        
            let y = document.getElementById("grid").rows[6].cells[col + 1]
            y.className = 'clicked' 
            solved+=1
        }
        else {
            
            // color in that that column is completed
            let y = document.getElementById("grid").rows[6].cells[col + 1]
            y.className = '' 
            solved-=1
        }

        CheckWin()



    }

});


document.body.appendChild(grid);





function ClickableGrid( rows, cols, callback ){
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
                    cell.innerHTML=LeftToRight[c-1]
                }

                // generates the right targets
                if (c == cols && r > 0 && r < rows) {
                    cell.innerHTML = UpToDown[r-1]
                }
            }
        }

    }
    return grid;
}


function Solve() {
    console.log("solving the current game")
}



function CreateGame() {
    console.log("generating game")
}