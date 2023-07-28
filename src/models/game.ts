export interface GameI {
    players: string[];
    player_images: string[];
    stack: string[];
    playedCards: string[];
    currentPlayer: number;
    pickCardAnimation: boolean;
    currentCard: string;
}

export class Game {
    public players: string[] = [];
    public player_images: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push(`spades_` + i);
            this.stack.push(`clubs_` + i);
            this.stack.push(`diamonds_` + i);
            this.stack.push(`hearts_` + i);
        }
        shuffle(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            player_images: this.player_images,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        } as GameI;
    }
}

function shuffle(arr: any) {
    let currentIndex = arr.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}