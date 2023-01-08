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
    resumeGame(){

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
    minimax(board, depth, isMaximizing){
        // The minimax function will return the best score for the current player
        // (either 1 for win, 0 for draw, or -1 for loss)
        const result = this.checkWin()
        if (result !== '') {
            return result;
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                // Skip occupied spaces
                    if (board[i][j] !== '') {
                        continue;
                    }
                    board[i][j] = 'o';
                    const score = this.minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                // Skip occupied spaces
                    if (board[i][j] !== '') {
                        continue;
                    }
                    board[i][j] = 'x';
                    const score = this.minimax(board, depth + 1, true)
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore;
        }
    }

    getBestMove(board) {
        // The outer function will return the best move for the CPU
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            // Skip occupied spaces
            if (board[i][j] !== '') {
              continue;
            }
            board[i][j] = 'o';
            const score = this.minimax(board, 0, false);
            board[i][j] = '';
            if (score > bestScore) {
              bestScore = score;
              bestMove = { i, j };
            }
          }
        }
        return bestMove;
    }

    checkWin(board){

        // Check rows
        for (let i = 0; i < 3; i++) {
          if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            if (board[i][0] === 'x') {
              return 1;
            } else if (board[i][0] === 'o') {
              return -1;
            }
          }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                if (board[0][i] === 'x') {
                  return 1;
                } else if (board[0][i] === 'o') {
                  return -1;
                }
              }
        }

        // Check diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            if (board[0][0] === 'o') {
            return 1
            } else if (board[0][0] === 'x') {
            return -1
            }
        }
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            if (board[2][0] === 'o') {
            return 1
            } else if (board[2][0] === 'x') {
            return -1
            }
        }
        // Check for draw
        let emptySpaces = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                emptySpaces++
            }
            }
        }
        if (emptySpaces === 0) {
            return 0
        }
        return null
    }
}


//module.exports = Game