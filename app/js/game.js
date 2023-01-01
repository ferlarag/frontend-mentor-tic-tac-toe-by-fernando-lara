export default class Game {
    constructor(){
        this.multiplayer = false
        this.RoundTurn = 'x'
        this.round = 1
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
        this.checkWinner()
        this.changeRoundTurnMarks()

        //this will run automatically
        // if(this.checkWinner() !== ''){
        //     this.update()
        // }
    }

    update(){
        this.updateScore()
        this.changePlayersMarks()
        this.resetBoard()
    }

    checkWinner(){
        let result = ''
        let spaces = this.board.flat()

        //check for columns
        for(let i=0;i < 3; i++){
            if(this.board[i][0] !== '' && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]){
                result = this.board[i][0]
            }
        }

        //check for rows
        for(let i=0; i < 3; i++){
            if(this.board[0][i] !== '' && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]){
                result = this.board[0][i]
            }
        }

        //check diagonals
        if(this.board[0][0] !== '' && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]){
            result = this.board[0][0]
        }
        if(this.board[0][2] !== '' && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]){
            result = this.board[0][2]
        }

        //Check for draws
        if (!spaces.includes('')){
            result = 'draw'
        }

        return result
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
        return this.board = [
            ['','',''],
            ['','',''],
            ['','','']
        ]
    }
}

//module.exports = Game