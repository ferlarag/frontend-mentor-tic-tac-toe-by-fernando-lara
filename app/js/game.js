export default class Game {
    constructor(){
        this.winLine ={
            direction: '',
            index: -1
        }
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
}


//module.exports = Game