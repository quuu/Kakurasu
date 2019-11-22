
// create underlying representation
// to keep track of score

// variable to represent the values currently
var up_to_down = new Array(5)

var left_to_right = new Array(5)

// randomly creating the answer grid
var answer = new Array(5)
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
    up_to_down[j] = sum
}

// generating the left to right answer
for (let j = 0; j < answer.length; j++) {
    let sum = 0
    for (let k = 0; k < answer[j].length; k++) {
        sum += (k + 1) * answer[k][j]
    }
    left_to_right[j] = sum
}

// the game board representation to check for answer
var game_board = new Array(5)
for (let i = 0; i < game_board.length; i++){
    game_board[i] = new Array(5)
}
for (let i = 0; i < game_board.length; i++){
    for (let j = 0; j < game_board[i].length; j++){
        game_board[i][j] = 0
    }
}


function check_win() {

}

var grid = clickableGrid(6,6,function(el,row,col,i){
  /*
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

*/
    if (el.className == 'clicked') {
      el.className = ''
      game_board[row][col] = 0;
    }
    else {
      el.className = 'clicked'
      game_board[row][col] = 1;
    }

    console.log(game_board)
});


document.body.appendChild(grid);





function clickableGrid( rows, cols, callback ){
    var i = 0;
    var j = 0;

    // create table
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.setAttribute("id", "grid")

    // generate rows
    for (var r = 0; r < rows+1; ++r){
        var col = grid.appendChild(document.createElement('col'))
        col.style.width = "100";
        var tr = grid.appendChild(document.createElement('tr'));

        // generate columns
        for (var c=0;c<cols+1;++c){
            var cell = tr.appendChild(document.createElement('td'));
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
                    cell.innerHTML=left_to_right[c-1]
                }

                // generates the right targets
                if (c == cols && r > 0 && r < rows) {
                    cell.innerHTML = up_to_down[r-1]
                }
            }
        }

    }
    return grid;
}
