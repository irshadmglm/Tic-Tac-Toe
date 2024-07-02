let squareArray = [];
let x = true;
let row =3;
let isRobo ;
let wid = 90;
function gameType(v){
  isRobo = v;
  restart();
}
function setBordWid(v){
 row = v;
 switch (v) {
    case 3:
      wid = 90;  
      restart();
        break;
    case 4:
    wid = 80;
    restart();
    break;
    case 5:
    wid = 70;
    restart();
    break;
    case 6:
    wid = 60;
    restart();
    break;
    default:
    wid = 90; 
    restart();
        break;
 }
}
setBoard()
function setBoard() {
    let board = document.getElementsByClassName("board")[0]; // Get the first element with class "board"
    for (let i = 0; i < row; i++) {
        squareArray[i] = [];
        for (let j = 0; j < row; j++) {
            let div = document.createElement('div');
            div.classList.add('squar');
            div.id = `${i}_${j}`;
            squareArray[i][j] = div.id;
            div.addEventListener('click', () => ifClick(div));
            div.style.width = `${wid}px`;
            div.style.height = `${wid}px`;
            board.appendChild(div);
        }
    }
    board.style.width = `${wid * row + 2*(row*2)}px`;
    board.style.height = `${wid * row+ 2*(row*2) }px`;
}

 function ifClick(div) {
    let element = div;
    if (element.classList.contains("x") || element.classList.contains("o")) {
      // Element already has a class of "x" or "o", do nothing
    }else{
        let h1 = document.createElement('h1');
        if (x) {
            h1.innerHTML = '✖️';
            element.classList.add("x");
            addToArray(div.id);
            x = false;
        } else {
            h1.innerHTML = '⭕️';
            element.classList.add("o");
            addToArray(div.id);
            x = true;
        }
        div.appendChild(h1);
        winCheck();
    }
    if (isRobo && !x) {
        setTimeout(robo, 500);
    }
}

function addToArray(id) {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < row; j++) {
            if (id == squareArray[i][j]) {
                x ? squareArray[i][j] = 'x' : squareArray[i][j] = 'o';
            }
        }
    }
}

function winCheck() {
    for(let i=0; i<row-2; i++){
        for(let j=0; j<row-2; j++){
                  // Check main diagonal (\)
    if (squareArray[i][j] === squareArray[i + 1][j + 1] && 
        squareArray[i + 1][j + 1] === squareArray[i + 2][j + 2] && 
        squareArray[i][i] !== `${i}_${j}`) {
            let type = "diagonal";
      setLine(i,j,type);

        alerts(squareArray[i][j]);
    }
    // Check anti-diagonal (/)
    if (squareArray[i][row - j - 1] === squareArray[i + 1][row - j - 2] && 
        squareArray[i + 1][row - j - 2] === squareArray[i + 2][row - j - 3] && 
        squareArray[i][row - j - 1] !== `${i}_${row - j - 1}`) {
        alerts(squareArray[i][row - j - 1]);
        let type = "anti-diagonal";
        setLine(i,j,type);
       }
     }
    }
   
    // Check rows and columns
    for (let i = 0; i < row; i++) {
       for(let j = 0; j < row-2; j++){
        if (squareArray[i][j] === squareArray[i][j+1] && squareArray[i][j+1] === squareArray[i][j+2] && squareArray[i][j+0] !== `${i}_${j}`) {
            let type = "horizontal";
        setLine(i,j,type);
            alerts(squareArray[i][j]);
        }
        if (squareArray[j][i] === squareArray[j+1][i] && squareArray[j+1][i] === squareArray[j+2][i] && squareArray[j][i] !== `${j}_${i}`) {
            let type = "vertical";
        setLine(i,j,type);
            alerts(squareArray[j][i]);
        }
       }
    }
}

function setLine(i, j, type) {
    console.log(`Setting line type ${type} at (${i},${j})`);
    if (type === "diagonal") {
        
        for(let n = 0; n < 3; n++){
            let element = document.getElementById(`${i+n}_${j+n}`);
            if (element) {
                element.style.backgroundColor = 'blue';
            }
        }
    } else if (type === "horizontal") {
        for(let n = 0; n < 3; n++){
            let element = document.getElementById(`${i}_${j+n}`);
            if (element) {
                element.style.backgroundColor = 'blue';
            }
        }
    } else if (type === "vertical") {
        for(let n = 0; n < 3; n++){
            let element = document.getElementById(`${i+n}_${j}`);
            if (element) {
                element.style.backgroundColor = 'blue';
            }
        }
    } else if (type === "anti-diagonal") {
        for(let n = 0; n < 3; n++){
            let element = document.getElementById(`${i+n}_${j-n}`);
            if (element) {
                element.style.backgroundColor = 'blue';
            }
        }
    }
}


function alerts(w){
    const customAlert = document.getElementById("customAlert");
  const alertText = document.getElementById("alertText");
  const closeAlert = document.getElementById("restart");
    w == 'x' ? w='✖️': w='⭕️';
  alertText.textContent = `${w} Win...!`;
  customAlert.style.display = "block";

  closeAlert.addEventListener("click", () => {
    restart();
    customAlert.style.display = "none";
    alertid.innerText = "";
  });
}
function restart() {
    // Clear the squareArray and board state
    squareArray = [];
    x = true;
    
    // Get the board element and clear its children
    let board = document.getElementsByClassName("board")[0];
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    
    // Reinitialize the board
    setBoard();
}


 function robo(){
    let position = goodPosition();
   addToArray(position);
   let element = document.getElementById(position);
   if (element) {
    element.classList.add("o");
    let h1 = document.createElement("h1");
    h1.innerHTML = '⭕️';
    element.appendChild(h1);
}
   x = true;
   winCheck();

}

function goodPosition() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < row - 1; j++) {
            // Check rows
            if (j + 1 < row && squareArray[i][j] === squareArray[i][j + 1]) {
                if (j === 0 && squareArray[i][j + 2] !== 'x' && squareArray[i][j + 2] !== 'o') {
                    return squareArray[i][j + 2];
                } 
                if (j === row - 2 && squareArray[i][j - 1] !== 'x' && squareArray[i][j - 1] !== 'o') {
                    return squareArray[i][j - 1];
                } 
                if (j !== 0 && j !== row - 2) {
                    if (squareArray[i][j - 1] !== 'x' && squareArray[i][j - 1] !== 'o') {
                        return squareArray[i][j - 1];
                    } else if (squareArray[i][j + 2] !== 'x' && squareArray[i][j + 2] !== 'o') {
                        return squareArray[i][j + 2];
                    }
                }
            } else if (j + 2 < row && squareArray[i][j] === squareArray[i][j + 2] && squareArray[i][j + 1] !== 'x' && squareArray[i][j + 1] !== 'o') {
                return squareArray[i][j + 1];
            }

            // Check columns
            if (j + 1 < row && squareArray[j][i] === squareArray[j + 1][i]) {
                if (j === 0 && squareArray[j + 2][i] !== 'x' && squareArray[j + 2][i] !== 'o') {
                    return squareArray[j + 2][i];
                } 
                if (j === row - 2 && squareArray[j - 1][i] !== 'x' && squareArray[j - 1][i] !== 'o') {
                    return squareArray[j - 1][i];
                } 
                if (j !== 0 && j !== row - 2) {
                    if (squareArray[j - 1][i] !== 'x' && squareArray[j - 1][i] !== 'o') {
                        return squareArray[j - 1][i];
                    } else if (squareArray[j + 2][i] !== 'x' && squareArray[j + 2][i] !== 'o') {
                        return squareArray[j + 2][i];
                    }
                }
            } else if (j + 2 < row && squareArray[j][i] === squareArray[j + 2][i] && squareArray[j + 1][i] !== 'x' && squareArray[j + 1][i] !== 'o') {
                return squareArray[j + 1][i];
            }
        }
    }



    for (let i = 0; i < row; i++) {
        for (let j = 0; j < row - 2; j++) {
            // Check diagonals '\'
            if (i + 2 < row && j + 2 < row && squareArray[i][j] === squareArray[i + 1][j + 1]) {
                if (squareArray[i + 2][j + 2] !== 'x' && squareArray[i + 2][j + 2] !== 'o') {
                    return squareArray[i + 2][j + 2];
                } else if (i > 0 && j > 0 && squareArray[i - 1][j - 1] !== 'x' && squareArray[i - 1][j - 1] !== 'o') {
                    return squareArray[i - 1][j - 1];
                }
            }
    
            if (i + 2 < row && j + 2 < row && squareArray[i][j] === squareArray[i + 2][j + 2] && squareArray[i + 1][j + 1] !== 'x' && squareArray[i + 1][j + 1] !== 'o') {
                return squareArray[i + 1][j + 1];
            }
    
            // Check diagonals '/'
            if (i + 2 < row && j + 2 < row && squareArray[i][j + 2] === squareArray[i + 1][j + 1]) {
                if (squareArray[i + 2][j] !== 'x' && squareArray[i + 2][j] !== 'o') {
                    return squareArray[i + 2][j];
                } else if (i > 0 && j + 2 < row && squareArray[i - 1][j + 2] !== 'x' && squareArray[i - 1][j + 2] !== 'o') {
                    return squareArray[i - 1][j + 2];
                }
            }
    
            if (i + 2 < row && j + 2 < row && squareArray[i][j + 2] === squareArray[i + 2][j] && squareArray[i + 1][j + 1] !== 'x' && squareArray[i + 1][j + 1] !== 'o') {
                return squareArray[i + 1][j + 1];
            }
        }
    }
    

    // If no optimal position is found, return the first available position
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < row; j++) {
            if (squareArray[i][j] !== 'x' && squareArray[i][j] !== 'o') {
                return squareArray[i][j];
            }
        }
    }
}

