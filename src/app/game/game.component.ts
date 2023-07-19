import { Component, OnInit, inject } from '@angular/core';
import { Game, GameI } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, addDoc, docData } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

// export interface Item { name: string; }

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();
  games$: Observable<any>;

  // firestore: Firestore = inject(Firestore);

  constructor(public firestore: AngularFirestore, private route: ActivatedRoute, public dialog: MatDialog) {
   
  }

  ngOnInit(): void {
    // const col = collection(this.firestore, 'games');
    

    this.route.params.subscribe((params) => {
      const gameId = params['id'];
      // const docRef = doc(col, gameId);
      // docData(docRef).subscribe((game: GameI) => {
      //   console.log('Game update', game);
      //   this.game.players = game.players;
      //   this.game.stack = game.stack;
      //   this.game.playedCards = game.playedCards;
      //   this.game.currentPlayer = game.currentPlayer;
      // })
      this.firestore.collection('games').doc(gameId).valueChanges().subscribe((game: GameI) => {
        console.log('Game update', game);
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.playedCards = game.playedCards;
        this.game.currentPlayer = game.currentPlayer;
      })

    });
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}