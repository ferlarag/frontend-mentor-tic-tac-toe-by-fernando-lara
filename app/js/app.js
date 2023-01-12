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
const pickMarkBtn = document.getElementById('pickMark')
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

//Check if theres a games has started
if(localStorage.getItem('gameState') !== null){
    game.reloadGame()

    //change to the GAME window
    document.querySelector('.start').style = 'display: none;'
    document.querySelector('.game').style = 'display: flex;'

    //change the turn mark to match the players turn
    document.querySelector('.game__menu--turn-icon').src = `/assets/icon-${game.RoundTurn}-grey.svg`

    p1ScoreParagraph.innerText = `${game.p1.mark} (P1)`
    playerScorePoints.innerText = game.p1.score
    if(!game.multiplayer){
        p2ScoreParagraph.innerText = `${game.p2.mark} (CPU)`
    } else {
        p2ScoreParagraph.innerText = `${game.p2.mark} (P2)`
    }
    
    cpuScorePoints.innerText = game.p2.score
    scoreTies.innerText = game.draws

    //change the marks 
    if(game.p1.mark === 'x'){
        p1Score.style = 'background-color: var(--light-blue);'
        p2Score.style = 'background-color: var(--light-yellow);'
    } else if(game.p1.mark === 'o'){
        p1Score.style = 'background-color: var(--light-yellow);'
        p2Score.style = 'background-color: var(--light-blue);'
    }
}

let grid = [
    [a,b,c],
    [d,e,f],
    [g,h,i]
]


//choose the P1 mark button
pickMarkBtn.addEventListener('click', () => {
    pickContainer.classList.toggle('pick__btn-container--front-clicked')
    game.changePlayersMarks()
    if(pickContainer.classList.contains('pick__btn-container--front-clicked')){
        pickIcon.src = '/assets/icon-o-dark.svg'
    } else {
        pickIcon.src = '/assets/icon-x-dark.svg'
    }
})
newGameSolo.addEventListener('click', () => {
    //change to the GAME window
    document.querySelector('.start').style = 'display: none;'
    document.querySelector('.game').style = 'display: flex;'

    //make the turn mark start with x
    document.querySelector('.game__menu--turn-icon').src = '/assets/icon-x-grey.svg'

    //Get a new clean game
    game.clean()

    game.multiplayer = false
    if(pickContainer.classList.contains('pick__btn-container--front-clicked')){
        game.p1.mark = 'o'
        game.p2.mark = 'x'
    }

    //Make sure the board and score are visually reseted
    grid.flat().forEach(element => {
        element.style = 'background-color: var(--semi-dark-navy);'
        element.innerHTML = `<img class="tile__icon--hover-hidden" src="/assets/icon-x-outline.svg" alt="Mark icon">`
    })

    if(!game.multiplayer && game.p2.mark === 'x'){
        let mark = game.getBestMove()
        game.makeCPUMove()
        grid[mark.i][mark.j].innerHTML = `<img class="tile__icon" src="/assets/icon-${game.p2.mark}.svg" alt="icon ${game.p2.mark}">`
    }

    p1ScoreParagraph.innerText = `${game.p1.mark} (P1)`
    playerScorePoints.innerText = game.p1.score
    p2ScoreParagraph.innerText = `${game.p2.mark} (CPU)`
    cpuScorePoints.innerText = game.p2.score
    scoreTies.innerText = game.draws

    //change the marks 
    if(game.p1.mark === 'x'){
        p1Score.style = 'background-color: var(--light-blue);'
        p2Score.style = 'background-color: var(--light-yellow);'
    } else if(game.p1.mark === 'o'){
        p1Score.style = 'background-color: var(--light-yellow);'
        p2Score.style = 'background-color: var(--light-blue);'
    }
})

//Multiplayer Mode
newGameMulti.addEventListener('click', ()=>{

    //change to the GAME window
    document.querySelector('.start').style = 'display: none;'
    document.querySelector('.game').style = 'display: flex;'

    //make the turn mark start with x
    document.querySelector('.game__menu--turn-icon').src = '/assets/icon-x-grey.svg'
    
    //Get a new clean game
    game.clean()
    game.multiplayer = true
    if(pickContainer.classList.contains('pick__btn-container--front-clicked')){
        game.p1.mark = 'o'
        game.p2.mark = 'x'
    }

    //Make sure the board and score are visually reseted
    grid.flat().forEach(element => {
        element.style = 'background-color: var(--semi-dark-navy);'
        element.innerHTML = `<img class="tile__icon--hover-hidden" src="/assets/icon-x-outline.svg" alt="Mark icon">`
    })

    p1ScoreParagraph.innerText = `${game.p1.mark} (P1)`
    playerScorePoints.innerText = game.p1.score
    p2ScoreParagraph.innerText = `${game.p2.mark} (P2)`
    cpuScorePoints.innerText = game.p2.score
    scoreTies.innerText = game.draws


    //change the marks 
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

    //Make the mark outline appear when mouse hovers over the cell
    element.addEventListener('mouseenter', () => {
        let row = grid.findIndex(row => row.includes(element))
        let col = grid[row].indexOf(element)

        if(!element.querySelector('.tile__icon')){
            if(!game.multiplayer){
                grid[row][col].innerHTML = `<img class="tile__icon--hover-block" src="/assets/icon-${game.p1.mark}-outline.svg" alt="Mark icon">`
            } else {
                grid[row][col].innerHTML = `<img class="tile__icon--hover-block" src="/assets/icon-${game.RoundTurn}-outline.svg" alt="Mark icon">`
            }
        }
    })

    element.addEventListener('mouseleave', () => {
        let row = grid.findIndex(row => row.includes(element))
        let col = grid[row].indexOf(element)

        if(!element.querySelector('.tile__icon')){
            if(!game.multiplayer){
                grid[row][col].innerHTML = `<img class="tile__icon--hover-hidden" src="/assets/icon-${game.p1.mark}-outline.svg" alt="Mark icon">`
            } else {
                grid[row][col].innerHTML = `<img class="tile__icon--hover-hidden" src="/assets/icon-${game.RoundTurn}-outline.svg" alt="Mark icon">`
            }
        }
    })
    
    //====== Place the mark when clicked and ======
    //check for win after every move
    element.addEventListener('click',() => {
        let row = grid.findIndex(row => row.includes(element))
        let col = grid[row].indexOf(element)

        if(element.querySelector('.tile__icon--hover-block')){
            if(!game.multiplayer){
                grid[row][col].innerHTML = `<img class="tile__icon" src="/assets/icon-${game.p1.mark}.svg" alt="icon ${game.p1.mark}">`
            } else {
                grid[row][col].innerHTML = `<img class="tile__icon" src="/assets/icon-${game.RoundTurn}.svg" alt="icon ${game.RoundTurn}">`
            }
        }

        if(!game.multiplayer){
            game.makeMove(row,col,game.p1.mark)
        } else {
            game.makeMove(row,col,game.RoundTurn)
        }
        game.checkWinner()
        game.checkWinnerLine()

        //Make CPU move
        //ONLY IF THE GAME IS NOT OVER
        if(!game.multiplayer && game.board.flat().includes('')){
            let mark = game.getBestMove()
            game.makeCPUMove()
            grid[mark.i][mark.j].innerHTML = `<img class="tile__icon" src="/assets/icon-${game.p2.mark}.svg" alt="icon ${game.p2.mark}">`
        }

        if(game.checkWinner() !== ''){

            //show the winner annoucement bar when games finish
            document.querySelector('.menu-modal').style = 'display: flex;'
            document.querySelector('.menu-modal__winner').style = 'display: flex;'
            document.querySelector('.menu-modal__restart').style = 'display: none;'

            //update the game object score and the html score
            game.updateScore()
            p1ScoreParagraph.innerText = `${game.p1.mark} (P1)`
            playerScorePoints.innerText = game.p1.score
            p2ScoreParagraph.innerText = `${game.p2.mark} (P2)`
            cpuScorePoints.innerText = game.p2.score
            scoreTies.innerText = game.draws

            //------Make the grid the same color as the winner here-----
            if (game.winLine.direction === 'row'){
                for(let i = 0; i < 3; i++){
                    let element = grid[game.winLine.index][i]
                    if(game.checkWinner() === 'x'){
                        element.style = 'background-color: var(--light-blue);'
                        element.innerHTML = `<img class="tile__icon" src="/assets/icon-${game.checkWinner()}-dark.svg" alt="icon ${game.checkWinner()}">`
                    } else {
                        element.style = 'background-color: var(--light-yellow);'
                        element.innerHTML = `<img class="tile__icon" src="/assets/icon-${game.checkWinner()}-dark.svg" alt="icon ${game.checkWinner()}">`
                    }
                }
            } else if(game.winLine.direction === 'col'){
                for(let i = 0; i < 3; i++){
                    let element = grid[i][game.winLine.index]
                    if(game.checkWinner() === 'x'){
                        element.style = 'background-color: var(--light-blue);'
                        element.innerHTML = `<img class="tile__icon" src="/assets/icon-${game.checkWinner()}-dark.svg" alt="icon ${game.checkWinner()}">`
                    } else {
                        element.style = 'background-color: var(--light-yellow);'
                        element.innerHTML = `<img class="tile__icon" src="/assets/icon-${game.checkWinner()}-dark.svg" alt="icon ${game.checkWinner()}">`
                    }
                }
            } else if(game.winLine.direction === 'd'){
                if(game.winLine.index === 0){
                    for(let i = 0; i < 3; i++){
                        let element = grid[i][i]
                        if(game.checkWinner() === 'x'){
                            element.style = 'background-color: var(--light-blue);'
                            element.innerHTML = `<img class="tile__icon" src="/assets/icon-${game.checkWinner()}-dark.svg" alt="icon ${game.checkWinner()}">`
                        } else {
                            element.style = 'background-color: var(--light-yellow);'
                            element.innerHTML = `<img class="tile__icon" src="/assets/icon-${game.checkWinner()}-dark.svg" alt="icon ${game.checkWinner()}">`
                        }
                    }
                } else {
                    let color = game.checkWinner() === 'x' ? 'var(--light-blue)' : 'var(--light-yellow)';
                    let icon = `<img class="tile__icon" src="/assets/icon-${game.checkWinner()}-dark.svg" alt="icon ${game.checkWinner()}">`;

                    for (let i = 0; i < grid.length; i++) {
                        grid[i][2 - i].style = `background-color: ${color}`;
                        grid[i][2 - i].innerHTML = icon;
                    }
                }
            }

            game.changePlayersMarks()

            //change the winner announcement styling
            if(game.checkWinner() === 'x'){
                winnerIcon.src = '/assets/icon-x.svg'
                winnerIcon.style = 'display: block;'
                winnerP.style = 'color: var(--light-blue);'
                winnerP.innerText = 'Takes the round'
            } else if (game.checkWinner() === 'o'){
                winnerIcon.src = '/assets/icon-o.svg'
                winnerIcon.style = 'display: block;'
                winnerP.style = 'color: var(--light-yellow);'
                winnerP.innerText = 'Takes the round'
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
//next round button
nextRoundBtn.addEventListener('click',() => {
    grid.flat().forEach(element => {
        element.style = 'background-color: var(--semi-dark-navy);'
        element.innerHTML = `<img class="tile__icon--hover-hidden" src="/assets/icon-x-outline.svg" alt="Mark icon">`
    })

    document.querySelector('.menu-modal').style = 'display: none;'

    //reset the turn icon
    document.querySelector('.game__menu--turn-icon').src = '/assets/icon-x-grey.svg'

    p1ScoreParagraph.innerText = `${game.p1.mark} (P1)`
    p2ScoreParagraph.innerText = `${game.p2.mark} (P2)`

    if(game.p1.mark === 'x'){
        p1Score.style = 'background-color: var(--light-blue);'
        p2Score.style = 'background-color: var(--light-yellow);'
    } else if(game.p1.mark === 'o'){
        p1Score.style = 'background-color: var(--light-yellow);'
        p2Score.style = 'background-color: var(--light-blue);'
    }

    game.resetBoard()

    if(!game.multiplayer && game.board.flat().includes('') && game.p2.mark === 'x'){
        let mark = game.getBestMove()
        game.makeCPUMove()
        grid[mark.i][mark.j].innerHTML = `<img class="tile__icon" src="/assets/icon-${game.p2.mark}.svg" alt="icon ${game.p2.mark}">`
    }

    game.saveGame()
})

//quit button
quitBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: none '
    document.querySelector('.game').style = 'display: none;'
    document.querySelector('.start').style = 'display: flex'

    //reset the SELECT MARK button
    pickContainer.classList.remove('pick__btn-container--front-clicked')
    pickContainer.classList.add('pick__btn-container--front')
    pickIcon.src = '/assets/icon-x-dark.svg'

    game.clean()
})



//Restart game
//restart button
restartBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: flex;'
    document.querySelector('.menu-modal__winner').style = 'display: none;'
    document.querySelector('.menu-modal__restart').style = 'display: flex;'
})

//confirm restart (modal button)
confirmRestartBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: none;'
    document.querySelector('.game__menu--turn-icon').src = '/assets/icon-x-grey.svg'
    
    //Make sure the game round starts from zero
    grid.flat().forEach(element => {
        element.style = 'background-color: var(--semi-dark-navy);'
        element.innerHTML = ''
    })
    game.resetBoard()
})

//cancel restart (modal button)
cancelRestartBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: none;'
})