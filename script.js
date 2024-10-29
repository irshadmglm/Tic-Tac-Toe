let squareArray = [];
let x = true;
let row = 3;
let isRobo;
let wid = 90;

function gameType(v) {
  isRobo = v;
  restart();
}

function setBordWid(v) {
  row = v;
  switch (v) {
    case 3:
      wid = 90;
      break;
    case 4:
      wid = 80;
      break;
    case 5:
      wid = 70;
      break;
    case 6:
      wid = 60;
      break;
    default:
      wid = 90;
      break;
  }
  restart();
}

function setBoard() {
  let board = document.getElementsByClassName("board")[0];
  board.innerHTML = ''; 
  squareArray = [];

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
  board.style.width = `${wid * row + 2 * (row * 2)}px`;
  board.style.height = `${wid * row + 2 * (row * 2)}px`;
}

function ifClick(div) {
  if (div.classList.contains("x") || div.classList.contains("o")) return;

  let h1 = document.createElement('h1');
  h1.innerHTML = x ? '✖️' : '⭕️';
  div.classList.add(x ? "x" : "o");
  div.appendChild(h1);

  addToArray(div.id);
  x = !x;

  winCheck();

  if (isRobo && !x) setTimeout(robo, 500);
}

function addToArray(id) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < row; j++) {
      if (id === squareArray[i][j]) {
        squareArray[i][j] = x ? 'x' : 'o';
      }
    }
  }
}
// Function to dynamically check all possible winning conditions
function winCheck() {
    // Check rows
    for (let i = 0; i < row; i++) {
        for (let j = 0; j <= row - 3; j++) {
            if (
                squareArray[i][j] === squareArray[i][j + 1] &&
                squareArray[i][j + 1] === squareArray[i][j + 2] &&
                squareArray[i][j] !== `${i}_${j}`
            ) {
                setLine(i, j, 'horizontal');
                alerts(squareArray[i][j]);
                return;
            }
        }
    }

    // Check columns
    for (let i = 0; i < row; i++) {
        for (let j = 0; j <= row - 3; j++) {
            if (
                squareArray[j][i] === squareArray[j + 1][i] &&
                squareArray[j + 1][i] === squareArray[j + 2][i] &&
                squareArray[j][i] !== `${j}_${i}`
            ) {
                setLine(j, i, 'vertical');
                alerts(squareArray[j][i]);
                return;
            }
        }
    }

    // Check main diagonals
    for (let i = 0; i <= row - 3; i++) {
        for (let j = 0; j <= row - 3; j++) {
            if (
                squareArray[i][j] === squareArray[i + 1][j + 1] &&
                squareArray[i + 1][j + 1] === squareArray[i + 2][j + 2] &&
                squareArray[i][j] !== `${i}_${j}`
            ) {
                setLine(i, j, 'diagonal');
                alerts(squareArray[i][j]);
                return;
            }
            if (
                squareArray[i][j + 2] === squareArray[i + 1][j + 1] &&
                squareArray[i + 1][j + 1] === squareArray[i + 2][j] &&
                squareArray[i][j + 2] !== `${i}_${j + 2}`
            ) {
                setLine(i, j + 2, 'anti-diagonal');
                alerts(squareArray[i][j + 2]);
                return;
            }
        }
    }
}


function setLine(i, j, type) {
    if (type === "horizontal") {
        for (let n = 0; n < 3; n++) {
            document.getElementById(`${i}_${j + n}`).classList.add('winning-line');
        }
    } else if (type === "vertical") {
        for (let n = 0; n < 3; n++) {
            document.getElementById(`${i + n}_${j}`).classList.add('winning-line');
        }
    } else if (type === "diagonal") {
        for (let n = 0; n < 3; n++) {
            document.getElementById(`${i + n}_${j + n}`).classList.add('winning-line');
        }
    } else if (type === "anti-diagonal") {
        for (let n = 0; n < 3; n++) {
            document.getElementById(`${i + n}_${j - n}`).classList.add('winning-line');
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


function drawWinningLine(squares) {
    const line = document.getElementById("win-line");
    const board = document.querySelector(".board");

    // Coordinates of the first and last square in the winning line
    const startSquare = document.querySelector(`.squar[data-index="${squares[0]}"]`);
    const endSquare = document.querySelector(`.squar[data-index="${squares[2]}"]`);

    // Calculate position and size for the line
    const startX = startSquare.offsetLeft + startSquare.offsetWidth / 2;
    const startY = startSquare.offsetTop + startSquare.offsetHeight / 2;
    const endX = endSquare.offsetLeft + endSquare.offsetWidth / 2;
    const endY = endSquare.offsetTop + endSquare.offsetHeight / 2;

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Set line size, position, and rotation
    line.style.width = `${length}px`;
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
    line.style.transform = `rotate(${Math.atan2(deltaY, deltaX)}rad)`;
    line.style.display = "block"; // Show the line
}

