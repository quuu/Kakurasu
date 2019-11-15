
function addHandlers(){


    var table = document.getElementById("grid");

    var cells = document.querySelectorAll("td");
    console.log(cells)
    for (var i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', function (e) {
            let temp = e.currentTarget;
            // if()
            temp.style.backgroundColor = '#f00'
        })
    }
// for (var i = 0, row; row = table.rows[i]; i++) {
//         console.log("this is row " +row)
//    //iterate through rows
//    //rows would be accessed using the "row" variable assigned in the for loop
//     for (var j = 0, col; col = row.cells[j]; j++) {
//         console.log("this is col ")
//         col.
//         console.log(col)
//      //iterate through columns
//      //columns would be accessed using the "col" variable assigned in the for loop
//    }  
// }
    // let grid = document.getElementsByClassName("grid")[0].children;
    // // let table = grid[2]
   
    // let table = grid[1].children;
    // // console.log(table)
    // for (let i = 0; i < table.length; i++){
    //     // console.log(table[i].children)
    //     for (let j = 0; j < table[i].children.length; j++){
    //         // console.log(table[i].children[i].innerHTML)
    //         // console.log(table[i].children)
    //     }
    // }
    // console.log(grid[1].children)

//   }
}

var grid = clickableGrid(6,6,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    // el.className = 'clicked';
    
    if (el.className == 'clicked') {
        el.className = ''
    }
    else {
        el.className = 'clicked'
    }
});

document.body.appendChild(grid);

// console.log(grid)
var table = document.getElementById("grid");
for (var i = 0, row; row = table.rows[i]; i++) {
    
    // console.log(row)
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
    for (var j = 0, col; col = row.cells[j]; j++) {
        if (i == 0) {
            // console.log("got")
            var cloned = col.cloneNode(true);
            col.parentNode.replaceChild(cloned, col)
            console.log("got")
        }

        
     //iterate through columns
     //columns would be accessed using the "col" variable assigned in the for loop
   }  
}
     
function clickableGrid( rows, cols, callback ){
    var i = 0;
    var j = 0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.setAttribute("id", "grid")
    for (var r = 0; r < rows+1; ++r){
        var col = grid.appendChild(document.createElement('col'))
        col.style.width = "100";
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols+1;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.style.height = "100";
            if (r == 0 && i < rows) {
                cell.innerHTML = i++;
            }
            if (c == 0 && j < cols) {
                cell.innerHTML = j++;
            }
            else {
                
                cell.addEventListener('click',(function(el,r,c,i){
                    return function(){
                        callback(el,r,c,i);
                    }
                })(cell,r,c,i),false);
            }
        }
    }
    return grid;
}
// addHandlers()
