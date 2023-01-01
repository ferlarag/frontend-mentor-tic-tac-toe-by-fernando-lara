import Game from "./game.js"

//Restart menu elements
const cancelRestartBtn = document.getElementById('cancelRestartBtn')
const confirmRestartBtn = document.getElementById('confirmRestartBtn')

//Reults menu elemts
const winnerIcon = document.querySelector('.menu-modal__winner-icon')
const winnerP = document.querySelector('.menu-modal__winner-title')
const quitBtn = document.getElementById('quitBtn')
const nextRoundBtn = document.getElementById('nextRoundBtn')

//Start menu elements
const pickIcon = document.querySelector('.pick__toggle--icon')
const pickContainer = document.querySelector('.pick__btn-container--front')
const pickMark = document.getElementById('pickMark')
const newGameSolo = document.getElementById('newGameSolo')
const newGameMulti = document.getElementById('newGameMulti')
const restartBtn = document.getElementById('restartBtn')

//Board elements
const [a,b,c,d,e,f,g,h,i] = document.getElementsByClassName('tile')
const playerScoreParagraph = document.querySelector('.score__player-p')
const playerScorePoints = document.querySelector('.score__player--number')
const scoreTies = document.querySelector('.score__ties--number')
const cpuScoreParagraph = document.querySelector('.score__cpu-p')
const cpuScorePoints =  document.querySelector('.score__cpu--number')

let game = new Game

playerScorePoints.innerText = game.p1.score
cpuScorePoints.innerText = game.p2.score
scoreTies.innerText = game.draws

let grid = [
    [a,b,c],
    [d,e,f],
    [g,h,i]
]

newGameSolo.addEventListener('click', ()=>{
    document.querySelector('.start').style = 'display: none;'
    document.querySelector('.game').style = 'display: flex;'
    game.clean()
})

//make the game object interact with the HTML board
grid.flat().forEach(element => {
    element.addEventListener('click',() => {
        let row = grid.findIndex(row => row.includes(element));
        let col = grid[row].indexOf(element);
        if(element.innerHTML === ''){
            grid[row][col].innerHTML = `<img class="tile__icon" src="/assets/icon-${game.RoundTurn}.svg" alt="icon ${game.RoundTurn}">`
        }
        game.makeMove(row,col,game.RoundTurn)
        game.checkWinner()

        if(game.checkWinner() !== ''){

            //show the winner annoucement bar when games finish
            document.querySelector('.menu-modal').style = 'display: flex;'
            document.querySelector('.menu-modal__winner').style = 'display: flex;'
            document.querySelector('.menu-modal__restart').style = 'display: none;'
            game.changePlayersMarks()

            //update the score
            game.updateScore()
            playerScorePoints.innerText = game.p1.score
            cpuScorePoints.innerText = game.p2.score
            scoreTies.innerText = game.draws

            //change the winner announcement styling
            if(game.checkWinner() === 'x'){
                winnerIcon.src = '/assets/icon-x.svg'
                winnerIcon.style = 'display: block;'
                winnerP.style = 'color: var(--light-blue);'
            } else if (game.checkWinner() === 'o'){
                winnerIcon.src = '/assets/icon-o.svg'
                winnerIcon.style = 'display: block;'
                winnerP.style = 'color: var(--light-yellow);'
            } else if (game.checkWinner() === 'draw'){
                winnerIcon.style = 'display: none;'
                winnerP.style = 'color: var(--silver);'
                winnerP.innerText = 'Round tied'
            }
        } 
    })
})

//Winner Announcement
nextRoundBtn.addEventListener('click',() => {
    grid.flat().forEach(element => {
        element.innerHTML = ''
    });
    document.querySelector('.menu-modal').style = 'display: none;'
    game.resetBoard()
})


quitBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: none '
    document.querySelector('.game').style = 'display: none;'
    document.querySelector('.start').style = 'display: flex'
    game.clean()
})



//Restart game
restartBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: flex;'
    document.querySelector('.menu-modal__winner').style = 'display: none;'
    document.querySelector('.menu-modal__restart').style = 'display: flex;'
})


confirmRestartBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: none;'
    
    grid.flat().forEach(element => {
        element.innerHTML = ''
    })

    game.resetBoard()
})

cancelRestartBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: none;'
})





