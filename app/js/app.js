//Restart menu elements
const cancelRestartBtn = document.getElementById('cancelRestartBtn')
const confirmRestartBtn = document.getElementById('confirmRestartBtn')

//Reults menu elemts
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

newGameSolo.addEventListener('click', ()=>{
    document.querySelector('.start').style = 'display: none;'
    document.querySelector('.game').style = 'display: flex;'
})

restartBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: flex;'
})

quitBtn.addEventListener('click', () => {
    document.querySelector('.menu-modal').style = 'display: none '
})

