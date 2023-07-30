import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})

export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  clickSound = new Audio('assets/sounds/button_click.mp3');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  playSound() {
    this.clickSound.play()
  }

  newGame() {
    let game = new Game();
    const col = collection(this.firestore, 'games');
    addDoc(col, game.toJson() )
      .then((gameInfo: any) => {
        console.log(gameInfo.id);
        this.router.navigateByUrl('game/' + gameInfo.id);
      });
  }
}
