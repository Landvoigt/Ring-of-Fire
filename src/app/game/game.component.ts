import { Component, OnInit, inject } from '@angular/core';
import { Game, GameI } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();
  gameId: string;
  games$: Observable<any>;

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
      this.saveGame();
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
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


// import { Component, OnInit } from '@angular/core';
// import { Game, GameI } from 'src/models/game';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

// import { Observable } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-game',
//   templateUrl: './game.component.html',
//   styleUrls: ['./game.component.scss']
// })
// export class GameComponent implements OnInit {
//   pickCardAnimation = false;
//   currentCard: string = '';
//   game: Game = new Game();
//   gameId: string;
//   games$: Observable<any>;

//   constructor(
//     private route: ActivatedRoute,
//     private dialog: MatDialog,
//     private firestore: AngularFirestore
//   ) {}

//   ngOnInit(): void {
//     const col = this.firestore.collection('games');

//     this.route.params.subscribe((params) => {
//       this.gameId = params['id'];
//       const docRef = col.doc(this.gameId);
//       docRef.valueChanges().subscribe((game: GameI) => {
//         console.log('Game update', game);
//         this.game.players = game.players;
//         this.game.stack = game.stack;
//         this.game.playedCards = game.playedCards;
//         this.game.currentPlayer = game.currentPlayer;
//       });
//     });
//   }

//   takeCard() {
//     if (!this.pickCardAnimation) {
//       this.currentCard = this.game.stack.pop() || '';
//       this.pickCardAnimation = true;

//       this.game.currentPlayer++;
//       this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
//       setTimeout(() => {
//         this.game.playedCards.push(this.currentCard);
//         this.pickCardAnimation = false;
//       }, 1000);
//     }
//   }

//   openDialog(): void {
//     const dialogRef = this.dialog.open(DialogAddPlayerComponent);

//     dialogRef.afterClosed().subscribe((name: string) => {
//       if (name && name.length > 0) {
//         this.game.players.push(name);
//         this.saveGame();
//       }
//     });
//   }

//   saveGame() {
//     const col = this.firestore.collection('games');
//     const docRef = col.doc(this.gameId);
//     const gameJson = this.game.toJson();
//     docRef
//       .update(gameJson)
//       .then(() => {
//         console.log('Game saved successfully!');
//       })
//       .catch((error) => {
//         console.error('Error saving game:', error);
//       });
//   }
// }
