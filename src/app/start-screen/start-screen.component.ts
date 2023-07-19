import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})

export class StartScreenComponent implements OnInit {

  constructor(private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {

  }

  newGame() {
    let game = new Game();
    const col = collection(this.firestore, 'games');
    addDoc(col, { game: game.toJson() })
      .then((gameInfo: any) => {
        console.log(gameInfo.id);
        this.router.navigateByUrl('game/' + gameInfo.id);
      });
  }
}
