import { Component, OnInit, inject } from '@angular/core';
import { Game, GameI } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game = new Game();
  gameId: string;
  games$: Observable<any>;
  gameOver = false;

  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    const col = collection(this.firestore, 'games');

    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      const docRef = doc(col, this.gameId);
      docData(docRef).subscribe((game: GameI) => {
        console.log('Game update', game);
        this.game.players = game.players;
        this.game.player_images = game.player_images;
        this.game.stack = game.stack;
        this.game.playedCards = game.playedCards;
        this.game.currentPlayer = game.currentPlayer;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      })
    });
  }

  takeCard() {
    if(this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    }
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if(change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('user_avatar.png');
        this.saveGame();
      }
    });
  }

  saveGame() {
    const col = collection(this.firestore, 'games');
    const docRef = doc(col, this.gameId);
    const gameJson = this.game.toJson();

    setDoc(docRef, gameJson)
      .then(() => {
        console.log('Game saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving game:', error);
      });
  }
}