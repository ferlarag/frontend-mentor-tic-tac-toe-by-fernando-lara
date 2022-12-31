class Game {
    constructor(){
        this.multiplayer = false
        this.xTurn = true
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

    changeMarks(){
        if(this.p1.mark === 'x'){
            this.p1.mark = 'o'
            this.p2.mark = 'x'
        } else if(this.p1.mark === 'o'){
            this.p1.mark = 'x'
            this.p2.mark = 'o'
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

    resetBoard(){
        return this.board = [
            ['','',''],
            ['','',''],
            ['','','']
        ]
    }

    makeMove(row,col,player){
        if(this.board[row][col] !== ''){
            return 'Space already occupied'
        }
        return this.board[row][col] = player
    }

    checkWinner(){
        let spaces = this.board.flat()

        if (!spaces.includes('')){
            return 'draw'
        }

        //check for columns
        for(let i=0;i < 3; i++){
            if(this.board[i][0] !== '' && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]){
                return this.board[i][0]
            }
        }

        //check for rows
        for(let i=0; i < 3; i++){
            if(this.board[0][i] !== '' && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]){
                return this.board[0][i]
            }
        }

        //check diagonals
        if(this.board[0][0] !== '' && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]){
            return this.board[0][0]
        }
        if(this.board[0][2] !== '' && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]){
            return this.board[0][2]
        }
    }
}

module.exports = Game