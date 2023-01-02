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
const p1Score = document.querySelector('.score__player')
const p2Score = document.querySelector('.score__cpu')
const p1ScoreParagraph = document.querySelector('.score__player-p')
const playerScorePoints = document.querySelector('.score__player--number')
const scoreTies = document.querySelector('.score__ties--number')
const p2ScoreParagraph = document.querySelector('.score__cpu-p')
const cpuScorePoints =  document.querySelector('.score__cpu--number')

let game = new Game

let grid = [
    [a,b,c],
    [d,e,f],
    [g,h,i]
]

newGameSolo.addEventListener('click', ()=>{
    //change to the GAME window
    document.querySelector('.start').style = 'display: none;'
    document.querySelector('.game').style = 'display: flex;'

    //make the turn mark start with x
    document.querySelector('.game__menu--turn-icon').src = '/assets/icon-x-grey.svg'
    
    //Get a new clean game
    game.clean()
    grid.flat().forEach(element => {
        element.innerHTML = ''
    })
    playerScorePoints.innerText = game.p1.score
    cpuScorePoints.innerText = game.p2.score
    scoreTies.innerText = game.draws

    if(game.p1.mark === 'x'){
        p1Score.style = 'background-color: var(--light-blue);'
        p2Score.style = 'background-color: var(--light-yellow);'
    } else if(game.p1.mark === 'o'){
        p1Score.style = 'background-color: var(--light-yellow);'
        p2Score.style = 'background-color: var(--light-blue);'
    }
})

//make the game object interact with the HTML board
grid.flat().forEach(element => {
    element.addEventListener('click',() => {

        let row = grid.findIndex(row => row.includes(element))
        let col = grid[row].indexOf(element)

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

            game.updateScore()

            playerScorePoints.innerText = game.p1.score
            cpuScorePoints.innerText = game.p2.score
            scoreTies.innerText = game.draws

            game.changePlayersMarks()

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

        document.querySelector('.game__menu--turn-icon').src =`/assets/icon-${game.RoundTurn}-grey.svg`
    })
})

//Winner Announcement
nextRoundBtn.addEventListener('click',() => {
    grid.flat().forEach(element => {
        element.innerHTML = ''
    })
    document.querySelector('.menu-modal').style = 'display: none;'
    document.querySelector('.game__menu--turn-icon').src = '/assets/icon-x-grey.svg'

    game.resetBoard()

    if(game.p1.mark === 'x'){
        p1Score.style = 'background-color: var(--light-blue);'
        p2Score.style = 'background-color: var(--light-yellow);'
    } else if(game.p1.mark === 'o'){
        p1Score.style = 'background-color: var(--light-yellow);'
        p2Score.style = 'background-color: var(--light-blue);'
    }
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
    document.querySelector('.game__menu--turn-icon').src = '/assets/icon-x-grey.svg'
    
    grid.flat().forEach(element => {
        element.innerHTML = ''
    })

    game.resetBoard()
})

cancelRestartBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: none;'
})





