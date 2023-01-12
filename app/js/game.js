export default class Game {
  constructor(){
      this.multiplayer = false
      this.RoundTurn = 'x'
      this.draws = 0
      this.p1 = {
          score: 0,
          mark: 'x'
      }
      this.p2 = {
          score: 0,
          mark: 'o'
      }
      this.board = 
      [
          ['','',''],
          ['','',''],
          ['','','']
      ]
      this.winLine ={
          direction: '',
          index: -1
      }
  }

  saveGame(){
    let gameState = {
      multiplayer: this.multiplayer,
      RoundTurn: this.RoundTurn,
      draws: this.draws,
      p1: this.p1,
      p2: this.p2,
      board: this.board,
      winLine: this.winLine
    }

    let gameStateJSON = JSON.stringify(gameState)
    
    localStorage.setItem('gameState', gameStateJSON)
    
  }

  reloadGame(){
    let gameStateJSON = localStorage.getItem('gameState')

    let gameState = JSON.parse(gameStateJSON)
    
    this.multiplayer = gameState.multiplayer
    this.RoundTurn = gameState.RoundTurn
    this.draws = gameState.draws
    this.p1 = gameState.p1
    this.p2 = gameState.p2
    this.board = gameState.board
    this.winLine = gameState.winLine
  }

  changeRoundTurnMarks(){
      if (this.RoundTurn === 'x'){
          this.RoundTurn = 'o'
      } else if (this.RoundTurn === 'o'){
          this.RoundTurn = 'x'
      }
  }

  makeMove(row,col,player){
      if(this.board[row][col] !== ''){
          return 'Space already occupied'
      }
      this.board[row][col] = player
      this.changeRoundTurnMarks()
  }

  makeCPUMove(){
    let mark = this.getBestMove()
    this.board[mark.i][mark.j] = this.p2.mark
  }

  checkWinner(){
      let result = ''

      //check for columns
      for(let i=0;i < 3; i++){
          if(this.board[i][0] !== '' && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]){
              return result = this.board[i][0]
          }
      }

      //check for rows
      for(let i=0; i < 3; i++){
          if(this.board[0][i] !== '' && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]){
              return result = this.board[0][i]
          }
      }

      //check diagonals
      if(this.board[0][0] !== '' && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]){
          return result = this.board[0][0]
      }
      if(this.board[0][2] !== '' && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]){
          return result = this.board[0][2]
      }

      //Check for draws
      if (!this.board.flat().includes('')){
          return result = 'draw'
      }

      return result
  }

  checkWinnerLine(){
      this.winLine = {
          direction: '',
          index: -1
      }

      //return the row
      for(let i=0;i < 3; i++){
          if(this.board[i][0] !== '' && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]){
              this.winLine.direction = 'row'
              this.winLine.index = i
              return
          }
      }

      //return the column
      for(let i=0; i < 3; i++){
          if(this.board[0][i] !== '' && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]){
              this.winLine.direction = 'col'
              this.winLine.index = i
              return
          }
      }

      //return diagonal 1
      if(this.board[0][0] !== '' && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]){
          this.winLine.direction = 'd'
          this.winLine.index = 0
          return
      }

      //return diagonal 2
      if(this.board[0][2] !== '' && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]){
          this.winLine.direction = 'd'
          this.winLine.index = 2
          return
      }
  }

  updateScore(){
      if(this.p1.mark === 'x' && this.checkWinner() === 'x'){
          return this.p1.score += 1
      } else if(this.p1.mark === 'o' && this.checkWinner() === 'o'){
          return this.p1.score += 1
      }

      if(this.p2.mark === 'x' && this.checkWinner() === 'x'){
          return this.p2.score += 1
      } else if(this.p2.mark === 'o' && this.checkWinner() === 'o'){
          return this.p2.score += 1
      }

      if(this.checkWinner() === 'draw'){
          this.draws += 1;
      }
  }

  changePlayersMarks(){
      if(this.p1.mark === 'x'){
          this.p1.mark = 'o'
          this.p2.mark = 'x'
      } else if(this.p1.mark === 'o'){
          this.p1.mark = 'x'
          this.p2.mark = 'o'
      }
  }

  resetBoard(){
      this.RoundTurn = 'x'
      return this.board = [
          ['','',''],
          ['','',''],
          ['','','']
      ]
  }

  clean(){
      this.multiplayer = false
      this.RoundTurn = 'x'
      this.draws = 0
      this.p1 = {
          score: 0,
          mark: 'x'
      }
      this.p2 = {
          score: 0,
          mark: 'o'
      }
      this.board = 
      [
          ['','',''],
          ['','',''],
          ['','','']
      ]
  }

  // ======== Minimax Algorithm for playing against the cpu ==============

  //will return an object ex: { i:0, j:0 }
  getBestMove() {
    // The outer function will return the best move for the CPU
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Skip occupied spaces
        if (this.board[i][j] !== '') {
          continue;
        }
        this.board[i][j] = this.p2.mark;
        const score = this.minimax(0, false);
        this.board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = { i, j };
        }
      }
    }
    return bestMove;
  }

  minimax(depth, isMaximizing) {
    const result = this.checkWin()
    if (result !== null) {
      return result
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Skip occupied spaces
          if (this.board[i][j] !== '') {
            continue;
          }
          this.board[i][j] = this.p2.mark;
          const score = this.minimax(depth + 1, false);
          this.board[i][j] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Skip occupied spaces
          if (this.board[i][j] !== '') {
            continue;
          }
          this.board[i][j] = this.p1.mark;
          const score = this.minimax(depth + 1, true);
          this.board[i][j] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  //if p1 wins returns -1, 1 if it loses and 0 when it draws
  checkWin() {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
        if (this.board[i][0] === this.p2.mark) {
          return 1;
        } else if (this.board[i][0] === this.p1.mark) {
          return -1;
        }
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
        if (this.board[0][i] === this.p2.mark) {
          return 1;
        } else if (this.board[0][i] === this.p1.mark) {
          return -1;
        }
      }
    }
    // Check diagonals
    if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      if (this.board[0][0] === this.p2.mark) {
        return 1;
      } else if (this.board[0][0] === this.p1.mark) {
        return -1;
      }
    }
    if (this.board[2][0] === this.board[1][1] && this.board[1][1] === this.board[0][2]) {
      if (this.board[2][0] === this.p2.mark) {
        return 1;
      } else if (this.board[2][0] === this.p1.mark) {
        return -1;
      }
    }
    // check draw
    let draw = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          draw = false;
        }
      }
    }
    if (draw) {
      return 0;
    } else {
      return null;
    }
  }  
}


//module.exports = Game