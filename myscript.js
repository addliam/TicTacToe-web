
// -1 in array means blank space
var winpattern = [
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7],
]
// create a function who analyze the board and return the winner
function analyze(board){
    // return the symbol used by the winner or -1 for draw

    // determinate blanks spaces return -1 if its fulled and theres no winner
    var blanks = board.reduce((acc,curr)=>{
        if (curr==-1) acc += 1;
        return acc;
    },0);
    // another way to determine if all elements of board are blanks
    // var blanks = 0
    // for (let elem of board){
    //     if (elem == -1){
    //         blanks += 1;
    //     }
    // }
    for (const wp of winpattern){
        // extract first, second, and third element for every winpattern
        // decrease one (-1) for use as index
        a = wp[0]-1;
        b = wp[1]-1;
        c = wp[2]-1;
        // verify the board element is different from -1 because it means blank space
        if (board[a]!=-1 && board[a] == board[b] && board[a] == board[c]){
            return board[a];
        }
    }
    if (blanks==0){
        // draw (empate)
        return -1;
    }
    // else theres no winner still
    else{
        return null;
    }
    
}

function renderCross(node){
    const svgCross = document.createElementNS('http://www.w3.org/2000/svg','svg');
    const svgRect1 = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    const svgRect2 = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    svgCross.setAttribute('width','54');
    svgCross.setAttribute('height','52');
    svgCross.setAttribute('viewBox','0 0 54 52');
    svgCross.setAttribute('fill','none');

    svgRect1.setAttribute('x','1.41421');
    svgRect1.setAttribute('y','45.9619');
    svgRect1.setAttribute('width','65');
    svgRect1.setAttribute('height','8');
    svgRect1.setAttribute('rx','4');
    svgRect1.setAttribute('transform','rotate(-45 1.41421 45.9619)');
    svgRect1.setAttribute('fill','#F05454');

    svgRect2.setAttribute('x','5.65685');
    svgRect2.setAttribute('width','65');
    svgRect2.setAttribute('height','8');
    svgRect2.setAttribute('rx','4');
    svgRect2.setAttribute('transform','rotate(45 5.65685 0)');
    svgRect2.setAttribute('fill','#F05454');

    svgCross.appendChild(svgRect1);
    svgCross.appendChild(svgRect2);
    node.appendChild(svgCross);
}

function renderCircle(node){
    const svgEllipse = document.createElementNS('http://www.w3.org/2000/svg','svg');
    const circleEllipse = document.createElementNS('http://www.w3.org/2000/svg','circle');
    svgEllipse.setAttribute('width','56');
    svgEllipse.setAttribute('height','56');
    svgEllipse.setAttribute('viewBox','0 0 56 56');
    svgEllipse.setAttribute('fill','none');
    circleEllipse.setAttribute('cx','28');
    circleEllipse.setAttribute('cy','28');
    circleEllipse.setAttribute('r','24');
    circleEllipse.setAttribute('stroke','#30475E');
    circleEllipse.setAttribute('stroke-width','8');
    svgEllipse.appendChild(circleEllipse);
    node.appendChild(svgEllipse);
}
var currentTurn = 0;
var usedBoxes = [];
// 0 = O, 1 = X 
var board = [
    -1,-1,-1,
    -1,-1,-1,
    -1,-1,-1];

function resetGame(){
    board = [
        -1,-1,-1,
        -1,-1,-1,
        -1,-1,-1];
    usedBoxes = [];
    document.querySelectorAll('svg').forEach(element =>{
        element.remove();
    });
    var contMessage = document.getElementById('message');
}

function addValueToBoard(position){
    indxStart = position - 1;
    board.splice(indxStart,1,currentTurn);
    usedBoxes.push(position);
}

function clickedBox(num){
    var contMessage = document.getElementById('message');
    contMessage.innerHTML = '';
    // check if box position was already clicked
    if  (!usedBoxes.includes(num)){
        // first 
        addValueToBoard(num);
        var selectorBox = num.toString();
        var boxCurrent = document.getElementById(selectorBox);
        if (currentTurn==0){
            renderCircle(boxCurrent);
        }
        else if(currentTurn == 1){
            renderCross(boxCurrent);
        }
        // change turn symbol only if not useBoxes
        currentTurn = currentTurn == 0 ? 1 : 0;
    }
    else{
        console.log('WARNING: box used')
    }

    var resultWinner = analyze(board);
    console.log('Winner',resultWinner);
    if (resultWinner != null){
        
        if(resultWinner == 0){
            var msg = 'PLAYER 1 WON!';
            contMessage.style.setProperty('color','var(--color-blue)');
        }
        else if(resultWinner == 1){
            var msg = 'PLAYER 2 WON!';
            contMessage.style.setProperty('color','var(--color-red)');
        }
        else if(resultWinner == -1){
            var msg = 'DRAW!';
            contMessage.style.setProperty('color','#333333')
        }
        contMessage.innerHTML = msg;
        resetGame();
    }
    
    // paint current player turn
    if (currentTurn == 0){
        pl1 = document.querySelector('#player1');
        pl1.style.setProperty('background-color','#31d100');
        pl2 = document.querySelector('#player2');
        pl2.style.setProperty('background-color','transparent');
    }
    else if (currentTurn == 1){
        pl1 = document.querySelector('#player1');
        pl1.style.setProperty('background-color','transparent');
        pl2 = document.querySelector('#player2');
        pl2.style.setProperty('background-color','#31d100');
    }
    
}
// addEventListener to all elements box
document.querySelectorAll('.box').forEach(element => {
    element.addEventListener('click',function(){
        clickedBox(element.id);
    });
});
