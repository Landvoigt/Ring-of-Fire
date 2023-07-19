import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})

export class StartScreenComponent implements OnInit {

  //firestore: Firestore = inject(Firestore);
  constructor(public firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {

  }

  newGame() {
    let game = new Game();
    this.firestore.collection('games').add(game.toJson()).then(newGame => this.router.navigateByUrl('game/' + newGame.id))
    // const col = collection(this.firestore, 'games');
    // addDoc(col, game.toJson() )
    //   .then((gameInfo: any) => {
    //     console.log(gameInfo.id);
    //     this.router.navigateByUrl('game/' + gameInfo.id);
    //   });
  }
}
